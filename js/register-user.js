/**
 * JS relationed with the user's interacts
 */

/**
 * Add an user to localStorage
 */
function saveUser() {
    const user = registerUser();
    if (user.fir_name.length > 0
        && user.las_name.length > 0
        && user.username.length > 0) {
        if (user.password.length < 8) {
            alert('Password min-lenght must be minimum of 8 characters, please type a valid password');
        } else {
            insertToTable('users', user);
        }
    }
}

function bindEvents() {
    jQuery('#register-user-but').bind('click', (element) => {
        saveUser();
    });
}

bindEvents();