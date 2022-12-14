const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which language runs in a web?',
    answers: [
      { text: 'Java', correct: false },
        { text: 'C', correct: false },
        { text: 'Python', correct: false },
        { text: 'JavaScript', correct: true },
    ]
  },
  {
    question: 'What does CSS stand for?',
    answers: [
      { text: 'Central Style Sheets', correct: false },
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'Cascading Simple Sheets', correct: false },
      { text: 'Cars SUVs Sailboats', correct: false }
    ]
  },
  {
    question: 'How we can alert hello world?',
    answers: [
      { text: `alertbox('hello world')`, correct: false },
      { text: `alert('hello world')`, correct: true },
      { text: `myalert('hello world')`, correct: false },
      { text: 'none of the above', correct: false }
    ]
  },
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Hypertext Markup Language', correct: true },
      { text: 'Hypertext Markdown Language', correct: false },
      { text: 'Hyperloop Machine Language', correct: false },
      { text: 'Hieroglyphics, To My Life', correct: false }
    ]
  }
]