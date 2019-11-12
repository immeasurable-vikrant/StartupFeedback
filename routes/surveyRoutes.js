const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose'); 
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req,res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipeients: false });

        res.send(surveys);
    });

    app.get('/api/surveys:surveyId/:choice',(req,res) => {
        res.send('Thanks for Your Feedback!');
    });

    app.post('/api/surveys/webhooks', (req,res) =>{

        const p = new Path('/api/surveys:surveyId/:choice');
        _.chain(req.body)
            .map((event) => {
            const match = p.test(new URL(event.url).pathname);
                if(match){
                    return {email: event.email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice}) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipeients : {
                        $elemMatch : { email: email, responded: false }
                    }
                },{
                    $inc: {[choice]: 1},
                    $set: { 'recipeients.$.responded': true},
                    lastResponded: new Date()
                }
                ).exec();
            })
            .value();

        console.log(events);

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req,res) => {
        const { title, subject, body, recipeients } = req.body;

        const survey = new Survey({
            title: title,
            subject: subject,
            body: body,
            recipeients: recipeients.split(',').map( email => {return { email: email.trim() }}),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        //Great Place to Send Email
        const Mailer = new Mailer(survey, surveyTemplate(survey));

        try{ 
            await mailer.send(); 
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);

        } catch (err) {
            res.status(422).send(err);
        }

    });
};