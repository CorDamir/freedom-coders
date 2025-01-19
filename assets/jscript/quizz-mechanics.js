var quizzQuestionsArray = []; //array of all question data 
var selectedQuestions = []; //array of unanswered questions indexes
var correctAnswers = 0; //number of correct user answers

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

function displayQuestion(currentQuestion) {
    let questionElement = document.getElementById("question");
    let answerElements = document.getElementsByClassName("answer-text");

    questionElement.innerText = quizzQuestionsArray[currentQuestion].question;

    let i = 0;
    for (let q of quizzQuestionsArray[currentQuestion].answers)
        answerElements[i++].innerText = q;
}

function endQuizz() {
    let modal = document.getElementById("modal-quiz-end");
    document.getElementById("modal-quiz").classList.toggle("hidden");

    modal.firstElementChild.innerText = correctAnswers * 20;
    modal.classList.toggle("hidden");
}

function handleSubmit() {
    document.getElementById("submit-button").disabled = true;
    disableDivClick();

    for (let radio of document.getElementsByName("answers-radio")) radio.disabled = true;
    document.getElementById("next-button").removeAttribute("disabled");

    let selectedAnswerElement = document.querySelector("input[type='radio']:checked");
    let answer;

    try {
        answer = selectedAnswerElement.id
    } catch {
        alert("Please select an answer");
    }

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

function handleNext(){
    document.getElementById("next-button").disabled = true;
    document.getElementById("submit-button").removeAttribute("disabled");

    for (let radio of document.getElementsByName("answers-radio")) 
        radio.disabled = false;
    
    document.querySelector("input[type='radio']:checked").checked = null;
    enableDivClick();
    
    let answerDivs = document.getElementsByClassName("answer-option")

    for (let div of answerDivs){
        div.classList.remove("correct-answer");
        div.classList.remove("incorrect-answer");
    }

    selectedQuestions.length ? displayQuestion(selectedQuestions[0]) : endQuizz();
}

function handleDivClick() {
    this.firstElementChild.checked = true;
}

function enableDivClick() {
    for (let div of document.getElementsByClassName("answer-option")) 
        div.addEventListener("click", handleDivClick);
}

function disableDivClick() {
    for (let div of document.getElementsByClassName("answer-option")) 
        div.removeEventListener("click", handleDivClick);
}

function startQuiz(){
    selectedQuestions = [];
    correctAnswers = 0;

    chooseRandomQuestions();
    handleNext();

    document.getElementById("modal-container").classList.toggle("hidden");
    document.getElementById("modal-quiz").classList.toggle("hidden");
}

function closeModal(){
    this.parentElement.classList.toggle("hidden");
    document.getElementById("modal-container").classList.toggle("hidden");
}

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