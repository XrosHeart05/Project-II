/**
 * JS relationed with the user's interacts
 */

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
    const userL = userLoginData();
    let users = getTableData('users');
    users.forEach(element => {
        if (element.username == userL.username_log
            && element.password == userL.password_log) {
            let u1 = userLogged(userL);
            saveToSessionStorage('user', u1);
            popL(element.username);
        }
    });
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
 * Show the username that is logged in
 * @param {*} key key of the sessionStorage
 * @param {*} idObject id of the object into the HTML
 */
function showUsername(key ,idObject){
    let user1 = getDataFromSessionStorage(key);
    let uname = user1.username;
    let ta = jQuery(idObject);
    ta.html(uname);
}

/**
 * Logout an user clearing the sessionStorageS
 * @param {*} wiLoc windowLocation to go
 */
function logOut(wiLoc){
    sessionStorage.clear();
    window.location = wiLoc;
}

/**
 * bindEvents of the document
 */
function bindEvents() {
    jQuery('#register-user-but').bind('click', (element) => {
        saveUser();
    });
    jQuery('#login-but').bind('click', (element) => {
        loginUser();
    });
    showUsername('user', '#user-logged-main');
    jQuery('#logout').bind('click', (element) => {
        logOut('../html/login.html');
    });
}

/**
 * bindEvents called at final
 */
bindEvents();