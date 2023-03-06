// EVENT PAGE: EDIT & DELETE an EVENT

// For the date picker - prevent picking days before today's date
editEvent_datePickerId.min = new Date().toLocaleDateString('fr-ca');

// Back button for the event form if the user doesn't want to edit event 
function backEditEventForm() {
  document.location.replace('/profile');
}

// Hide and appear  
function editFromSummary() {
  const eventEditForm = document.querySelector('.edit-event-form');

  document.querySelector('#eventEditCard').style.display = 'block';
  eventEditForm.scrollIntoView({ behavior: 'smooth', block: "start" });
}

// EDIT event from the THIS event's page
const editEventFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#editevent-name').value.trim();
  const location_zip = document.querySelector('#editevent-location_zip').value.trim();
  const description = document.querySelector('#editevent-description').value.trim();
  const date = document.querySelector('.editevent-date').value.trim();
  const time = document.querySelector('#editevent-time').value.trim();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(id);

  const response = await fetch(`/api/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, location_zip, description, date, time }),
    headers: { 'Content-Type': 'application/json' },
  });

  // IF response is successful, then reload
  if (response.ok) {
    document.location.reload();
  } else {
    console.log(response.statusText);
  }

};

document.querySelector('#submitEventEdit-btn').addEventListener('click', (event) => {
  eventValidation(event);
  editEventFormHandler(event);
});



// DELETE event from the THIS event's page

const deleteEventPage = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(id);

  const response = await fetch(`/api/events/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    location.reload();
  } else {
    alert('Failed to delete event');
  }
};

document.querySelector('#deleteFromSummary-btn').addEventListener('click', (event) => {
  eventValidation(event);
  deleteEventPage(event);
});


//Validations
function eventValidation(event) {
  event.preventDefault();
  const name = document.querySelector("#editevent-name").value.trim();
  const location_zip = document.querySelector('#editevent-location_zip').value.trim();
  const ziplength = location_zip.length;
  const description = document.querySelector("#editevent-description").value.trim();
  const date = document.querySelector("#editEvent_datePickerId").value.trim();
  const time = document.querySelector('#editevent-time').value.trim();

  const nameError = document.querySelector(".no-name-msg");
  const noZipError = document.querySelector('.no-zipcode-msg');
  const zipLengthError = document.querySelector('.zipcode-length-msg');
  const descriptionError = document.querySelector('.no-description-msg');
  const dateError = document.querySelector('.no-date-msg');
  const timeError = document.querySelector('.no-time-msg');


  if (!name) {
    nameError.classList.remove("d-none")
  } else {
    nameError.classList.add("d-none")
  }

  if (!location_zip) {
    noZipError.classList.remove("d-none")
    zipLengthError.classList.add("d-none")
  } else if (ziplength !== 5) {
    noZipError.classList.add("d-none")
    zipLengthError.classList.remove("d-none")
  } else {
    noZipError.classList.add("d-none")
    zipLengthError.classList.add("d-none")
  }

  if (!description) {
    descriptionError.classList.remove("d-none")
  } else {
    descriptionError.classList.add("d-none")
  }

  if (!date) {
    dateError.classList.remove("d-none")
  } else {
    dateError.classList.add("d-none")
  }

  if (!time) {
    timeError.classList.remove("d-none")
  } else {
    timeError.classList.add("d-none")
  }

  if (!name || !location_zip || ziplength !== 5 || !description || !date || !time) {
    return
  }
}
