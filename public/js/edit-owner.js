// EDIT THE OWNER 

function backEditOwnerForm() {
  document.location.replace('/profile');
}

// NOTE - need to edit below for owner form

const editOwnerFormHandler = async (event) => {
  event.preventDefault();

  // const username = document.querySelector('#editowner-username').value.trim();
  const location_zip = document.querySelector('#editowner-location_zip').value.trim();
  const first_name = document.querySelector('#editowner-first_name').value.trim();
  const last_name = document.querySelector('#editowner-last_name').value.trim();
  const gender = document.querySelector('#editowner-gender').value.trim();
  const description = document.querySelector('#editowner-description').value.trim();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(id);

  const response = await fetch(`/api/owners/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ first_name, last_name, gender, location_zip, description }),
    headers: { 'Content-Type': 'application/json' },
  });



  // IF response is successful, then reload
  if (response.ok) {
    document.location.replace(`/profile/owner/${id}`);
  }
  else {
    console.log(response.statusText);
  }

};

// Validations

async function ownerValidation(event) {
  event.preventDefault();

  // const username = document.querySelector('#editowner-username').value.trim();
  const location_zip = document.querySelector('#editowner-location_zip').value.trim();
  const ziplength = location_zip.length;
  const first_name = document.querySelector('#editowner-first_name').value.trim();
  const last_name = document.querySelector('#editowner-last_name').value.trim();
  // const gender = document.querySelector('#editowner-gender').value.trim();
  const description = document.querySelector('#editowner-description').value.trim();

  // const usernameError = document.querySelector('.no-username-msg')
  const firstnameError = document.querySelector('.no-firstname-msg')
  const lastnameError = document.querySelector('.no-lastname-msg')
  const noZipError = document.querySelector('.no-zipcode-msg')
  const zipLengthError = document.querySelector('.zipcode-length-msg')
  const descriptionError = document.querySelector('.no-description-msg')

  // if (!username) {
  //   usernameError.classList.remove("d-none")
  // } else {
  //   usernameError.classList.add("d-none")
  // }


  if (!first_name) {
    firstnameError.classList.remove("d-none")
  } else {
    firstnameError.classList.add("d-none")
  }

  if (!last_name) {
    lastnameError.classList.remove("d-none")
  } else {
    lastnameError.classList.add("d-none")
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

  if (!first_name || !last_name || !location_zip || ziplength !== 5 || !description) {
    return
  }
}


function Zipper (event) {

  event.preventDefault();

  // const zip = document.querySelector('#input-zip');

  // console.log(zip.value)
  // fetch(`/api/zip`, {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     zip: zip.value,
  //   }),
  //   headers: {'Content-Type': 'application/json'}
  // });



  fetch('http://localhost:3009/results/'+`${ZIPcode.value}`)
  .then(response => response.json())
  .then(data => {
      // console.log(data)
      console.log(data.local_results)
      console.log()

      // var imgURL = data.local_results[0].photos_link



      for (let index = 0; index < data.local_results.length; index++) {

          // Title of the park
          const title = data.local_results[index].title;

          // Gets the image of the park
          // const imgURL = data.local_results[index].photos_link
          // fetch(imgURL)
          // .then(response => response.json())
          // .then(data => {
          //     console.log(data.photos[0])
          // })

          // Creates HTML element for said title
          const element = document.createElement('div');
          element.textContent = title;
          container.appendChild(element)
      }
  })



};



document.querySelector('#submitOwnerEdit-btn').addEventListener('click', (event) => {
  ownerValidation(event);
  editOwnerFormHandler(event);
});

// document.querySelector('#submitOwnerEdit-btn').addEventListener('click', editOwnerFormHandler);