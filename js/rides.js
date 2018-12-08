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
        || ride.ride_arr <= 0
        || ride.ride_dep_time <= 0
        || ride.ride_arr_time <= 0) {
        popU('No blank spaces');
    } else {
        if (ride.ride_dep === ride.ride_arr) {
            popU('The departure and arrival can\'t called same');
        } 
        if(ride.ride_dep_time >= ride.ride_arr_time){
            popU('The arrival time can\'t be less than the departure time')
        }
        else {
            insertToTable('rides', ride);
            document.getElementById('ride-add-form').reset();
            popU('Ride suscesfully added ' + u);
            renderTableRides('rides_user', 'rides')
        }
    }
}

function renderTableRides(htmlObj, tableName) {
    let table = jQuery(`#${htmlObj}_table`);
    let rows = "";
    let rides = getTableData(tableName);
    let u = uLog('user');
    let row1 = `<tr><th>Ride Name</th><th>Departure</th><th>Arrival</th><th>Hour</th><th></th></tr>`
    rows += row1;
    rides.forEach(rideEl => {
        if (rideEl.ride_user == u) {
            if (rideEl.ride_act) {
                let row2 = `<tr><td>${rideEl.ride_name}</td><td>${rideEl.ride_dep}</td><td>${rideEl.ride_arr}</td><td>${rideEl.ride_dep_time}</td>`;
                row2 += `<td><a onclick="editEntity(this)" data-id="${rideEl.ride_id}" data-entity="${tableName}" class="edit"><i class="material-icons right amber-text">create</i>Edit</a><a  onclick="deleteRide(this, 'rides');" data-id="${rideEl.ride_id}" data-entity="${tableName}" class="delete"><i class="material-icons right red-text">clear</i>Delete</a></td>`
                rows += row2 + '</tr>';
            }
        }
    });
    table.html(rows);
}

/**
 * Delete a ride
 * @param {*} element element selected
 * @param {*} tableName name of table to be searched
 */
function deleteRide(element, tableName) {
    let object = $(element).data();
    let id = object.id;
    changeActive(tableName, id);
    renderTableRides('rides_user', 'rides');
}

/**
 * Change the active from true to false
 * @param {*} tableName name of table
 * @param {*} id id of the object to be changed
 */
function changeActive(tableName, id) {
    let rides = getTableData(tableName);
    rides.forEach(ele => {
        if (ele.ride_id == id) {
            ele.ride_act = false;
        }
    });
    localStorage.removeItem(tableName);
    saveToLocalStorage(tableName, rides);
}

/**
 * Modals function
 */
$(document).ready(function () {
    $('#modal-main-add-ride').modal({
        opacity: 0.6
    });
    $('.timepicker').timepicker();
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