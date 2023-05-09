'use strict';
const btnPrev = document.querySelector('.btn-prev');
const btnNext1 = document.querySelector('.btn-next-1');
const btnNext2 = document.querySelector('.btn-next-2');
const btnSubmit = document.querySelector('.btn-submit');
const btnContainer = document.querySelector('.buttons');
const formCards = [...document.querySelectorAll('.form-card')];
const numbers = document.querySelectorAll('.progress-num');
const progressLine = document.querySelector('.progress-line');
const inputs = document.querySelectorAll('input');
//Account variables
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const passwordCheck = document.querySelector('.password-check');
//Social media variables
const facebook = document.querySelector('.facebook');
const twitter = document.querySelector('.twitter');
const instagram = document.querySelector('.instagram');
//Personal details variables
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const phone = document.querySelector('.phone');
const address = document.querySelector('.address');

let curActive = formCards.findIndex(card => card.classList.contains('active'));

if (curActive < 0) {
  curActive = 0;
}

//Switch active cards upon a button click
function addActiveCard() {
  formCards.forEach((card, i) => {
    if (i === curActive) {
      card.classList.add('active-card');
    } else {
      card.classList.remove('active-card');
    }
  });
}

//Add or remove the color of the progress numbers
function updateNumbers() {
  numbers.forEach((num, i) => {
    if (i < curActive + 1) {
      num.classList.add('active');
    } else {
      num.classList.remove('active');
    }
  });
}

//Add or remove color to the progress line
function updateProgress() {
  const activeNums = document.querySelectorAll('.active');
  progressLine.style.width = `${
    ((activeNums.length - 1) / (numbers.length - 1)) * 100
  }%`;
}

//Update the entire page view
function updateView() {
  if (curActive === 0) {
    btnNext1.style.display = 'block';
  } else {
    btnNext1.style.display = 'none';
  }
  if (curActive === 1) {
    btnNext2.style.display = 'block';
  } else {
    btnNext2.style.display = 'none';
  }
  if (curActive > 0) {
    btnPrev.style.display = 'block';
  } else {
    btnPrev.style.display = 'none';
  }
  if (curActive === 2) {
    btnSubmit.style.display = 'block';
  } else {
    btnSubmit.style.display = 'none';
  }
  addActiveCard();
  updateNumbers();
  updateProgress();
}

//Button functionality
btnNext1.addEventListener('click', function (e) {
  e.preventDefault();
  if (!validateFirstCard()) return;
  ++curActive;
  updateView();
});

btnNext2.addEventListener('click', function (e) {
  e.preventDefault();
  if (!validateSecondCard()) return;
  ++curActive;
  updateView();
});

btnPrev.addEventListener('click', function (e) {
  e.preventDefault();
  --curActive;
  updateView();
});

btnSubmit.addEventListener('click', function (e) {
  const allValid = [...inputs].every(input => input.checkValidity());
  if (!validateThirdCard() && !allValid) return;
  console.log(allValid);
});

//Check if the first card is valid
function validateFirstCard() {
  let valid = true;
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordCheckValue = passwordCheck.value;

  if (emailValue === '') {
    setError(email, 'Field cannot be blank');
    valid = false;
  } else if (!isEmail(emailValue)) {
    setError(email, 'Email is incorrect');
    valid = false;
  } else {
    setSuccess(email);
    valid = true;
  }
  if (passwordValue === '') {
    setError(password, 'Field cannot be blank');
    valid = false;
  } else if (!isNumber(passwordValue)) {
    setError(password, 'Password must contain at least one number');
    valid = false;
  } else {
    setSuccess(password);
    valid = true;
  }
  if (passwordCheckValue === '') {
    setError(passwordCheck, 'Field cannot be blank');
    valid = false;
  } else if (
    passwordCheckValue !== passwordValue ||
    !isNumber(passwordCheckValue)
  ) {
    setError(passwordCheck, 'Password is incorrect');
    valid = false;
  } else {
    setSuccess(passwordCheck);
    valid = true;
  }

  if (passwordCheckValue && passwordValue && !isEmail(emailValue)) {
    valid = false;
  }

  return valid;
}

//Check if the second card is valid
function validateSecondCard() {
  let valid = true;
  const facebookValue = facebook.value;
  const twitterValue = twitter.value;
  const instagramValue = instagram.value;
  if (facebookValue === '') {
    setError(facebook, 'Field cannot be blank');
    valid = false;
  } else {
    setSuccess(facebook);
    valid = true;
  }
  if (twitterValue === '') {
    setError(twitter, 'Field cannot be blank');
    valid = false;
  } else {
    setSuccess(twitter);
    valid = true;
  }
  if (instagramValue === '') {
    setError(instagram, 'Field cannot be blank');
    valid = false;
  } else {
    setSuccess(instagram);
    valid = true;
  }
  if (!facebookValue || !twitterValue || !instagramValue) {
    valid = false;
  }
  return valid;
}

//Check if the third card is valid
function validateThirdCard() {
  let valid;
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const phoneValue = phone.value;
  const addressValue = address.value;

  if (firstNameValue === '') {
    setError(firstName, 'Field cannot be blank');
    valid = false;
  } else if (isNumber(firstNameValue)) {
    setError(firstName, 'Name cannot contain numbers');
    valid = false;
  } else {
    setSuccess(firstName);
    valid = true;
  }

  if (lastNameValue === '') {
    setError(lastName, 'Field cannot be blank');
    valid = false;
  } else if (isNumber(lastNameValue)) {
    setError(lastName, 'Name cannot contain numbers');
    valid = false;
  } else {
    setSuccess(lastName);
    valid = true;
  }
  if (phoneValue === '') {
    setError(phone, 'Field cannot be blank');
    valid = false;
  } else if (!isNumber(phoneValue)) {
    setError(phone, 'Phone number is incorrect. Use digits only');
    valid = false;
  } else if (phoneValue.length < phone.minLength) {
    setError(phone, 'Phone number is too short');
    valid = false;
  } else {
    setSuccess(phone);
    valid = true;
  }
  if (addressValue === '') {
    setError(address, 'Field cannot be blank');
    valid = false;
  } else {
    setSuccess(address);
    valid = true;
  }

  return valid;
}

//Check if email value is correct
function isEmail(email) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}

//Check if a password contains a number
function isNumber(password) {
  return /\d/.test(password);
}

//Set error if inputs are incorrect
function setError(input, msg) {
  const parent = input.parentElement;
  parent.classList.remove('success');
  parent.classList.add('error');
  parent.querySelector('.error-msg').innerText = msg;
}

//Set success if inputs are correct
function setSuccess(input) {
  const parent = input.parentElement;
  parent.classList.remove('error');
  parent.classList.add('success');
}
