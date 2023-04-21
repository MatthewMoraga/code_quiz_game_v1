var title = document.querySelector("#title");
var startBtn = document.querySelector("#start-button");
var saveBtn = document.querySelector("#save-button")
var restartBtn = document.querySelector("#restart-button")
var questionWrap = document.querySelector("#question-wrap");
var question = document.querySelector("#question");
var choiceA = document.querySelector("#A");
var choiceB = document.querySelector("#B");
var choiceC = document.querySelector("#C");
var choiceD = document.querySelector("#D");
var counter = document.querySelector("#counter");
var timeBar = document.querySelector("#time-bar");
var timerDisplay = document.querySelector("#timer-display");
var scoreDisplay = document.querySelector("#score-display");
var resultsScreen = document.querySelector("#results-screen");
var highScoreScreen = document.querySelector("#high-score-screen");
var highScore = document.querySelector("#high-score");
var correctTrack = document.querySelector("#correct-track");
var scoreTrack = document.querySelector("#score-track");
var totalScoreDisplay = document.querySelector("#total-score-display");
var playAgain = document.querySelector("#play-again");
var questionsCorrect = 0;
var score = 11;
var scores = [];
var initialsList = [];
var initials;
var totalScore;
var count = 60;
var minusTime = 10;
var countEnd = 0;
var timerBarWidth = 200;
var timerBarProgress = timerBarWidth / count;
var timer;


var previousQuestion = questions.length - 1;
var currentQuestion = 0;

function displayQuestion() {
    var qi = questions[currentQuestion];

    question.innerHTML = qi.question;
    choiceA.innerHTML = qi.choiceA;
    choiceB.innerHTML = qi.choiceB;
    choiceC.innerHTML = qi.choiceC;
    choiceD.innerHTML = qi.choiceD;

    correctTrack.innerHTML = questionsCorrect + " out of 2 Questions";
}

startBtn.addEventListener("click", start)

function start() {
    title.classList.add("hide");
    startBtn.classList.add("hide");
    questionWrap.classList.remove("hide");
    timerDisplay.classList.remove("hide");
    correctTrack.classList.remove("hide");

    
    timer = setInterval(displayTimer, 1000);
    displayQuestion();
}

function displayTimer() {
    if(count >= countEnd) {
        counter.innerHTML = count;
        timeBar.style.width = timerBarProgress * count + "px";
        count--;
    } else {
        count = 60;
        timesUp();
        if(currentQuestion < previousQuestion) {
            currentQuestion++;
            displayQuestion();
            displayScore()
        } else {
            clearInterval(timer);
            displayScore();
        }
    }
}

function checkUserChoice(answer) {
    if (answer == questions[currentQuestion].correctIndex) {
        userChoiceCorrect();
    } else {
        userChoiceWrong();
       
    }
    
    if(currentQuestion < previousQuestion)  {
        currentQuestion++;
        displayQuestion();
    } else {
        clearInterval(timer);
        displayScore();

    }
}
function userChoiceCorrect() {
    questionsCorrect++;
    console.log("correct!");
}

function userChoiceWrong() {
    console.log("wrong!");
    count -= minusTime;
}

function timesUp() {
    console.log("times up!");
}

function displayScore() {
    localStorage.setItem("questionsCorrect", questionsCorrect);
    localStorage.setItem("score", score);
    correctTrack.innerHTML = "Questions Correct: " + localStorage.getItem("questionsCorrect");
    scoreTrack.innerHTML = "Score = " + localStorage.getItem("score") + " * Questions Correct";
    totalScore = questionsCorrect *= score;
    localStorage.setItem("totalScore", totalScore);
    totalScoreDisplay.innerHTML = "Total Score = " + localStorage.getItem("totalScore")
    questionWrap.classList.add("hide");
    timerDisplay.classList.add("hide");
    resultsScreen.classList.remove("hide");
    scoreTrack.classList.remove("hide");
    totalScoreDisplay.classList.remove("hide");
}


saveBtn = addEventListener("click", saveScore)

function saveScore() {
    var initials = document.querySelector("#enter-your-initials").value;

    if (initials === "") {
        localStorage.removeItem("initials");
    } else {
        localStorage.setItem("savedInitials", initials);
        localStorage.setItem("savedScore", totalScore);
        document.querySelector("#enter-your-initials").value = "";
        correctTrack.classList.add("hide")
        resultsScreen.classList.add("hide")
        highScoreScreen.classList.remove("hide")
        listScore()
    }
}

function listScore() {

    var savedScore = localStorage.getItem("savedScore");
    var savedInitials = localStorage.getItem("savedInitials");
    var ul = document.querySelector("#high-score");
    var li = document.createElement("li");
    scores.push(savedScore);
    initialsList.push(savedInitials);
    localStorage.setItem("scoreArray", scores);
    localStorage.setItem("initialsArray", initialsList);
    li.append(scores, initialsList);
    ul.append(li);
    console.log(scores, initialsList);
}


restartBtn.addEventListener("click", restart)

function restart() {
    location.reload()
}