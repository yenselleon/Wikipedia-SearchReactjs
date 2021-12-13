
const getFullDate = ()=> {

    const today = new Date();
    

    return {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
    };
}

export default getFullDate;