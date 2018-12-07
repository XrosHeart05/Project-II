/**
 * JS relationed with the rides
 */

/**
 * Save a ride relationed with the user logged
 */


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
            document.getElementById('ride-add-form').reset();
            popU('Ride suscesfully added ' + u);
        }
    }
}

function renderTableRides(htmlObj, tableName) {
    let table = jQuery(`#${htmlObj}_table`);
    let rows = "";
    let rides = getTableData(tableName);
    let row1 = `<tr><th>Ride Name</th><th>Departure</th><th>Arrival</th><th></th></tr>`
    rows += row1;
    rides.forEach(rideEl => {
        let row2 = `<tr><td>${rideEl.ride_name}</td><td>${rideEl.ride_dep}</td><td>${rideEl.ride_arr}</td>`;
        row2 += `<td><a onclick="editEntity(this)" data-id="${rideEl.ride_id}" data-entity="${tableName}" class="edit"><i class="material-icons right amber-text">create</i>Edit</a><a  onclick="deleteEntity(this);" data-id="${rideEl.ride_id}" data-entity="${tableName}" class="delete"><i class="material-icons right red-text">clear</i>Delete</a></td>`
        rows += row2 + '</tr>';
    });
    table.html(rows);
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

    renderTableRides('rides_user', 'rides');
    jQuery('#ride-add-ride').bind('click', (element) => {
        saveRide();
    });
}

/**
 * bindEvents called at final
 */
bindEventsR();