function is_not_fizbuzz(number) {
    if(!Number.isInteger(number)) {
        throw new TypeError("Input harus bilangan bulat");
    }

    if(number %  3 === 0 || number % 5 === 0) {
        return false;
    }
    return true;
}
    console.log(is_not_fizbuzz(1)) 
    console.log(is_not_fizbuzz(3)) 
    console.log(is_not_fizbuzz(5)) 
    console.log(is_not_fizbuzz(30)) 
    console.log(is_not_fizbuzz(7)) 
    try {
    console.log(is_not_fizbuzz(null)) 
    } catch (e) {
        console.log("Error:", e.name);
    }
    try {
    console.log(is_not_fizbuzz(NaN)) 
    } catch (e) {
        console.log("Error:", e.name);
    }
    try {
    console.log(is_not_fizbuzz(Infinity)) 
    } catch (e) {
        console.log("Error:", e.name);
    }