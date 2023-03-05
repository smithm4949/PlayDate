// PROFILE PAGE: ADD & DELETE an EVENT and FORM show/hide

// For the date picker
datePickerId.min = new Date().toLocaleDateString('fr-ca');

// Show the event form and reset the fields
function showEventForm() {
  const eventForm = document.querySelector('form');
  eventForm.reset();
  document.querySelector('.eventForm').style.display = 'block';
  document.querySelector('#submitEvent-btn').style.display = 'block';
  document.querySelector('#addEventSection').style.display = 'none';
}

// Hide the event form after the form has been submitted
function hideEventForm() {
  document.querySelector('.eventForm').style.display = 'none';
  document.querySelector('#submitEvent-btn').style.display = 'none';
}

// Back button for the event form if the user doesn't want to add another event 
function backEventForm() {
  location.reload();
  eventSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  document.querySelector('.eventForm').style.display = 'none';
}

// CREATE a new EVENT to table
const addEventFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#event-name').value.trim();
  const location_zip = document.querySelector('#event-location_zip').value.trim();
  const description = document.querySelector('#event-description').value.trim();
  const date = document.querySelector('.new-event-date').value.trim();
  const time = document.querySelector('#addEvent-time').value.trim();
  const eventSection = document.querySelector('#events-section');

  if (name && location_zip && description && date && time) {
    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({ name, location_zip, description, date, time }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
      eventSection.scrollIntoView({ behavior: 'smooth', block: "start" });
    } else {
      console.log(response.statusText);
    }
  }
};
document.querySelector('#submitEvent-btn').addEventListener('click', (event) => {
  eventValidation(event);
  addEventFormHandler(event);
});


// DELETE an event
const delEventHandler = async (event) => {

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to delete event profile');
    }
  }
};

document
  .querySelector('.event-list').addEventListener('click', delEventHandler);

//Validations
function eventValidation(event) {
  event.preventDefault();
  const name = document.querySelector("#event-name").value.trim();
  const location_zip = document.querySelector('#event-location_zip').value.trim();
  const ziplength = location_zip.length;
  const description = document.querySelector("#event-description").value.trim();
  const date = document.querySelector(".new-event-date").value;
  const time = document.querySelector('#addEvent-time').value.trim();

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
