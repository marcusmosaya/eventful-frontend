function validateEmail(email){
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password){
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}
function validatePhonenumber(phonenumber){
    const phoneNumberRegex=/^0*[\d]{9}$/;
    return phoneNumberRegex.test(phonenumber);
}

function countWords(text){
    const words=text.trim().split(/\s+/);
    return words.filter(Boolean).length;
}
function getType(input){
    let letters='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@'.split('');
    let digits='0123456789'.split('')
    let lettersCount=0,digitsCount=0;
    for(let i=0;i<input.length;i++){
        if(letters.includes(input[i])){
            lettersCount++;
        }
        if (digits.includes(input[i])) {
             digitsCount++;  
        } 
    }
    console.log(`Letter ${lettersCount} Digits ${digitsCount}`);

    if(lettersCount<digitsCount){
        return 'numbers';
    }
    if(lettersCount>digitsCount){
        return 'letters';

    }
    
    
}

export {validateEmail,validatePassword,countWords,validatePhonenumber,getType};