var startButton = document.getElementById("startButton");
var initialScreen = document.getElementById("initialScreen");
var quizScreen = document.getElementById("quizScreen");
var infoTitle = document.querySelector(".info-title");
var quizInfo = document.querySelector(".quiz-info");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  initialScreen.style.display = "none";
  quizScreen.style.display = "block";
  infoTitle.classList.add("hidden");
  quizInfo.classList.add("hidden");
}

var score = 0;

var questions = [
  {
    question: "Commonly used data types DO NOT include...",
    choices: ["String", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    question:
      "The condition in an if/else statement is enclosed with ___________.",
    choices: ["Quotes", "Curly brakets", "Parentheses", "Square brackets"],
    answer: "Parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store...",
    choices: [
      "Numbers and strings",
      "Other Arrays",
      "Booleans",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question:
      "String values must be enclosed within ____, when being assigned to varibles.",
    choices: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
    answer: "Quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is...",
    choices: ["Javascript", "Teminal/Bash", "For loops", "Console.log"],
    answer: "Console.log",
  },
];

var timerElement = document.getElementById("timer");
var startButton = document.getElementById("startButton");
var questionContainer = document.getElementById("question-container");
var startTime;
var timeLimit = 30;
var timerInterval;
var questionIndex = 0;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.disabled = true; // Disable the start button after it's clicked
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 1000);
  displayQuestion();
}

function displayQuestion() {
  questionContainer.innerHTML = "";

  if (questionIndex >= questions.length) {
    endQuiz();
    return;
  }

  var currentQuestion = questions[questionIndex];

  var questionText = document.createElement("div");
  questionText.textContent = currentQuestion.question;
  questionContainer.appendChild(questionText);

  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = document.createElement("button");
    choice.textContent = currentQuestion.choices[i];
    questionContainer.appendChild(choice);
    choice.addEventListener("click", checkAnswer);
  }
}

function checkAnswer(event) {
  clearInterval(timerInterval);

  var selectedChoice = event.target.textContent;
  var currentQuestion = questions[questionIndex];

  if (selectedChoice === currentQuestion.answer) {
    // The answer is correct
    // Add your logic here (e.g., increment score)
    score += 1;
  } else {
    // The answer is wrong
    startTime += 10000; // Penalize time by adding 10 seconds
  }

  questionIndex++;
  setTimeout(function () {
    displayQuestion();
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
  }, 1000);
}

function updateTimer() {
  var currentTime = new Date().getTime();
  var timeDifference = currentTime - startTime;
  var remainingTime = timeLimit * 1000 - timeDifference;

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    timerElement.textContent = "Time Expired";
    endQuiz();
    return;
  }

  var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  var formattedTime =
    ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

  timerElement.textContent = formattedTime;
}

function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.innerHTML = "";
  var finalScore = score;

  var scoreText = document.createElement("div");
  scoreText.textContent =
    "You finished the quiz! Your final score is: " + finalScore;
  questionContainer.appendChild(scoreText);
}
