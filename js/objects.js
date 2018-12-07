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

/**
 * User login data
 */
function userLoginData(){
    let username_log = $.trim($('#username-login').val());
    let password_log = $.trim($('#password-login').val());
    let user_log = {
        username_log,
        password_log
    }
    return user_log;
}

/**
 * Ride add data
 */
function rideData(){
    let ride_id = 0;
    let ride_user = '';
    let ride_descr = $.trim($('#ride_add_descr').val());
    let ride_name = $.trim($('#ride_add_name').val());
    let ride_dep = $.trim($('#ride_add_dep').val());
    let ride_arr = $.trim($('#ride_add_arr').val());
    let ride_act = true;
    let ride = {
        ride_id,
        ride_user,
        ride_descr,
        ride_name,
        ride_dep,
        ride_arr,
        ride_act
    }
    return ride;
}