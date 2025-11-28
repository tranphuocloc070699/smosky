export const isRequired = (myString: string) => {
    return myString.trim().length>0;
  };
  
export const hasNumber = (myString: string) => {
    return /\d/.test(myString);
  };
  
export  const containsSpecialChars = (str: string) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  };
  export  const containsSpecialCharsWithoutDot = (str: string) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
    return specialChars.test(str);
  };
  
export  const followingPascalCase = (str: string) => {
    const result = /^[A-Z][a-zA-Z]*$/.test(str);
    return result;
  };
  
export  const followingCamelCase = (str : string)  =>{
      return /^[a-z]+(?:[A-Z][a-z]*)*$/.test(str);
  }