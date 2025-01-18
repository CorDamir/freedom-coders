var quizzQuestionsArray = []; //array of all question data 
var selectedQuestions = []; //array of unanswered questions indexes
var correctAnswers = 0; //number of correct user answers

function testingSampleInit() {

    for (let i = 0; i < 10; i++) {
        let quizzQuestionData = {
            "question": "",
            "answers": [],
            "correct": null
        };

        quizzQuestionData.question = "Sample question " + i;
        quizzQuestionData.correct = Math.round(Math.random() * 3);

        for (let y = 0; y < 4; y++) {
            quizzQuestionData.answers.push("Sample answer " + i + "-" + y);
        }

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
    for (let q of quizzQuestionsArray[currentQuestion].answers) {
        answerElements[i++].innerText = q;
    }    
}

function endQuizz() {
    alert(`Correct answers: ${correctAnswers}`);
}

function handleSubmit() {
    document.getElementById("submit-button").disabled = true;
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
    if (!selectedQuestions.length) {endQuizz(); return} //on last question end quizz

    document.getElementById("next-button").disabled = true;
    document.getElementById("submit-button").removeAttribute("disabled");

    document.querySelector("input[type='radio']:checked").checked = null;

    displayQuestion(selectedQuestions[0]);
    document.getElementById("submit-button").removeAttribute("disabled");
    
    let answerDivs = document.getElementsByClassName("answer-option")

    for (let div of answerDivs){
        div.classList.remove("correct-answer");
        div.classList.remove("incorrect-answer");
    }
}

function initialSetup() {
    testingSampleInit();
    chooseRandomQuestions();
    displayQuestion(selectedQuestions[0]);
}

window.onload = initialSetup();