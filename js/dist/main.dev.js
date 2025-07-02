"use strict";

var billInput = document.querySelector("#bill-input");
var numberPeopleInput = document.querySelector("#number-people-input");
var resultTip = document.querySelector("#result-tip");
var resultTotal = document.querySelector("#result-total");
var buttonReset = document.querySelector("#button-reset");
var tipButtons = document.querySelectorAll(".percentage-choice button");
var customTipInput = document.querySelector(".input.custom");
var errorMsg = document.querySelector(".if-zero-number");
var billValue = 0;
var numberPeopleValue = 0;
var tipValue = 0; // Event Listeners

billInput.addEventListener("input", function (e) {
  billValue = parseFloat(e.target.value) || 0;
  updateResetButtonState();
  calculateTip();
});
numberPeopleInput.addEventListener("input", function (e) {
  numberPeopleValue = parseInt(e.target.value) || 0;
  validatePeople();
  updateResetButtonState();
  calculateTip();
});
tipButtons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    clearTipActive();
    e.target.classList.add("active");
    tipValue = parseFloat(e.target.value);
    customTipInput.value = "";
    updateResetButtonState();
    validatePeople();
    calculateTip();
  });
});
customTipInput.addEventListener("input", function (e) {
  clearTipActive();
  tipValue = parseFloat(e.target.value) || 0;
  updateResetButtonState();
  validatePeople();
  calculateTip();
});
buttonReset.addEventListener("click", function (e) {
  e.target.classList.add("has-reset-activated");
  setTimeout(function () {
    e.target.classList.remove("has-reset-activated");
  }, 1000); // Reset all values

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
}); // Utility functions

function calculateTip() {
  if (billValue > 0 && numberPeopleValue > 0 && tipValue >= 0) {
    var tipAmount = billValue * tipValue / 100 / numberPeopleValue;
    var totalAmount = billValue / numberPeopleValue + tipAmount;
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
  tipButtons.forEach(function (btn) {
    return btn.classList.remove("active");
  });
}

function updateResetButtonState() {
  var hasBill = billInput.value.trim() !== "" && parseFloat(billInput.value) > 0;
  var hasPeople = numberPeopleInput.value.trim() !== "" && parseInt(numberPeopleInput.value) > 0;
  var hasTip = tipValue > 0 || customTipInput.value.trim() !== "";
  buttonReset.disabled = !(hasBill || hasPeople || hasTip);
}