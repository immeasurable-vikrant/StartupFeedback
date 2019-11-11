// const re = GO TO REGEX.COM and find reg exp for JS and paste it here

export default (emails) => {
    const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false)

    if(invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
    };
    
    return;
};