/**
 * JS relationed with the rides
 */

 //ride-add-ride
function saveRide(){
    const ride = rideData();
    let rides = getTableData('rides');
    let us = usernameLog('user');
}

/**
 * Modals function
 */
$(document).ready(function () {
    $('#modal-add-ride').modal({
        opacity: 0.6
    });
});

saveRide();