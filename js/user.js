/**
 * JS relationed with the user's interacts
 */

const usersArray = getTableData('users');

/**
 * Add an user to localStorage
 */
function saveUser() {
    const user = userData();
    let users = getTableData('users');
    if (user.fir_name.length > 0
        && user.las_name.length > 0
        && user.username.length > 0) {
        if (!(user.password.length < 8)) {
            if (users.find(u => u.username === user.username)) {
                let text = 'The username \'' + user.username + '\' is already in use';
                popU(text);
            }
            if (users.find(u => u.email === user.email)) {
                let text2 = 'The email \'' + user.email + '\' is already in use'
                popU(text2);
            } else {
                insertToTable('users', user);
                popR();
            }
        }
    }
}

/**
 * Edit an user in localStorage
 */
function editUser() {
    const ued = userEditData();
    let users = getTableData('users');
    let user = getDataFromSessionStorage('user');
    users.forEach(element => {
        if (element.username === user.username) {
            if (ued.fname.length > 0
                && ued.lname.length > 0
                && ued.cupass.length > 0
                && ued.pass.length > 0) {
                if (ued.cupass == user.password) {
                    if (ued.pass.length >= 8) {
                        let nFirN = ued.fname;
                        let nLasN = ued.lname;
                        let nUName = user.username;
                        let nEma = user.email;
                        let nPass = ued.pass;
                        let indexArray;
                        usersArray.forEach((element2, i) => {
                            if (element2.username === user.username) {
                                indexArray = i;
                            }
                        });
                        console.log(indexArray);
                        usersArray[indexArray].fir_name = nFirN;
                        usersArray[indexArray].las_name = nLasN;
                        usersArray[indexArray].username = nUName;
                        usersArray[indexArray].email = nEma;
                        usersArray[indexArray].password = nPass;
                        localStorage.setItem('users', JSON.stringify(usersArray));
                    } else {
                        popU('The new password min length is of 8 characters');
                    }
                } else {
                    popU('The current password is invalid');
                }
            } else {
                popU('No blank spaces');
            }
        }
    });
}

/**
 * Charge the data of the current user in a modal editable
 */
function chargeModalUserData() {
    let users = getTableData('users');
    let user = getDataFromSessionStorage('user');
    users.forEach(element => {
        if (user.username === element.username) {
            let fn = element.fir_name;
            let ln = element.las_name;
            $('#fir-name-edit').val(fn);
            $('#las-name-edit').val(ln);
        }
    });
}

/**
 * Show a message in window and redirect to login page
 */
function popR() {
    var toastHTML = '<span>Suscesfully added</span><button class="btn-flat toast-action" onclick="location.href=\'../html/login.html\'">OK</button>';
    M.toast({
        html: toastHTML,
        displayLength: 3000,
        classes: "rounded blue",
        completeCallback: function () {
            window.location = '../html/login.html'
        }
    });
}

/**
 * Show a toast with a text
 * @param {*} uname Username typed
 */
function popU(text) {
    var toastHTML = '<span>' + text + '</span><button class="btn-flat toast-action">OK</button>';
    M.toast({
        html: toastHTML,
        displayLength: 3000,
        classes: "rounded blue"
    });
}

/**
 * Logged in an user at app
 */
function loginUser() {
    let bool = true;
    const userL = userLoginData();
    let users = getTableData('users');
    users.forEach(element => {
        if (element.username == userL.username_log
            && element.password == userL.password_log) {
            let u1 = userLogged(userL);
            saveToSessionStorage('user', u1);
            bool = false;
            popL(element.username);
        }
    });
    if (bool) {
        popU('User or password invalid');
    }
}

/**
 * Show a message in window and redirect to login page
 */
function popL(u) {
    var toastHTML = '<span>Welcome ' + u + '</span><button class="btn-flat toast-action" onclick="location.href=\'../html/main.html\'">Let\'s go</button>';
    M.toast({
        html: toastHTML,
        displayLength: 1500,
        classes: "rounded blue",
        completeCallback: function () {
            window.location = '../html/main.html'
        }
    });
}

/**
 * Ask for the user logged
 * @param {*} us User object
 */
function userLogged(us) {
    let users = getTableData('users');
    let u1 = users.find(user => user.username === us.username_log && user.password === us.password_log);
    return u1;
}

/**
 * Charge the data of the current user into a modal
 */
function uModal() {
    let users = getTableData('users');
    let u = getDataFromSessionStorage('user');
    users.forEach(element => {
        if (element.username === u.username) {
            let uname = u.username;
            let fi = u.fir_name;
            let la = u.las_name;
            let com = fi + ' ' + la;
            let ema = u.email;
            let uH = jQuery('#user-log-modal');
            uH.html(uname);
            let coH = jQuery('#user-com-name');
            coH.html(com);
            let emH = jQuery('#user-ema-name');
            emH.html(ema);
        }
    });
}

/**
 * User in sessionStorage
 * @param {*} key key in sessionStorage
 */
function uLog(key) {
    let user1 = getDataFromSessionStorage(key);
    return uname = user1.username;
}

/**
 * Show the username that is logged in
 * @param {*} key key of the sessionStorage
 * @param {*} idObject id of the object into the HTML
 */
function usernameLog(key, idObject) {
    let uname = uLog(key);
    let ta = jQuery(idObject);
    ta.html(uname);
    return uname;
}

/**
 * Logout an user clearing the sessionStorageS
 * @param {*} wiLoc windowLocation to go
 */
function logOut(wiLoc) {
    sessionStorage.clear();
    window.location = wiLoc;
}

/**
 * Return an array with the email of all the users
 * @param {*} username username
 */
function emailUser(username){
    let users = getTableData('users');
    let emas = [];
    let i = 0;
    users.forEach((element) => {
        if(element.username === username){
            emas[i] = element.email;
            i ++;
        }
    });
    return emas;
}

/**
 * bindEvents of the document
 */
function bindEvents() {
    jQuery('#register-user-but').bind('click', (element) => {
        saveUser();
    });
    jQuery('#user-edit').bind('click', (element) => {
        chargeModalUserData();
    });
    jQuery('#edit-user-but').bind('click', (element) => {
        editUser();
    });
    jQuery('#login-but').bind('click', (element) => {
        loginUser();
    });
    usernameLog('user', '#user-logged-main');
    usernameLog('user', '#user-logged-main-mov');
    jQuery('#user-logged-main').bind('click', (element) => {
        uModal();
    });
    jQuery('#logout').bind('click', (element) => {
        logOut('../html/login.html');
    });
}

/**
 * bindEvents called at final
 */
bindEvents();