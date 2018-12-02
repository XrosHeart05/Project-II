/**
 * User object
 */
function userData() {
    let fir_name = $.trim($('#first_name').val());
    let las_name = $.trim($('#last_name').val());
    let email = $.trim($('#email').val());
    let username = $.trim($('#username').val());
    let password = $.trim($('#password').val());
    let user = {
        fir_name,
        las_name,
        email,
        username,
        password
    }
    return user;
}