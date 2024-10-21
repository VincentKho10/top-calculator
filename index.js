const mainpage = document.querySelector("div#mainpage");
const numbersection = document.createElement("div");
const operatorsection = document.createElement("div");
const miscsection = document.createElement("div");
const resultsection = document.createElement("div");

numbersection.setAttribute('class','numsection row')
operatorsection.setAttribute('class','opersection col')
miscsection.setAttribute('class','miscsection row')
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
      display.textContent = (parseFloat(result).toFixed(2));
    } else {
      operator = charoperator;
      display.textContent = (parseFloat(result).toFixed(2) + " " + operator);
    }
  } else {
    display.textContent = (operand);
  }
  resultsection.replaceChildren(display)
};

const calculationProcess = (char) => {
  result = parseFloat(result).toFixed(2);
  operand = parseFloat(operand).toFixed(2);
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

const group0 = document.createElement('div');
const group1 = document.createElement('div');
const group2 = document.createElement('div');
const group3 = document.createElement('div');

group0.setAttribute('class', 'group0 row');
group1.setAttribute('class', 'group1 row');
group2.setAttribute('class', 'group2 row');
group3.setAttribute('class', 'group3 row');

[...numbernodes[0]].forEach((char, idx) => {
  const btnnumber = document.createElement("button");
  btnnumber.textContent = char;
  if (char == ".") {
    btnnumber.setAttribute("id", "btndot");
  }
  btnnumber.setAttribute('class',`btnnumber`)
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
  const groupidx = Math.floor(idx/3);
  if(groupidx==0){
    group0.append(btnnumber)
  }
  else if(groupidx==1){
    group1.append(btnnumber)
  }
  else if(groupidx==2){
    group2.append(btnnumber)
  }else{
    group3.append(btnnumber)
  }
});
numbernodes.push(group0,group1,group2,group3)
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

const result_action = document.createElement('div')
const action_nummisc_operator = document.createElement('div')
const nummisc_number_misc = document.createElement('div')

result_action.setAttribute('class', 'result_action col')
action_nummisc_operator.setAttribute('class', 'action_numisc_oper row')
nummisc_number_misc.setAttribute('class', 'numisc_number_misc col')

result_action.append(resultsection, action_nummisc_operator)
action_nummisc_operator.append(nummisc_number_misc, operatorsection)
nummisc_number_misc.append(miscsection, numbersection)

mainpage.appendChild(result_action);
