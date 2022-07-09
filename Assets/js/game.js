var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');

var currentQuestion = {}
var acceptingAnswers = true
var score = 0
var questionCounter = 0
var availQuestions = []
var secondsLeft = score

var questions = [
   {
    question: 'What does HTML stand for',
    choice1: 'Hyperspace Terminal Mezzazine Link',
    choice2: 'Hypertext Markup Language',
    choice3: 'HammerTime Makes Loot',
    choice4: 'Hey the Mariners Lost',
    answer: 2,

   },
   {
    question: 'What does CSS stand for',
    choice1: 'Customized Style Sheet',
    choice2: 'Custard SuperStore',
    choice3: 'Cantelope Strawberry Shortcake',
    choice4: 'Corrugated Stainless Steel',
    answer: 1,

   },   {
    question: 'JavaScript is a/an _____________ language',
    choice1: 'procedural',
    choice2: 'object based',
    choice3: 'object oriented',
    choice4: 'foreign',
    answer: 3,

   },   {
    question: 'Which function is used to serialize an object into a JSON string in Javascript?',
    choice1: 'convert ()',
    choice2: 'parse ()',
    choice3: 'serialize ()',
    choice4: 'stringify ()',
    answer: 4,

   }
]

var SCORE_POINTS = 15
var MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 60
    availQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('Assets/html/end.html')
    }
    
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availQuestions.length)
    currentQuestion = availQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
      var number = choice.dataset['number']
      choice.innerText = currentQuestion['choice' + number]
    })

    availQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice =>  {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if(classToApply === 'incorrect') {
            decrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

decrementScore = num => {
    score -=num
    scoreText.innerText = score
}

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      score--;
      scoreText.textContent = score;
  
      if(score === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        localStorage.setItem('mostRecentScore', 0)
        // Calls function to create and append image
        return window.location.assign('Assets/html/end.html')
      }
  
    }, 1000);
  }

setTime()
startGame()

