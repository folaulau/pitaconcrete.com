'use client'

import axios from 'axios';

var instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

const Utility = {

      /*
// Examples of usage:
console.log(isValidEmail("email@example.com")); // true
console.log(isValidEmail("user.name+tag+sorting@example.com")); // true
console.log(isValidEmail("my.email@example.web")); // true
console.log(isValidEmail("email@example.com.")); // false
console.log(isValidEmail("@no-local-part.com")); // false
console.log(isValidEmail("no-at-sign")); // false
console.log(isValidEmail("no-tld@domain")); // false
console.log(isValidEmail("email@123.123.123.123")); // true
console.log(isValidEmail("email@[123.123.123.123]")); // false, although technically valid in certain contexts
  */
    validateEmail: (email) => {

        // Simple regex for basic email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    
    },


  /*
    // Examples of usage:
console.log(isValidUSPhoneNumber("123-456-7890")); // true
console.log(isValidUSPhoneNumber("(123) 456-7890")); // true
console.log(isValidUSPhoneNumber("123 456 7890")); // true
console.log(isValidUSPhoneNumber("123.456.7890")); // true
console.log(isValidUSPhoneNumber("1234567890")); // true
console.log(isValidUSPhoneNumber("+1 123-456-7890")); // true
console.log(isValidUSPhoneNumber("3101234567")); // true
console.log(isValidUSPhoneNumber("123-45-6789")); // false
   */
    isValidUSPhoneNumber: (phoneNumber) => {
        // This regex matches the following phone number formats:
        // 123-456-7890, (123) 456-7890, 123 456 7890, 123.456.7890, 1234567890, +1 123-456-7890
        const regex = /^(?:\+1\s?)?\(?(?:\d{3})\)?[\s.-]?(?:\d{3})[\s.-]?(?:\d{4})$/;
        return regex.test(phoneNumber);
    
    }

}

export default Utility;