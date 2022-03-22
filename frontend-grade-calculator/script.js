const elements = {
  gradecountInput: document.getElementById('gradecount'),
  submitBtn: document.getElementById('submit'),
  gradefield: document.querySelector('div')
}

const { gradecountInput, submitBtn, gradefield } = elements;

function createElement({ type, txt, id }) {
  const elem = document.createElement(type)
  elem.innerText = txt
  elem.id = id
  document.body.appendChild(elem)
}

submitBtn.onclick = () => {
  let gradecount = parseInt(gradecountInput.value)
  for (let i = 1; i < gradecount+1; i++) {
    const grade = `<input required class="organized-gradefield" placeholder="Grade ${i}">`
    gradefield.innerHTML += grade
  } submitBtn.remove(), gradecountInput.remove()
  createElement({
    type: 'button',
    txt: 'Calculate',
    id: 'calculator'
  })
  const calculateBtn = document.getElementById('calculator')
  calculateBtn.onclick = () => {
    const grades = document.querySelectorAll('input')
    let total = 0
    grades.forEach(grade => {
      total += parseInt(grade.value)
    })
    const result = Math.floor(total / gradecount)
    createElement({
      type: 'h1',
      txt: `Your score average is ${result}`,
      id: 'score-result'
    })
    const s = document.getElementById('score-result')
    s.classList.add('animate__animated', 'animate__bounceInDown')
    setTimeout(() => {
      document.body.removeChild(s)
    }, 8000)
  }
}