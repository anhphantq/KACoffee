let create_email_verify = function(name, url){
    return {
        subject: 'Email verification',
        text:'Hi ' + name + ',\nThanks for having signed up KA Coffee. Please click the url below to verify your email: \n' + url,
    };
}
let create_password_change = function(name, url){
    return{
        subject: 'Password change',
        text: 'Hi ' + name + ',\nTo continue changing your password, please click the url below to verify this email belongs to you: \n' + url,
    }
}


module.exports = (emailType, name, url) =>{
    if (emailType =='email_verify') return create_email_verify(name, url);
    if (emailType =='password_change') return create_password_change(name, url);
}