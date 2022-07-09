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
    question: 'what is 2 + 2?',
    choice1: '2',
    choice2: '4',
    choice3: '3.1415',
    choice4: '0',
    answer: 2,

   },
   {
    question: 'what is 2 + 2?',
    choice1: '2',
    choice2: '4',
    choice3: '3.1415',
    choice4: '0',
    answer: 2,

   },   {
    question: 'what is 2 + 2?',
    choice1: '2',
    choice2: '4',
    choice3: '3.1415',
    choice4: '0',
    answer: 2,

   },   {
    question: 'what is 2 + 2?',
    choice1: '2',
    choice2: '4',
    choice3: '3.1415',
    choice4: '0',
    answer: 2,

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

        return window.location.assign('end.html')
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
        return window.location.assign('end.html')
      }
  
    }, 1000);
  }

setTime()
startGame()

