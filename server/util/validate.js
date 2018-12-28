module.exports = function validate(){

    const validPhoneNumber = (val) =>{
        if (val.match(/\d/g).length === 10) {
            return true;
        }else {
            return false;
        }
    }

    const validEmail = (email) => {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
             return re.test(email);
    }

    const validString = (text) => {
        var re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/ ;
            return !re.test(text);
    }

    const validArray = (array) => {
        return array.isArray();
    }

    const validPrice = (price) => {
        if (isNaN(price)) {
            return false;
        }else {
            if (price > 0) {
                return true;
            }else {
                return false;
            }
        }
    }

    return {
        validPhoneNumber,
        validArray,
        validEmail,
        validPrice,
        validString,
    }
}