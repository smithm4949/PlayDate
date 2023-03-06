// Back button for the dog form if the user doesn't want to add another dog 
function backEditDogForm() {
  document.location.replace('/profile');
}

// Hide and appear Dog Edit Form
function editFromDogSummary() {
  const dogEditForm = document.querySelector('.edit-dog-form');

  document.querySelector('#dogEditCard').style.display = 'block';
  dogEditForm.scrollIntoView({ behavior: 'smooth', block: "start" });
}

const editDogFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#editdog-name').value.trim();
  const age_years = parseInt(document.querySelector('#editdog-age').value.trim());
  const age_months = parseInt(document.querySelector('#editdog-age-months').value.trim());
  const age = (age_years * 12) + age_months;

  const breed = document.querySelector('#editdog-breed').value.trim();
  const gender = document.querySelector('#editdog-gender').value.trim();
  const dogProfileForm = document.querySelector('#dogProfileForm');

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(id);

  const response = await fetch(`/api/dogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name, age, breed, gender }),
    headers: { 'Content-Type': 'application/json' },
  });

  // IF response is successful, then reload
  if (response.ok) {
    document.location.replace(`/profile/dog/${id}`);
  } else {
    console.log(response.statusText);
  }

};

document.querySelector('#submitEdit-btn').addEventListener('click', (event) => {
  dogValidation(event);
  editDogFormHandler(event);
});

//Validations
function dogValidation(event) {
  event.preventDefault();
  const name = document.querySelector('#editdog-name').value.trim();
  const ageYears = document.querySelector('#editdog-age').value.trim();
  const ageYearsLength = ageYears.length;
  const ageMonths = document.querySelector('#editdog-age-months').value.trim();
  const ageMonthsLength = ageMonths.length;
  const ageTotal = (parseInt(ageYears) * 12) + parseInt(ageMonths);
  const breed = document.querySelector('#editdog-breed').value.trim();

  const nameError = document.querySelector('.no-dog-name-msg')
  const ageYearsError = document.querySelector('.no-dog-age-msg')
  const maxAgeYearsError = document.querySelector('.max-dog-age-msg')
  const ageMonthsError = document.querySelector('.no-dog-age-months-msg')
  const maxAgeMonthsError = document.querySelector('.max-dog-age-months-msg')
  const breedError = document.querySelector('.no-dog-breed-msg')

  if (!name) {
    nameError.classList.remove("d-none")
  } else {
    nameError.classList.add("d-none")
  }

  if (!ageYears) {
    ageYearsError.classList.remove("d-none")
    maxAgeYearsError.classList.add("d-none")
  } else if (ageYearsLength > 2) {
    ageYearsError.classList.add("d-none")
    maxAgeYearsError.classList.remove("d-none")
  } else if (ageYears > 35) {
    ageYearsError.classList.add("d-none")
    maxAgeYearsError.classList.remove("d-none")
  } else {
    ageYearsError.classList.add("d-none")
    maxAgeYearsError.classList.add("d-none")
  }

  if (!ageMonths) {
    ageMonthsError.classList.remove("d-none")
    maxAgeMonthsError.classList.add("d-none")
  } else if (ageMonthsLength > 2) {
    ageMonthsError.classList.add("d-none")
    maxAgeMonthsError.classList.remove("d-none")
  } else if (ageMonths > 11) {
    ageMonthsError.classList.add("d-none")
    maxAgeMonthsError.classList.remove("d-none")
  } else {
    ageMonthsError.classList.add("d-none")
    maxAgeMonthsError.classList.add("d-none")
  }

  if (ageTotal > 420) {
    maxAgeYearsError.classList.remove("d-none")
    maxAgeMonthsError.classList.remove("d-none")
  }

  if (!breed) {
    breedError.classList.remove("d-none")
  } else {
    breedError.classList.add("d-none")
  }

  if (!name || !ageYears || ageYears > 2 || ageYears > 35 || !ageMonths || ageMonthsLength > 2 || ageMonths > 11 || ageTotal > 420 || !breed) {
    return
  }
}