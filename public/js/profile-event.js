// PROFILE PAGE: ADD & DELETE an EVENT and FORM show/hide

// For the date picker
datePickerId.min = new Date().toLocaleDateString('fr-ca');

// Show the event form and reset the fields
function showEventForm() {
  const eventForm = document.querySelector('form');
  eventForm.reset();
  document.querySelector('.eventForm').style.display = 'block';
  // document.querySelector('#submitEvent-btn').style.display = 'block';
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
// const addEventFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#event-name').value.trim();
//   const location_zip = document.querySelector('#event-location_zip').value.trim();
//   const description = document.querySelector('#event-description').value.trim();
//   const date = document.querySelector('.new-event-date').value.trim();
//   const time = document.querySelector('#addEvent-time').value.trim();
//   const eventSection = document.querySelector('#events-section');

//   if (name && location_zip && description && date && time) {
//     const response = await fetch('/api/events', {
//       method: 'POST',
//       body: JSON.stringify({ name, location_zip, description, date, time }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       location.reload();
//       eventSection.scrollIntoView({ behavior: 'smooth', block: "start" });
//     } else {
//       console.log(response.statusText);
//     }
//   }
// };
// document.querySelector('#submitEvent-btn').addEventListener('click', (event) => {
//   eventValidation(event);
// });


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
if (document.querySelector('.event-list')) {
  document.querySelector('.event-list').addEventListener('click', delEventHandler);
}


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


if (document.querySelector('#submit-zip')) {
  const container = document.getElementById('row')

  const ZIPcode = document.querySelector('#input-zip')
  const submitbtn = document.querySelector('#submit-zip')

  function renderParks(event) {

    event.preventDefault()

    fetch('http://localhost:3009/results/' + `${ZIPcode.value}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)

        console.log(data.local_results)

        const name = document.querySelector('#event-name').value.trim();
        const location_zip = document.querySelector('#input-zip').value.trim();
        const description = document.querySelector('#event-description').value.trim();
        const date = document.querySelector('.event-date').value.trim();
        const time = document.querySelector('.addEvent-time').value.trim();

        // var imgURL = data.local_results[0].photos_link

        for (let index = 0; index < 8; index++) {

          // Title of the park
          const title = data.local_results[index].title;
          const address = data.local_results[index].address
          console.log(address)
          // Gets the image of the park
          // const imgURL = data.local_results[index].photos_link
          // fetch(imgURL)
          // .then(response => response.json())
          // .then(data => {
          //     console.log(data.photos[0])
          // })

          // Creates HTML element for said title
          // const element = document.createElement('div');
          // element.setAttribute('class', 'row')
          // container.appendChild(element)

          const element1 = document.createElement('div')
          element1.setAttribute('class', 'col-sm-3 d-inline-flex')
          container.appendChild(element1)
          const card = document.createElement('div')
          // card.setAttribute('class', 'card col-lg-1 align-items-stretch')


          element1.appendChild(card)
          const cardbody = document.createElement('div')
          cardbody.setAttribute('class', 'card-body')
          card.appendChild(cardbody)
          const card_title = document.createElement('h3')
          card_title.setAttribute('class', 'card-title')
          card_title.textContent = title
          cardbody.appendChild(card_title)

          const card_address = document.createElement('h6')
          card_address.textContent = address
          card_address.setAttribute('class', 'card-subtitle mb-2 text-muted')
          cardbody.appendChild(card_address)

          const card_img = document.createElement('img')
          card_img.setAttribute('class', 'card-img')
          card_img.setAttribute('alt', 'Park')
          cardbody.appendChild(card_img)

          const addPark = document.createElement('a')
          addPark.setAttribute('class', 'btn btn-primary parkEvent' + `${index}`)
          addPark.setAttribute('name', title)
          addPark.textContent = 'Choose this Park'
          cardbody.appendChild(addPark)
          addPark.addEventListener('click', async () => {

            console.log(title)
            const location_name = title


            postEvent(name, location_zip, location_name, description, date, time)

          })

        }
      })
  }
  submitbtn.addEventListener('click', renderParks)
}


function postEvent(name, location_zip, location_name, description, date, time) {
  if (name && location_zip && location_name && description && date && time) {
    const response = fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({ name, location_zip, location_name, description, date, time }),
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
}

  // for (let index = 0; index < 10; index++) {
  //     if (document.querySelector('.parkEvent'+`${index}`)) {
  //     const chosenpark = document.querySelector('.parkEvent'+`${index}`)
  //     const titleofPark = chosenpark.querySelector('name')
  //     chosenpark.addEventListener('click', () => {
  //         console.log(chosenpark)
  //     })



