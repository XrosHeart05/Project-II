/**
 * JS relationed with the database of the system
 */

/**
 * Save the value in the local storage relationated with the
 * key
 * @param {*} key the key of the object 
 * @param {*} value the value to be saved
 */
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
}

/**
 * Clear all the data saved in session storage and save the
 * new value in the session storage relationed with the key
 * @param {*} key the key of the object
 * @param {*} value the value to be saved
 */
function saveToSessionStorage(key, value) {
    sessionStorage.clear();
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
}

/**
 * Get data from sessionStorage
 * @param {*} tableName name of the table to be asked
 */
function getDataFromSessionStorage(tableName){
    let table = JSON.parse(sessionStorage.getItem(tableName));
    if (!table) {
        table = [];
    }
    return table;
}

/**
 * Insert a new object into a table located in the localStorage
 * @param {*} tableName name of the table to be inserted in 
 * localStorage
 * @param {*} object object to be inserted in the table
 */
function insertToTable(tableName, object) {
    let table = JSON.parse(localStorage.getItem(tableName));
    if (!table) {
        table = [];
    }
    let newPosition = table.length + 1;
    object.id = newPosition;
    table.push(object);
    localStorage.setItem(tableName, JSON.stringify(table));
    return table;
}

/**
 * Search an object per ID and don't re-write again into the new
 * table to be returned 
 * @param {*} tableName name of the table to be modified
 * @param {*} objectID ID of the object to be deleted
 */
function deleteFromTable(tableName, objectID) {
    let table = JSON.parse(localStorage.getItem(tableName));
    if (!table) {
        return false;
    }
    let newTable = [];
    table.array.forEach(element => {
        if (element.id != objectID) {
            newTable.push(element);
        }
    });
    localStorage.setItem(tableName, JSON.stringify(newTable));
    return newTable;
}

/**
 * Get the data of the table searched
 * @param {*} tableName name of the table to be obtained
 */
function getTableData(tableName) {
    let table = JSON.parse(localStorage.getItem(tableName));
    if (!table) {
        table = [];
    }
    return table;
}

function editEntity(element){

}
