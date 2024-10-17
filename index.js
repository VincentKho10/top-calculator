const mainpage = document.querySelector("div#mainpage");
const numbersection = document.createElement("div");
const operatorsection = document.createElement("div");
const resultsection = document.createElement("div");

let operand = "";
let result = "";
let isInit = true;
let operator = "";

const numbernodes = [];
const operatornodes = ["*/+-="];

const resetOperand = () => (operand = "");
const varReset = () => {
  operand = "";
  result = "";
  isInit = true;
  operator = "";
};

const calculationProcess = () => {
  result = parseInt(result);
  operand = parseInt(operand);
  switch (operator) {
    case "+":
      result += operand;
      break;
    case "-":
      result -= operand;
      break;
    case "*":
      result *= operand;
      break;
    case "/":
      result /= operand;
      break;
    default:
      break;
  }
};

for (let i = 0; i < 10; i++) {
  const btnnumber = document.createElement("button");
  btnnumber.textContent = i;
  btnnumber.addEventListener("click", () => {
    if (isInit) {
      result += i;
      console.log("operand: " + result);
    } else {
      operand += i;
      console.log("operand: " + operand);
    }
  });
  numbernodes.push(btnnumber);
}

for (let char of operatornodes[0]) {
  const btnoperator = document.createElement("button");
  btnoperator.textContent = char;
  btnoperator.addEventListener("click", () => {
    if (char != "=") {
        calculationProcess();
        operator = char;
        console.log(result + " " + operator);
    } else {
        calculationProcess();
        console.log(result);
        varReset();
        return;
    }
    resetOperand();
    isInit = false;
  });
  operatornodes.push(btnoperator);
}
operatornodes.splice(0, 1);

numbersection.append(...numbernodes);
operatorsection.append(...operatornodes);

mainpage.append(numbersection, operatorsection);
