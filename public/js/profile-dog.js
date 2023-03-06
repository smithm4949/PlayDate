// DOG - ADD & DELETE

// Show the dog form and reset the fields
function showNewDogForm() {
  const dogForm = document.querySelector('form');
  dogForm.reset();
  document.querySelector('.dogForm').style.display = 'block';
  document.querySelector('#submitDog-btn').style.display = 'block';
  document.querySelector('#addDogSection').style.display = 'none';
}

// // Hide the dog form after the form has been submitted
// function hideNewDogForm() {
//   document.querySelector('.dogForm').style.display = 'none';
//   document.querySelector('#submitDog-btn').style.display = 'none';
// }

// Back button for the dog form if the user doesn't want to add another dog 
function backDogForm() {
  location.reload();
  dogSection.scrollIntoView({ behavior: 'smooth', block: "start" });
  document.querySelector('.dogForm').style.display = 'none';
}

// POST a new DOG to table
const addDogFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#dog-name').value.trim();
  const age_years = parseInt(document.querySelector('#dog-age').value.trim());
  const age_months = parseInt(document.querySelector('#dog-age-months').value.trim());
  const age = (age_years * 12) + age_months;
  const breed = document.querySelector('#dog-breed').value.trim();
  const gender = document.querySelector('#dog-gender').value.trim();
  const dogSection = document.querySelector('#dog-section');

  // CREATE-POST a dog from OWNER profile page
  if (name && age && breed && gender) {
    const response = await fetch('/api/dogs', {
      method: 'POST',
      body: JSON.stringify({ name, age, breed, gender }),
      headers: { 'Content-Type': 'application/json' },
    });
    // IF response is successful, then go to the profile
    if (response.ok) {
      // when hitting submit, go to the part of the profile that is the dogsection
      location.reload();
      dogSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert(response.statusText);
    }
  }
};
document.querySelector('#submitDog-btn').addEventListener('click', (event) => {
  dogValidation(event);
  addDogFormHandler(event);
});

// DELETE a dog
const delButtonHandler = async (event) => {
  const dogSection = document.querySelector('#dog-section');

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/dogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      location.reload();
      dogSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Failed to delete dog profile');
    }
  }
};
document
  .querySelector('.dog-list').addEventListener('click', delButtonHandler);



//Validations
function dogValidation(event) {
  event.preventDefault();
  const name = document.querySelector('#dog-name').value.trim();
  const ageYears = document.querySelector('#dog-age').value.trim();
  const ageYearsLength = ageYears.length;
  const ageMonths = document.querySelector('#dog-age-months').value.trim();
  const ageMonthsLength = ageMonths.length;
  const ageTotal = (parseInt(ageYears) * 12) + parseInt(ageMonths);
  const breed = document.querySelector('#dog-breed').value.trim();

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