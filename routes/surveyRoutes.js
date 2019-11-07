const mongoose = require('mongoose'); 
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/thanks',(req,res) => {
        res.send('Thanks for Your Feedback!');
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