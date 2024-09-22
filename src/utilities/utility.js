function validateEmail(email){
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password){
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function countWords(text){
    const words=text.trim().split(/\s+/);
    return words.filter(Boolean).length;
}

export {validateEmail,validatePassword,countWords};