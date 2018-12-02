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
            pop();
        }
    }
}

function pop() {
    var toastHTML = '<span>Suscesfully added</span><button class="btn-flat toast-action" onclick="location.href=\'../html/login.html\'">OK</button>';
    M.toast({
        html: toastHTML,
        displayLength: 3000,
        classes: "blue",
        completeCallback: function(){
            window.location = '../html/login.html'
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
}

/**
 * bindEvents called at final
 */
bindEvents();