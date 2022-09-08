class Calculator {
    constructor(preText, curText) {
        this.preText = preText
        this.curText = curText
        this.curNumber = ''
    }

    // When AC Button Press
    clear() {
        this.preNumber = ''
        this.curNumber = ''
        this.operator = ''
    }

    //For backspace press
    backSpace() {
        this.curNumber = this.curNumber.toString().slice(0, -1)
    }

    //When any operator button press
    operation(operator) {
        if (this.curNumber === '' && this.preNumber === '') return
        this.operator = operator
        if (this.preNumber !== '' && this.curNumber !== '') {
            this.calculate()
        }
        if (this.curNumber !== '') {
            this.preNumber = this.curNumber
            this.curNumber = ''
            console.log(this.operator)
        }
    }

    //When any number included dot press
    append(num) {
        if (num === '.' && this.curNumber.includes('.')) {
            return
        }
        this.curNumber = this.curNumber.toString() + num.toString()
    }

    //When equal or operator button press
    calculate() {
        let result
        const preNum = parseFloat(this.preNumber)
        const curNum = parseFloat(this.curNumber)
        if (isNaN(preNum) || isNaN(curNum)) {
            return
        }

        switch (this.operator) {
            case '+':
                result = preNum + curNum
                break
            case '-':
                result = preNum - curNum
                break
            case 'x':
                result = preNum * curNum
                break
            case '÷':
                result = preNum / curNum
                break
            default:
                break
        }

        this.curNumber = result
        this.preNumber = ''
    }

    //To show the comma in the displayed number
    formatOutput(number) {
        let stringNumbe = number.toString()
        let intNumber = parseFloat(stringNumbe.split('.')[0])
        let decNumber = stringNumbe.split('.')[1]
        let integerDigit                                    // To temp storage of split left number
        if (isNaN(intNumber)) {
            integerDigit = ''
        } else {
            integerDigit = intNumber.toLocaleString('en')
        }
        if (decNumber !== undefined) {
            return `${integerDigit}.${decNumber}`
        } else {
            return integerDigit
        }
    }

    // To update the screen
    updateOutput() {
        this.curText.innerText = this.formatOutput(this.curNumber)
        if (this.preNumber == undefined) return
        if (this.operator !== null) {
            if (this.preNumber === '') {
                this.preText.innerText = ''                             // It will prevent to display Undefine each time in the upper side
            }
            else {
                this.preText.innerText = `${this.formatOutput(this.preNumber)} ${this.operator}`
            }
        }

    }


}

//Variable Section
const numButton = document.getElementsByClassName("numbers")            //For all the buttons 1 - 9 and dot
const oprButton = document.getElementsByClassName("operator")           //For all the Operators ( +, -, x, /)
const equalButton = document.querySelector(".equal")
const clearButton = document.querySelector(".clear")
const preText = document.querySelector(".pre_num")                      //The above number in the calculator screen
const curText = document.querySelector(".cur_num")                      //The main number in the calculator screen
const backSpace = document.querySelector(".bs")


//Creating Calculator object
const calculator = new Calculator(preText, curText)

// If any number button click
Array.from(numButton).forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText)
        calculator.updateOutput()
    })
})


//If any operation buttons (+, -, x, / ) click
Array.from(oprButton).forEach(button => {
    button.addEventListener('click', () => {
        calculator.operation(button.innerText)
        calculator.updateOutput()
    })
})


// If equal button click
equalButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.updateOutput()
})

//If Clear button click
clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateOutput()
})


// If backspace click
backSpace.addEventListener("click", button => {
    calculator.backSpace()
    calculator.updateOutput()
})