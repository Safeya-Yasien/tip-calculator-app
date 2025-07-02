const billInput = document.querySelector("#bill-input");
const numberPeopleInput = document.querySelector("#number-people-input");
const resultTip = document.querySelector("#result-tip");
const resultTotal = document.querySelector("#result-total");
const buttonReset = document.querySelector("#button-reset");
const tipButtons = document.querySelectorAll(".percentage-choice button");
const customTipInput = document.querySelector(".input.custom");
const errorMsg = document.querySelector(".if-zero-number");

let billValue = 0;
let numberPeopleValue = 0;
let tipValue = 0;

// Event Listeners
billInput.addEventListener("input", (e) => {
  billValue = parseFloat(e.target.value) || 0;
  updateResetButtonState();
  calculateTip();
});

numberPeopleInput.addEventListener("input", (e) => {
  numberPeopleValue = parseInt(e.target.value) || 0;
  validatePeople();
  updateResetButtonState();
  calculateTip();
});

tipButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    clearTipActive();
    e.target.classList.add("active");
    tipValue = parseFloat(e.target.value);
    customTipInput.value = "";
    updateResetButtonState();
    validatePeople();
    calculateTip();
  });
});

customTipInput.addEventListener("input", (e) => {
  clearTipActive();
  tipValue = parseFloat(e.target.value) || 0;
  updateResetButtonState();
  validatePeople();
  calculateTip();
});

buttonReset.addEventListener("click", (e) => {
  e.target.classList.add("has-reset-activated");

  setTimeout(() => {
    e.target.classList.remove("has-reset-activated");
  }, 1000);

  // Reset all values
  billInput.value = "";
  numberPeopleInput.value = "";
  customTipInput.value = "";
  resultTip.textContent = "0.00";
  resultTotal.textContent = "0.00";
  numberPeopleInput.style.border = "none";
  errorMsg.textContent = "";
  tipValue = 0;
  billValue = 0;
  numberPeopleValue = 0;
  clearTipActive();
  buttonReset.disabled = true;
});

// Utility functions
function calculateTip() {
  if (billValue > 0 && numberPeopleValue > 0 && tipValue >= 0) {
    const tipAmount = (billValue * tipValue) / 100 / numberPeopleValue;
    const totalAmount = billValue / numberPeopleValue + tipAmount;

    resultTip.textContent = tipAmount.toFixed(2);
    resultTotal.textContent = totalAmount.toFixed(2);
  }
}

function validatePeople() {
  if (!numberPeopleValue || numberPeopleValue === 0) {
    numberPeopleInput.style.border = "2px solid red";
    errorMsg.textContent = "Can't be zero";
  } else {
    numberPeopleInput.style.border = "none";
    errorMsg.textContent = "";
  }
}

function clearTipActive() {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
}

function updateResetButtonState() {
  const hasBill = billInput.value.trim() !== "" && parseFloat(billInput.value) > 0;
  const hasPeople = numberPeopleInput.value.trim() !== "" && parseInt(numberPeopleInput.value) > 0;
  const hasTip = tipValue > 0 || customTipInput.value.trim() !== "";

  buttonReset.disabled = !(hasBill || hasPeople || hasTip);
}
