/**
 * Save the value in the local storage relationated with the key
 * @param {*} key the key of the object 
 * @param {*} value the value to be saved
 */
function saveToLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
    return true;
}