console.log("Check 1");

let signupBtn = document.querySelector("#submit-btn");
signupBtn.addEventListener('click', (event) => {
  console.log("Check 2");
  ownerValidation(event)
  dogValidation(event)
  signupFormHandler(event);
});

async function signupFormHandler(event) {
  console.log("IN HERE");
  event.preventDefault();
  // OWNER Model columns for the intake form - 
  // we are not initially asking for picture 
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const first_name = document.querySelector('#first_name-signup').value.trim();
  const last_name = document.querySelector('#last_name-signup').value.trim();
  const gender = document.querySelector('#gender-signup').value.trim();
  const location_zip = document.querySelector('#location_zip-signup').value.trim();
  const description = document.querySelector('#description-signup').value.trim();

  console.log(username, password, first_name, last_name, gender, location_zip, description)

  let dog = getDogInfo();
  // POST to Owner table
  if (username && password && first_name && last_name && gender && location_zip && description) {
    const response = await fetch('/api/owners', {
      method: 'POST',
      body: JSON.stringify({ username, password, first_name, last_name, gender, location_zip, description, dogs: [dog] }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');;
    } else {
      console.log(response.statusText);
    }
  }
}

const getDogInfo = () => {
  const name = document.querySelector('#dog-name-signup').value.trim();
  const age_years = parseInt(document.querySelector('#dog-age-signup').value.trim());
  const age_months = parseInt(document.querySelector('#dog-age-months-signup').value.trim());
  const breed = document.querySelector('#dog-breed-signup').value.trim();
  const gender = document.querySelector('#dog-gender-signup').value.trim();

  const age = (age_years * 12) + age_months;

  return { name, age, breed, gender };
}

//Validations



function ownerValidation(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const passwordlength = password.length
  const first_name = document.querySelector('#first_name-signup').value.trim();
  const last_name = document.querySelector('#last_name-signup').value.trim();
  const location_zip = document.querySelector('#location_zip-signup').value.trim();
  const ziplength = location_zip.length
  const description = document.querySelector('#description-signup').value.trim();

  const usernameError = document.querySelector('.no-username-msg')
  const passwordError = document.querySelector('.no-password-msg')
  const passwordlengthError = document.querySelector('.password-length-msg')
  const firstnameError = document.querySelector('.no-firstname-msg')
  const lastnameError = document.querySelector('.no-lastname-msg')
  const noZipError = document.querySelector('.no-zipcode-msg')
  const zipLengthError = document.querySelector('.zipcode-length-msg')
  const descriptionError = document.querySelector('.no-description-msg')

  if (!username) {
    usernameError.classList.remove("d-none")
  } else {
    usernameError.classList.add("d-none")
  }

  if (!password) {
    passwordError.classList.remove("d-none")
  } else if (passwordlength < 8 || passwordlength > 16) {
    passwordError.classList.add("d-none")
    passwordlengthError.classList.remove("d-none")
  } else {
    passwordError.classList.add("d-none")
    passwordlengthError.classList.add("d-none")
  }

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

  if (!username || !password || !first_name || !last_name || !location_zip || ziplength !== 5 || !description || passwordlength < 8 || passwordlength > 16) {
    return
  }
}

function dogValidation(event) {
  event.preventDefault();
  const name = document.querySelector('#dog-name-signup').value.trim();
  const ageYears = document.querySelector('#dog-age-signup').value.trim();
  const ageYearsLength = ageYears.length;
  const ageMonths = document.querySelector('#dog-age-months-signup').value.trim();
  const ageMonthsLength = ageMonths.length;
  const ageTotal = (parseInt(ageYears)*12) + parseInt(ageMonths);
  const breed = document.querySelector('#dog-breed-signup').value.trim();

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