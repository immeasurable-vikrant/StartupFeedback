const keys = require('../../config/keys');

module.exports = (survey) => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
            <h3>I'd like your Input!</h3>
            <p>Please Answer the following question:</p>
            <p>${survey.body}</p>
                <div>
                    <a href="${keys.redirectDomain}/api/surveys/thanks">Yes</a>
                </div>
                <div>
                <a href="${keys.redirectDomain}/api/surveys/thanks">No</a>
            </div>
        </body>
    </html>

    `;
};