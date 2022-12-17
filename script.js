// Reference
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-container");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


// Questions and options arrays
const quizArray = [
    {
      id: "0",
      question: "The Letter 'D' in BODMAS means what?",
      options: ["Divisible", "Division", "Divide", "Disengage"],
      correct: "Division",
    },
    {
      id: "1",
      question: "What is the highest common factor of the numbers 30 and 132?",
      options: ["6", "12", "4", "10"],
      correct: "6",
    },
    {
      id: "2",
      question: "What is the result of 123 + 4 - 5 + 67 - 89 = ?",
      options: ["-34", "124", "-24", "100"],
      correct: "100",
    },
    {
      id: "3",
      question: "If 1 = 3, 2 = 3, 3 = 5, 4 = 4, and 5 = 4, what is 6 = ?",
      options: ["1", "2", "3", "4"],
      correct: "3",
    },
    {
      id: "4",
      question: "Which number is the equivalent to 3^(4)/3^(2)?",
      options: ["2", "9", "12", "15"],
      correct: "9",
    },
    {
      id: "5",
      question: "Using only the process of addition, how to add eight 8’s to get the final number of 1000?",
      options: ["888 + 88 + 8 + 8 + 8 = 1000", "88 + 88 + 88 + 8 + 8 = 1000", "8 + 88 + 8 + 88 + 88 = 1000", "88 + 8 + 88 + 8 + 8 + 8 = 1000"],
      correct: "888 + 88 + 8 + 8 + 8 = 1000",
    },
    {
      id: "6",
      question: "What is the year 1982 in Roman Numerals?",
      options: ["MMMLXXXII", "MCMXLXXII", "MMCLXXXII", "MCMLXXXII"],
      correct: "MCMLXXXII",
    },
    {
        id: "7",
        question: "What is next in the following number series: 256, 289, 324, 361 . . . ?",
        options: ["380", "390", "400", "410"],
        correct: "400",
    },
    {
        id: "8",
        question: "At a Christmas party, everyone shook hands with everyone else. There were a total of 66 handshakes that happened during the party. How many people were present?",
        options: ["6", "12", "18", "24"],
        correct: "12",
    },
    {
        id: "9",
        question: "What is the value of Pi(π) to four individual decimal places?",
        options: ["3.1516", "3.0416", "3.1406", "3.1416"],
        correct: "3.1416",
    },
    {
      id: "10",
      question: "What does 6 raise to the power of 0 equal?",
      options: ["0", "1", "6", "10"],
      correct: "1",
    },
    {
        id: "11",
        question: "What is the circumference of a circle with radius 5?",
        options: ["10π", "11π", "20π", "21π"],
        correct: "10π",
    },
    {
        id: "12",
        question: "What is the quotient of 24 and 6?",
        options: ["1", "2", "3", "4"],
        correct: "4",
    },
    {
        id: "13",
        question: "What is the square root of 64?",
        options: ["6", "8", "6 x 4", "24"],
        correct: "8",
    },
    {
        id: "14",
        question: "Subtract: -6xy from -10xy",
        options: ["4xy", "-4xy", "16xy", "-16xy"],
        correct: "-16xy",
    },
  ];


// Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

// Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
      count--;
      timeLeft.innerHTML = `${count}s`;
      if (count == 0) {
        clearInterval(countdown);
        displayNext();
      }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
      card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
      //randomly sort options
      i.options.sort(() => Math.random() - 0.5);
      //quiz card creation
      let div = document.createElement("div");
      div.classList.add("container-mid", "hide");
      //question number
      countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
      //question
      let question_DIV = document.createElement("p");
      question_DIV.classList.add("question");
      question_DIV.innerHTML = i.question;
      div.appendChild(question_DIV);
      //options
      div.innerHTML += `
      <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
         <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
      `;
      quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
      document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
  
    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
      userOption.classList.add("correct");
      scoreCount++;
    } else {
      userOption.classList.add("incorrect");
      //For marking the correct option
      options.forEach((element) => {
        if (element.innerText == quizArray[questionCount].correct) {
          element.classList.add("correct");
        }
      });
    }
  
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
      element.disabled = true;
    });
}
  
//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
  
//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};