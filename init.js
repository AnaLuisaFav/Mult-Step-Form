function updateStep(step) {
  document.querySelector(".infos-step-1").style.display = step === 1 ? "block" : "none"
  document.querySelector(".infos-step-2").style.display = step === 2 ? "block" : "none"
  document.querySelector(".infos-step-3").style.display = step === 3 ? "block" : "none"
  document.querySelector(".infos-step-4").style.display = step === 4 ? "block" : "none"
  document.querySelector(".thanks").style.display = "none"
  document.querySelector(".botao-confirm").style.display = step === 4 ? "block" : "none"
  document.querySelector(".botao-next").style.display = step !== 4 ? "block" : "none"
  document.querySelector(".botao-back").style.display = step === 1 ? "none" : "block"
  document.querySelector(".botoes").style.justifyContent = step === 1 ? "end" : "space-between"
  document.querySelector(".botao-back").style.display = step === 1 ? "none" : "block"
  document.querySelector(".botao-next").style.display = step !== 4 ? "block" : "none"
  document.querySelector(".botao-confirm").style.display = step === 4 ? "block" : "none"

   if (step === 2) {
    const yearlyElements = document.querySelectorAll('.yearly')
    const monthlyElements = document.querySelectorAll('.monthly')

    if (isMonthVisible) {
      monthlyElements.forEach(function(element) {
        element.style.display = 'block'
      })
      yearlyElements.forEach(function(element) {
        element.style.display = 'none'
      })
    } else {
      monthlyElements.forEach(function(element) {
        element.style.display = 'none'
      })
      yearlyElements.forEach(function(element) {
        element.style.display = 'block'
      })
    }
  } else if (step === 3) {
    const s3YearElements = document.querySelectorAll(".s3-year")
    const s3MonthElements = document.querySelectorAll(".s3-month")

    s3YearElements.forEach(function(element) {
      element.style.display = isMonthVisible ? "none" : "block"
    })

    s3MonthElements.forEach(function(element) {
      element.style.display = isMonthVisible ? "block" : "none"
  })

  } else if (step === 4) {
    const yearlyS4Element = document.querySelector(".yearly-s4")
    const monthlyS4Element = document.querySelector(".monthly-s4")
    yearlyS4Element.style.display = isMonthVisible ? "none" : "block"
    monthlyS4Element.style.display = isMonthVisible ? "block" : "none"
  }

}

function hideErrorMessage(inputElement, errorElement) {
  inputElement.addEventListener('input', function () {
    errorElement.textContent = '';
    inputElement.classList.remove('input-erro');
  });
}

function checkFormValidity() {
  const nameInput = document.querySelector('.nome')
  const emailInput = document.querySelector('.email')
  const phoneInput = document.querySelector('.fone')
  const erroName = document.querySelector('.erro-name')
  const erroEmail = document.querySelector('.erro-email')
  const erroPhone = document.querySelector('.erro-phone')

  let isFormValid = true
  if (nameInput.value.trim() === '') {
    isFormValid = false
    erroName.textContent = 'This field is required'
    nameInput.classList.add('input-erro')
    hideErrorMessage(nameInput, erroName);
  } else {
    erroName.textContent = ''
    nameInput.classList.remove('input-erro')
  }

  if (emailInput.value.trim() === '') {
    isFormValid = false
    erroEmail.textContent = 'This field is required'
    emailInput.classList.add('input-erro') 
    hideErrorMessage(emailInput, erroEmail);
  } else {
    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(emailInput.value)) {
      isFormValid = false
      erroEmail.textContent = 'Invalid email format'
      emailInput.classList.add('input-erro') 
      hideErrorMessage(emailInput, erroEmail);
    } else {
      erroEmail.textContent = ''
      emailInput.classList.remove('input-erro') 
    }
  }

  if (phoneInput.value.trim() === '') {
    isFormValid = false
    erroPhone.textContent = 'This field is required'
    phoneInput.classList.add('input-erro') 
    hideErrorMessage(phoneInput, erroPhone);
  } else {
    erroPhone.textContent = ''
    phoneInput.classList.remove('input-erro') 
  }
  return isFormValid
} 

let currentStep = 1
let nextStep = null

document.querySelector(".botao-next").addEventListener("click", function() {
  const isFormValid = checkFormValidity()
  if (isFormValid) {
      if (nextStep !== null) {
        currentStep = nextStep
        nextStep = null
      } else {
        if (currentStep === 2) {
          const selectedCard = document.querySelector('.card-selected')
          const erroCard = document.querySelector('.erro-card')
          const cardInputErro = document.querySelector('.card')

          if (!selectedCard) {
            erroCard.innerHTML = '<img class="botao-x" src="img/botao-x.png"> Choose an option'
            cardInputErro.classList.add('input-erro')
            return 
          } else {
            erroCard.textContent = ''
          }
        }

        if (currentStep === 3) {
          const selectedOpc = document.querySelector('.opc-selected')
          const erroOpc = document.querySelector('.erro-opc')
          if (!selectedOpc) {
            erroOpc.innerHTML = '<img class="botao-x" src="img/botao-x.png"> Choose an option'
            return
          } else {
            erroOpc.textContent = ''
          }
        }

        currentStep += 1 
        if (currentStep > 4) {
          currentStep = 4 
        }

        updateStep(currentStep)
      }

  const circles = document.querySelectorAll('.circle')
  circles.forEach(circle => {
    circle.classList.remove('selected')
  })
  document.querySelector(`.c${currentStep}`).classList.add('selected')
}
})

document.addEventListener("DOMContentLoaded", function() {
  updateStep(1)
  document.querySelector(".c1").classList.add('selected')

})

const cards = document.querySelectorAll('.card')
cards.forEach(function(card) {
  card.addEventListener('click', function() {
    cards.forEach(function(card) {
      card.classList.remove('card-selected')
    })
    this.classList.add('card-selected')
  })
})

const slider = document.querySelector('.slider')

let isMonthVisible = true

slider.addEventListener('click', function() {
  isMonthVisible = !isMonthVisible
  const yearlyElements = document.querySelectorAll('.yearly')
  const monthlyElements = document.querySelectorAll('.monthly')

  if (isMonthVisible) {
    monthlyElements.forEach(function(element) {
      element.style.display = 'block'
    })
    yearlyElements.forEach(function(element) {
      element.style.display = 'none'
    })
  } else {
    monthlyElements.forEach(function(element) {
      element.style.display = 'none'
    })
    yearlyElements.forEach(function(element) {
      element.style.display = 'block'
    })
  }
})

document.querySelector(".botao-back").addEventListener("click", function() {
  currentStep -= 1 
  if (currentStep < 1) {
    currentStep = 1
  }
  updateStep(currentStep)
  document.querySelectorAll('.circle').forEach(circle => circle.classList.remove('selected'))
  document.querySelector(`.c${currentStep}`).classList.add('selected')
})

const opc = document.querySelectorAll('.opc')
opc.forEach(function(opcs) {
  opcs.addEventListener('click', function() {
    const checkbox = this.querySelector('input[type="checkbox"]')
     if (checkbox.checked) return
    opc.forEach(function(opc) {
      opc.classList.remove('opc-selected')
      opc.querySelector('input[type="checkbox"]').checked = false
    })
    checkbox.checked = true
    this.classList.add('opc-selected')
  })

  const inputCheckbox = opcs.querySelector('input[type="checkbox"]')
  inputCheckbox.addEventListener('click', function(event) {
    event.stopPropagation() 
    const parentOpc = this.closest('.opc') 
    parentOpc.classList.toggle('opc-selected') 
  })
})

const botaoChangeM = document.querySelector('.botao-change-m')
const botaoChangeY = document.querySelector('.botao-change-y')
const botaoConfirm = document.querySelector('.botao-confirm')
const botaoNext = document.querySelector('.botao-next')
const c2 = document.querySelector('.c2')
const c4 = document.querySelector('.c4')

botaoChangeM.addEventListener('click', function() {

  document.querySelector(".infos-step-2").style.display = "block"
  document.querySelector(".infos-step-4").style.display = "none"
  c2.classList.add('selected')
  c4.classList.remove('selected')
  botaoConfirm.style.display = 'none'
  botaoNext.style.display = 'block'

  nextStep = null
  currentStep = 2
  updateStep(currentStep)
})

botaoChangeY.addEventListener('click', function() {

  document.querySelector(".infos-step-2").style.display = "block"
  document.querySelector(".infos-step-4").style.display = "none"
  c2.classList.add('selected')
  c4.classList.remove('selected')
  botaoConfirm.style.display = 'none'
  botaoNext.style.display = 'block'

  nextStep = null
  currentStep = 2
  updateStep(currentStep)
})


const thanks = document.querySelector('.thanks')
const botaoBack = document.querySelector('.botao-back')
botaoConfirm.addEventListener('click', function() {
  thanks.style.display = 'flex'
  document.querySelector(".infos-step-4").style.display = "none"
  botaoConfirm.style.display = "none"
  botaoBack.style.display = "none"
})
