var quizzQuestionsArray = []; //array of all question data 
var selectedQuestions = []; //array of selected questions indexes
var correctAnswers = 0; //number of correct user answers

/**
 * Loads raw data from quiz-data.js into quizzQuestionsArray
 * quizzQuestionsArray.question = quiz question
 * quizzQuestionsArray.correct = which of 4 answers is correct (1-4)
 * quizzQuestionsArray.answers[0-3] = 4 possible answers
 */
function initQuestionsData() {
    quizzQuestionsArray = [];

    for (let i = 0; i < questionsRawData.length; i++) {
        let quizzQuestionData = {
            "question": "",
            "answers": [],
            "correct": null
        };

        quizzQuestionData.question = questionsRawData[i];
        quizzQuestionData.correct = correctRawData[i];

        for (let y = 0; y < 4; y++)
            quizzQuestionData.answers.push(answersRawData[i * 4 + y]);

        quizzQuestionsArray.push(quizzQuestionData);
    }
}

/**
 * pushes 5 UNIQUE random numbers (0-9) 
 * into selectedQuestions[] array
 */
function chooseRandomQuestions() {
    for (let i = 0; i < 5; i++) {
        while (1) {
            let sel = Math.round(Math.random() * 9);
            if (!selectedQuestions.includes(sel)) {
                selectedQuestions.push(sel);
                break;
            }
        }
    }
}

/**
 * Puts quiz question and possible answers into appropriate html elements
 * @param {index of question to be displayed from
 * quizzQuestionsArray[]} currentQuestion 
 */
function displayQuestion(currentQuestion) {
    let questionElement = document.getElementById("question");
    let answerElements = document.getElementsByClassName("answer-text");

    questionElement.innerText = quizzQuestionsArray[currentQuestion].question;

    let i = 0;
    for (let q of quizzQuestionsArray[currentQuestion].answers)
        answerElements[i++].innerText = q;
}

/**
 * hides quiz modal, displays end modal,
 * adds percentage of correct answers to end-modal text,
 * resets dom elements to pre-quiz conditions
 */
function endQuizz() {
    let modal = document.getElementById("modal-quiz-end");
    document.getElementById("modal-quiz").classList.toggle("hidden");
    document.getElementById("1").checked = true;

    modal.firstElementChild.innerText = correctAnswers * 20;
    modal.classList.toggle("hidden");
}

/**
 * checks if user selected an answer, disables further input,
 * removes current question index from selectedQuestions[],
 * adds color-coding classes to appropriate html answer elements,
 * increments correctAnswers on correct user input,
 * enables next button 
 * */ 
function handleSubmit() {
    let selectedAnswerElement = document.querySelector("input[type='radio']:checked");
    let answer = null;

    try {
        answer = selectedAnswerElement.id;
    } catch {
        document.getElementById("error-message").innerText = "Please select an answer.";
        return;
    }

    document.getElementById("error-message").innerText = null;
    document.getElementById("submit-button").disabled = true;
    disableDivClick();

    for (let radio of document.getElementsByName("answers-radio")) radio.disabled = true;
    document.getElementById("next-button").removeAttribute("disabled");

    let currentQuestion = selectedQuestions.shift();
    let correct = quizzQuestionsArray[currentQuestion].correct;

    if (answer == correct) {
        correctAnswers += 1;
        selectedAnswerElement.parentElement.classList.add("correct-answer");
    }
    else {
        selectedAnswerElement.parentElement.classList.add("incorrect-answer");
        document.getElementById(correct).parentElement.classList.add("correct-answer");
    }
}

/**
 * enables input for next question,
 * removes color-coding classes from previous question,
 * checks for quiz end and calls appropriate handling function
 */
function handleNext(){
    document.getElementById("next-button").disabled = true;
    document.getElementById("submit-button").removeAttribute("disabled");

    for (let radio of document.getElementsByName("answers-radio")) 
        radio.disabled = false;
    
    let checkedOption = document.querySelector("input[type='radio']:checked");
    if (checkedOption) checkedOption.checked = null;

    enableDivClick();
    
    let answerDivs = document.getElementsByClassName("answer-option");

    for (let div of answerDivs){
        div.classList.remove("correct-answer");
        div.classList.remove("incorrect-answer");
    }

    selectedQuestions.length ? displayQuestion(selectedQuestions[0]) : endQuizz();
}

/**
 * sets that clicking anywhere on radio
 * button's parent div selects that button 
 * */
function handleDivClick() {
    this.firstElementChild.checked = true;
}

/**
 * adds click event listeners to divs
 * containing quiz answer options
 */
function enableDivClick() {
    for (let div of document.getElementsByClassName("answer-option")) 
        div.addEventListener("click", handleDivClick);
}

/**
 * disables click event listeners on divs
 * containing quiz answer options
 */
function disableDivClick() {
    for (let div of document.getElementsByClassName("answer-option")) 
        div.removeEventListener("click", handleDivClick);
}

/**
 * sets initial conditions for quiz,
 * displays modal containing quiz
 */
function startQuiz(){
    selectedQuestions = [];
    correctAnswers = 0;
    document.getElementById("error-message").innerText = null;

    chooseRandomQuestions();
    handleNext();

    document.getElementById("modal-container").classList.toggle("hidden");
    document.getElementById("modal-quiz").classList.toggle("hidden");
}

/**
 * removes modal visibility
 */
function closeModal(){
    this.parentElement.classList.toggle("hidden");
    document.getElementById("modal-container").classList.toggle("hidden");
}

/**
 * adds click event listener to modal
 * closing elements
 */
function enableCloseButton(){
    for (let closeBtn of document.getElementsByClassName("close-modal-button"))
        closeBtn.addEventListener("click", closeModal);
}

function initialSetup() {
    enableCloseButton();
    enableDivClick();
    initQuestionsData();
}

window.onload = initialSetup();