/**
 * JS relationed with the user's interacts
 */

/**
 * Add an user to localStorage
 */
function saveUser() {
    const user = userData();
    if (user.fir_name.length > 0
        && user.las_name.length > 0
        && user.username.length > 0) {
        if (!(user.password.length < 8)) {
            insertToTable('users', user);
            popR();
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
 * Logged in an user at app
 */
function loginUser() {
    const userL = userLoginData();
    let users = getTableData('users');
    users.forEach(element => {
        console.log(element);
        console.log(userL);
        if (element.username == userL.username_log
            && element.password == userL.password_log) {
            popL(element.username);
        }
    });
}

/**
 * Show a message in window and redirect to login page
 */
function popL(u) {
    var toastHTML = '<span>Welcome ' + u  + '</span><button class="btn-flat toast-action" onclick="location.href=\'../html/main.html\'">Let\'s go</button>';
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
 * bindEvents of the document
 */
function bindEvents() {
    jQuery('#register-user-but').bind('click', (element) => {
        saveUser();
    });
    jQuery('#login-but').bind('click', (element) => {
        loginUser();
    })
}

/**
 * bindEvents called at final
 */
bindEvents();