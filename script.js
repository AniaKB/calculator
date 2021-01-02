class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
   clear() {
     this.currentOperand = ''
     this.previousOperand = ''
     this.operation = undefined
   }
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    
    appendNumber(number){
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
    
    compute(){
      let computation 
      const prev = parseFload(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNAN(prev) || isNan(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
         case '-':
          computation = prev - current
          break
         case '*':
          computation = prev * current
          break
         case '/':
          computation = prev / current
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
    
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits =stringNumber.split('.')[1]
      let integerDisplay
    }
    
    updateDisplay(){
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
        this.previousOperandTextElement.innerText = $(this.getDisplayNumber(this.previousOperand));
        // $(this.operation)
      }
      this.preciousOperandTextElement.innerText = this.previousOperand
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const allClearButton = document.querySelector('[data-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)
  
  console.log(numberButtons);
  numberButtons.forEach(button => {
    button.addEventListtener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
  })
  })
  
  operationButtons.forEach(button => {
    button.addEventListtener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
  })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })