const mainpage = document.querySelector("div#mainpage");
const numbersection = document.createElement("div");
const operatorsection = document.createElement("div");
const resultsection = document.createElement("div");

let operand = "";
let result = "";
let isInit = true;
let operator = "";
let isDotUsed = false;

const numbernodes = ["0123456789."];
const operatornodes = ["*/+-="];

const enableDotButton = (isOn) => {
  const dot = document.querySelector("#btndot");
  if (isOn) {
    dot.removeAttribute("disabled");
  } else {
    dot.setAttribute("disabled", "");
  }
};

const resetOperand = () => (operand = "");
const varReset = () => {
  operand = "";
  result = "";
  isInit = true;
  operator = "";
  isDotUsed = false;
};

const calculationProcess = (char) => {
  result = parseFloat(result);
  operand = parseFloat(operand);
  operator = char;
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
  if (char == "=") {
    console.log("end result:" + parseFloat(result));
  } else{
    console.log("current state:" + parseFloat(result) + " " + operator);
  }
  isDotUsed = false;
};

[...numbernodes[0]].forEach((char, idx) => {
  const btnnumber = document.createElement("button");
  btnnumber.textContent = char;
  if (char == ".") {
    btnnumber.setAttribute("disabled", "")
    btnnumber.setAttribute('id', 'btndot')
  };
  btnnumber.addEventListener("click", () => {
    operand += char;
    console.log("operand: " + operand);

    if(operand.length>=1 && !isDotUsed){
      enableDotButton(true)
    }

    if(char=="."){
      enableDotButton(false)
      isDotUsed=true
    }

    if (isInit) {
      result = operand;
    }
  });
  numbernodes.push(btnnumber);
});
numbernodes.splice(0, 1);

[...operatornodes[0]].forEach((char, idx) => {
  const btnoperator = document.createElement("button");
  btnoperator.textContent = char;
  btnoperator.addEventListener("click", () => {
    calculationProcess(char);
    if (char == "=") {
      varReset();
      return;
    }
    resetOperand();
  });
  operatornodes.push(btnoperator);
});
operatornodes.splice(0, 1);

numbersection.append(...numbernodes);
operatorsection.append(...operatornodes);

mainpage.append(numbersection, operatorsection);
