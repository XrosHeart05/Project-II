/**
 * JS relationed with the rides
 */

//ride-add-ride
function saveRide() {
    const ride = rideData();
    let u = uLog('user');
    ride.ride_user = u;
    let rides = getTableData('rides');
    ride.ride_id = rides.length + 1;
    if (ride.ride_name.length <= 0
        || ride.ride_dep.length <= 0
        || ride.ride_arr <= 0) {
        popU('No blank spaces');
    } else {
        if (ride.ride_dep === ride.ride_arr) {
            popU('The departure and arrival can\'t called same');
        } else {
            insertToTable('rides', ride);
            popU('Ride suscesfully added ' + u);
        }
    }
}

/**
 * Modals function
 */
$(document).ready(function () {
    $('#modal-add-ride').modal({
        opacity: 0.6
    });
});

/**
 * bindEvents of the document
 */
function bindEventsR() {
    jQuery('#ride-add-ride').bind('click', (element) => {
        saveRide();
    });
}

/**
 * bindEvents called at final
 */
bindEventsR();