const grossIncomeInput = document.getElementById("gross-income");
const extraIncomeInput = document.getElementById("extra-income");
const ageGroupInput = document.getElementById("age-group");
const deductionInput = document.getElementById("deduction");

const incomeMsg = document.getElementById("result-msg");
const closeBtn = document.getElementById("closeBtn");
const resultBox = document.getElementById("result-box");
const blurEffect = document.getElementById("blur");

const MIN_INCOME = 800000;

let inputEmpty = false;

// description Icon
const descriptionsList = document.querySelectorAll(".description");
descriptionsList.forEach((description) => new bootstrap.Tooltip(description));

// Error Icon
const errorIconList = document.querySelectorAll(".error-icon");
errorIconList.forEach((errorIcon) => new bootstrap.Tooltip(errorIcon));

const errorTitle = [
  "Please enter number only",
  "Please note that this input field is mandatory. You must fill it out before proceeding.",
];

async function setErrorIcon(v) {
  errorIconList.forEach((errorIcon) => {
    errorIcon.setAttribute("data-bs-title", `${errorTitle[v]}`);

    new bootstrap.Tooltip(errorIcon);
  });
}

// Check all Input
const inputs = document.querySelectorAll(".input-tag");
inputs.forEach((input) => {
  input.addEventListener("input", validateInput);
});

async function validateInput(event) {
  const inputValue = event.target.value;
  if (isNaN(inputValue) || inputValue < 0) {
    await setErrorIcon(0);
    event.target.nextElementSibling.classList.remove("invisible");
  } else {
    inputEmpty = false;
    event.target.nextElementSibling.classList.add("invisible");
  }
}

// Close Btn
closeBtn.addEventListener("click", () => {
  if (resultBox.classList.contains("invisible")) {
    return;
  } else {
    resultBox.classList.add("invisible");
    blurEffect.classList.add("invisible");
  }
});

// Calculate Function
function taxCalculate() {
  inputs.forEach((input) => {
    if (input.value == "") {
      inputEmpty = true;
      setErrorIcon(1);
      input.nextElementSibling.classList.remove("invisible");
    }
  });
  if (inputEmpty) {
    return;
  } else {
    let grossAmount = Number(grossIncomeInput.value);
    let extraAmount = Number(extraIncomeInput.value);
    let taxPercentage = Number(ageGroupInput.value);
    let deductionAmount = Number(deductionInput.value);

    let totalAmount = grossAmount + extraAmount - deductionAmount;

    if (totalAmount <= MIN_INCOME) {
      incomeMsg.innerHTML = `
      <h1 class="text-center">Your overall income will be</h1>
      <h2>${totalAmount.toLocaleString("en-IN")}</h2>
      <p>tax is not applicable for income under 8 lakh</p>
      `;
      resultBox.classList.remove("invisible");
      blurEffect.classList.remove("invisible");
      return;
    } else if (totalAmount >= MIN_INCOME) {
      totalAmount =
        totalAmount - (totalAmount - MIN_INCOME) * (taxPercentage / 100);

      incomeMsg.innerHTML = `
      <h1 class="text-center">Your overall income will be</h1>
      <h2>${totalAmount.toLocaleString("en-IN")}</h2>
      <p>after tax deduction</p>
      `;

      resultBox.classList.remove("invisible");
      blurEffect.classList.remove("invisible");
      return;
    }
  }
}
