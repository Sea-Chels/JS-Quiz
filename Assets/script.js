
var startButton = document.getElementById("start-btn");
var questionElement = document.getElementById("question");
var resultsContainer = document.getElementById('results');
var answerButtonsElement = document.getElementById('answer-buttons');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById("question-container");
var nextButton = document.getElementById("next-btn");
var resultsButton = document.getElementById("results-btn");
let shuffledQuestions, currentQuestionIndex;


var timeContainer = document.getElementById('timer-container');
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");


var secondsLeft = 150;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds to finish the quiz";

    if(secondsLeft === 0) {
      nextButton.classList.add('hide');
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide')
      showResults();
    }
  }, 1100);
}

//I eventually gave up trying to make my own questions and decided to take questions from quizlet...some of them at least
var questions = [
{question: " What is the correct way to declare a variable?", answer: [{text:"Variable example('string goes here')"}, {text:"Var example = 'string goes here'"},{text:"var example('string goes here')"}, {text:"var example = 'string goes here' ", correct: true} ] }, 
{question: "Can you declare a function without running the function?", answer: [{text: "yes", correct: true}, {text:"no"}, {text:"maybe"}, {text:"all of the above"}]}, 
{question: "Which is the correct way to link our javascript to our HTML document?", answer: [{text: "<javascript>", correct: false}, {text: "<js>", correct: false}, {text: "<script>", correct: true}, {text: "<scripting>", correct: false}]}, 
{question: "What is the correct JavaScript syntax to write 'hello world'?", answer: [{text:"document.text('hello world')", correct: true}, {text:"'hello world"}, {text:"('hello world')", correct: false}, {text:"response.write('hello world')", correct: false}]}
, {question: "What is the correct syntax for referring to an external script called 'xxx.js'", answer: [{text:'<script src="xxx.js"></script>', correct: true}, {text: '<script name="xxx.js"', correct: false}, {text:'<script href="xxx.js">', correct: false},{text:"<link href='./script.js'> ", correct: false}]}, {question: "What is the answer to life?", answer: [{text:'Happiness', correct: false}, {text: 'console.log(answerTo.life)', correct: true}, {text:'Chocolate', correct: false}, {text:"42", correct: false}]},
{question: "How long did it take Chelby to actually complete this assignment?", answer: [{text:'89 years', correct: false}, {text: 'she never did it', correct: false}, {text:'5 minutes', correct: false}, {text:"Way too long", correct: true}]}
]

// Event listeners
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();})
resultsButton.addEventListener('click', showResults);

function startGame(){
    setTime();
//the variables below reset any results/times
    i = 0;
    x = 0;
    secondsLeft = 150;
    resultsContainer.innerHTML = '';
    timeContainer.classList.add('show'); 
    console.log("The quiz has begun, good luck!");
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    //these lines shuffle the quiz questions
    shuffledQuestions = questions.sort(()=> Math.random() - .5);
    currentQuestionIndex = 0
    resultsButton.classList.add('hide');
    setNextQuestion(); 
}

function setNextQuestion(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    showQuestion(shuffledQuestions[currentQuestionIndex]);
} 
function showQuestion(question){
     questionElement.innerText = question.question;
     question.answer.forEach(function(answer){
         var button = document.createElement('button')
         button.innerText = answer.text
         button.classList.add('btn')
         if(answer.correct){
             button.dataset.correct = answer.correct
         }
         button.addEventListener("click", selectAnswer)
         answerButtonsElement.appendChild(button)
         });
}
function selectAnswer(e){
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        })
    if(correct){
        i++;
        console.log(`You've gotten ${i} right so far`);
    }
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide');

    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide')
        resultsButton.classList.remove('hide');
    }
}

var i = 0; 
var r = 0;

//below is the functionality for checking if the button is correct or not, and helps gather results by adding to the variables i or x. 
function setStatusClass(element, correct){
clearStatusClass(element);
}
function clearStatusClass(element){
}

function showResults(){
    r++;
    timeContainer.classList.remove('show');
    resultsButton.classList.add('hide');
    questionElement.innerHTML = '';
    answerButtonsElement.innerHTML = '';
    //the method .tofixed below allows the percentage to only have two numbers after the decimal point 
    let total = (i/7)*100;
    resultsContainer.innerHTML= '<h4>'+'Quiz Results:'+'</h4>'+'<p>'+
    `Correct: ${i} out of 7`+'</p>' + '<p>'+`Final Score: ${total.toFixed(2)}%`+'</p>';
    localStorage.setItem("Number of Attempts", r);
    localStorage.setItem("Last Score", total.toFixed(2));
 }

// Start button
// once clicked hide start button and display first question
// input next question button
// have a function to check the target against the correct question
// when next button is clicked it does the check, then adds an alert (pop up maybe?)
// that tells the user if they got the question right or wrong
// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

//I referenced this video to help with a majority of the quiz: https://www.youtube.com/watch?v=riDzcEQbX6k, but I referenced the UW bootcamp for timing intervals to get the countdown, as well as local storage. Then I built the results on my own, ye