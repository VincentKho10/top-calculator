const mainpage = document.querySelector("div#mainpage");
const numbersection = document.createElement("div");
const operatorsection = document.createElement("div");
const resultsection = document.createElement("div");

let operand = "";
let result = "";
let isInit = true;
let operator = "";
let isDotUsed = false;

const numbernodes = ["0123456789"];
const operatornodes = ["*/+-="];

const resetOperand = () => (operand = "");
const varReset = () => {
  operand = "";
  result = "";
  isInit = true;
  operator = "";
};

const displayCalculation = (isCalculation, charoperator)=>{
  // console.log(`operator: ${operator}, operand: ${operand}, result:${result}`)
  if (isCalculation){
    if (charoperator == "=") {
      console.log("end result:" + parseFloat(result));
    } else {
      operator = charoperator;
      console.log("current state:" + parseFloat(result) + " " + operator);
    }
  }else{
    console.log("operand: " + operand);
  }
}

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

[...numbernodes[0]].forEach((char, idx) => {
  const btnnumber = document.createElement("button");
  btnnumber.textContent = char;
  // if (char == ".") {
  //   btnnumber.setAttribute("id", "btndot");
  // }
  btnnumber.addEventListener("click", () => {
    if (operator=="="){
      result=""
      isInit = true
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
  btnoperator.addEventListener("click", () => {
    if(isInit){
      result = operand
      operand = ""
      operator = char
      isInit = false
      return
    }
    if(operand!=""&&result!=""){
      calculationProcess(char);
    }
    operator = char
    displayCalculation(true, char)
    resetOperand();
  });
  operatornodes.push(btnoperator);
});
operatornodes.splice(0, 1);

numbersection.append(...numbernodes);
operatorsection.append(...operatornodes);

mainpage.append(numbersection, operatorsection);
