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
        if (ride.ride_dep_time >= ride.ride_arr_time) {
            popU('The arrival time can\'t be less than the departure time')
        }
        if (ride.ride_days.length === 0) {
            popU('You must select at least one day for a ride');
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
                row2 += `<td><a onclick="editRide(this, 'rides')" href="#modal-main-add-ride" class="modal-trigger edit" data-id="${rideEl.ride_id}" data-entity="${tableName}"><i class="material-icons right amber-text">create</i>Edit</a><a  onclick="deleteRide(this, 'rides');" data-id="${rideEl.ride_id}" data-entity="${tableName}" class="delete"><i class="material-icons right red-text">clear</i>Delete</a></td>`
                rows += row2 + '</tr>';
            }
        }
    });
    table.html(rows);
}

function editRide(element, tableName) {
    let object = $(element).data();
    let id = object.id;
    console.log(id);
    chargeModalDataRide(tableName, id);
    let table = getTableData(tableName);
}

/**
 * Charge the data searched into the localStorage in
 * the ride_add_modal
 * @param {*} tableName name of the table to be searched
 * in localStorage
 * @param {*} id id of the element in the table searched
 */
function chargeModalDataRide(tableName, id) {
    let table = getTableData(tableName);
    table.forEach(ele => {
        if (ele.ride_id == id) {
            ride_name = ele.ride_name;
            ride_dep = ele.ride_dep;
            ride_arr = ele.ride_arr;
            ride_descr = ele.ride_descr;
            ride_dep_time = ele.ride_dep_time;
            ride_arr_time = ele.ride_arr_time;
            loadCheckbox(ele.ride_days);
            $('#ride_add_name').val(ride_name);
            $('#ride_add_dep').val(ride_dep);
            $('#ride_add_arr').val(ride_arr);
            $('#ride_add_descr').val(ride_descr);
            $('#ride_add_dep_time').val(ride_dep_time);
            $('#ride_add_arr_time').val(ride_arr_time);
        }
    });
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
    $('.timepicker').timepicker({
        defaultTime: '07:00 AM'
    });
    M.updateTextFields();
});

/**
 * bindEvents of the document
 */
function bindEventsR() {

    renderTableRides('rides_user', 'rides');
    jQuery('#add-ride').bind('click', (element) =>{
        document.getElementById('ride-add-form').reset();
    })
    jQuery('#ride-add-ride').bind('click', (element) => {
        saveRide();
    });
}

/**
 * bindEvents called at final
 */
bindEventsR();