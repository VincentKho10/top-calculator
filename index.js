const mainpage = document.querySelector("div#mainpage");
const numbersection = document.createElement("div");
const operatorsection = document.createElement("div");
const miscsection = document.createElement("div");
const resultsection = document.createElement("div");

numbersection.setAttribute('class','numsection')
operatorsection.setAttribute('class','opersection')
miscsection.setAttribute('class','miscsection')
resultsection.setAttribute('class','ressection')

let operand = "";
let result = "";
let isInit = true;
let operator = "";
let isDotUsed = false;
let isOperandNeg = false;

const numbernodes = ["7894561230."];
const operatornodes = ["*/+-="];
const miscnodes = ["AC", "C", "+/-", "%"];

const resetOperand = () => {
  operand = "";
  if (isDotUsed) {
    toggleIsDot();
  }
};
const varReset = () => {
  operand = "";
  result = "";
  isInit = true;
  operator = "";
  isDotUsed = false;
  isOperandNeg = false;
};

const toggleIsDot = () => {
  const btndot = document.querySelector("#btndot");
  isDotUsed = !isDotUsed;
  if (isDotUsed) {
    btndot.setAttribute("disabled", "");
  } else {
    //enable dot
    btndot.removeAttribute("disabled");
  }
};

const displayCalculation = (isCalculation, charoperator) => {
  console.log(`operator: ${operator}, operand: ${operand}, result:${result}`);
  const display = document.createElement('div')
  if (isCalculation) {
    if (charoperator == "=") {
      display.textContent = ("end result:" + parseFloat(result));
    } else {
      operator = charoperator;
      display.textContent = ("current state:" + parseFloat(result) + " " + operator);
    }
  } else {
    display.textContent = ("operand: " + operand);
  }
  resultsection.replaceChildren(display)
};

const calculationProcess = (char) => {
  result = parseFloat(result);
  operand = parseFloat(operand);
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

miscnodes.forEach((val, idx) => {
  const btnmisc = document.createElement("button");
  btnmisc.textContent = val;
  btnmisc.setAttribute('class', `btnmisc`)
  btnmisc.addEventListener("click", () => {
    switch (val) {
      case "AC":
        varReset()
        break;
      case "C":
        const operand_length = operand.length
        operand = operand.substring(0,operand_length-1)
        break;
      case "+/-":
        if (!isOperandNeg) {
          operand = operand.padStart(operand.length + 1, "-");
          isOperandNeg = true;
        } else {
          operand = operand.substring(1, operand.length);
          isOperandNeg = false;
        }
        break;
      case "%":
        operand/=100
        break;
      default:
        break;
    }
    displayCalculation(false);
  });
  miscnodes.push(btnmisc);
});
miscnodes.splice(0, 4);

[...numbernodes[0]].forEach((char, idx) => {
  const btnnumber = document.createElement("button");
  btnnumber.textContent = char;
  if (char == ".") {
    btnnumber.setAttribute("id", "btndot");
  }
  btnnumber.setAttribute('class',`btnnumber col${idx%3}`)
  btnnumber.addEventListener("click", () => {
    if (operator == "=") {
      result = "";
      isInit = true;
    }

    if (char == ".") {
      if (operand == "") {
        operand += "0";
      }
      toggleIsDot();
    }

    operand += char;
    displayCalculation(false);
  });
  numbernodes.push(btnnumber);
});
numbernodes.splice(0, 1);

[...operatornodes[0]].forEach((char, idx) => {
  const btnoperator = document.createElement("button");
  btnoperator.textContent = char;
  btnoperator.setAttribute('class', 'btnoperator')
  btnoperator.addEventListener("click", () => {
    if (isInit) {
      result = operand;
      operand = "";
      operator = char;
      isInit = false;
      return;
    }
    if(operator=="="){
      operator=char
    }
    if (operand != "" && result != "") {
      calculationProcess(char);
      operator = char;
      displayCalculation(true, char);
    }
    resetOperand();
  });
  operatornodes.push(btnoperator);
});
operatornodes.splice(0, 1);

numbersection.append(...numbernodes);
operatorsection.append(...operatornodes);
miscsection.append(...miscnodes);

mainpage.append(numbersection, miscsection, operatorsection, resultsection);
