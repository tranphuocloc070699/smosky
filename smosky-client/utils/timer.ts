export const sleep =(ms : number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export const convertDateTimeToYMD = (dateString : string) =>{
    const dateObject = new Date(dateString);

const year = dateObject.getFullYear();
const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
const day = String(dateObject.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
return formattedDate;
}