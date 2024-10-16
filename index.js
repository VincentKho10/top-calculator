const mainpage = document.querySelector('div#mainpage')
const numbersection = document.createElement('div')
const operatorsection = document.createElement('div')

const operand1 = 0;
const operand2 = 0;

const numbernodes = []
const operatornodes = ["*/+-"]

for (let i=0; i<10; i++){
    const btnnumber = document.createElement('button')
    btnnumber.textContent = i
    btnnumber.addEventListener('click', ()=>console.log(i))
    numbernodes.push(btnnumber)
}

for(let char of operatornodes[0]){
    operatornodes.push(char)
}
operatornodes.splice(0,1)

console.log(operatornodes)

numbersection.append(...numbernodes)

mainpage.append(numbersection)