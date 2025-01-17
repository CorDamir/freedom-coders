var quizzQuestionsArray = [];
var selectedQuestions = [];

function testingSampleInit(){
    
    for(let i=0; i<10; i++){
        let quizzQuestionData = {
            "question": "",
            "answers": [],
            "correct": null
        };

        quizzQuestionData.question = "Sample question " + i;
        quizzQuestionData.correct = Math.round(Math.random()*3);
        
        for(let y=0; y<4; y++){
            quizzQuestionData.answers.push("Sample answer " + i + "-" + y);
        }
    
        quizzQuestionsArray.push(quizzQuestionData);
    }
}

function chooseRandomQuestions(){
    for (let i=0; i<5; i++){
        while(1){
            let sel = Math.round(Math.random()*9);
            if(!selectedQuestions.includes(sel)) {
                selectedQuestions.push(sel);
                break;
            }
        }
    }
}

function displayQuestion(currentQuestion){
        let questionElement = document.getElementById("question");
        let answerElements = document.getElementsByClassName("answer-text");
        
        questionElement.innerText = quizzQuestionsArray[currentQuestion].question;
        
        let i=0;
        for (let q of quizzQuestionsArray[currentQuestion].answers){ 
            answerElements[i++].innerText = q;
        }

}

function endQuizz(){

}

function handleSubmit(){
    let selectedAnswer = document.querySelector("input[type='radio']:checked");
    

    selectedQuestions.shift();
    
    if (!selectedQuestions.length) endQuizz();
    else displayQuestion(selectedQuestions[0]);
}

function initialSetup() {
    testingSampleInit();
    chooseRandomQuestions();
    displayQuestion(selectedQuestions[0]);
}

window.onload = initialSetup();