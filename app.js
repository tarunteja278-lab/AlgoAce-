// ========================================
// QUIZ APP
// ========================================

// Current user
let currentUser = "";

// Quiz variables
let selectedSubject = "";
let selectedLevel = "";

let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let selectedAnswer = null;


// ========================================
// QUESTION DATABASE
// ========================================

// IMPORTANT:
// Add 30 questions to EACH level.
// Currently there are sample questions.
// You can replace/add questions later.

const quizData = {

    "C Language": {

        "Easy": [

            {
                question: "Which symbol is used to end a statement in C?",
                options: [";", ":", ".", ","],
                answer: 0
            },

            {
                question: "Which function is used to print output in C?",
                options: ["scanf()", "print()", "printf()", "display()"],
                answer: 2
            },

            {
                question: "Which header file is required for printf()?",
                options: ["conio.h", "stdio.h", "math.h", "string.h"],
                answer: 1
            },

            {
                question: "Which data type is used for integers?",
                options: ["float", "char", "int", "double"],
                answer: 2
            },

            {
                question: "Which symbol is used for a single-line comment?",
                options: ["//", "##", "<!--", "**"],
                answer: 0
            }

            // ADD QUESTIONS 6 - 30 HERE

        ],

        "Medium": [

            {
                question: "Which operator is used to get the address of a variable?",
                options: ["*", "&", "#", "@"],
                answer: 1
            },

            {
                question: "Which keyword is used to define a constant?",
                options: ["constant", "const", "define", "fixed"],
                answer: 1
            }

            // ADD QUESTIONS UP TO 30
        ],

        "Hard": [

            {
                question: "What is a pointer in C?",
                options: [
                    "A variable storing an address",
                    "A loop",
                    "A function",
                    "A data type only"
                ],
                answer: 0
            },

            {
                question: "Which function is used to dynamically allocate memory?",
                options: ["malloc()", "printf()", "scanf()", "sizeof()"],
                answer: 0
            }

            // ADD QUESTIONS UP TO 30
        ]
    },


    // ====================================
    // ADVANCED DATA STRUCTURE
    // ====================================

    "Advanced Data Structure": {

        "Easy": [

            {
                question: "Which data structure follows FIFO?",
                options: ["Stack", "Queue", "Tree", "Graph"],
                answer: 1
            },

            {
                question: "Which data structure follows LIFO?",
                options: ["Queue", "Stack", "Graph", "Tree"],
                answer: 1
            }

            // ADD QUESTIONS UP TO 30
        ],

        "Medium": [

            {
                question: "Which traversal uses a queue?",
                options: ["DFS", "BFS", "Inorder", "Postorder"],
                answer: 1
            }

            // ADD QUESTIONS UP TO 30
        ],

        "Hard": [

            {
                question: "What is the balance factor of an AVL tree node?",
                options: [
                    "Height of left subtree - height of right subtree",
                    "Number of children",
                    "Number of nodes",
                    "Depth of node"
                ],
                answer: 0
            }

            // ADD QUESTIONS UP TO 30
        ]
    },


    // ====================================
    // JAVA
    // ====================================

    "Java": {

        "Easy": [

            {
                question: "Which keyword is used to create a class in Java?",
                options: ["class", "Class", "create", "new"],
                answer: 0
            },

            {
                question: "Which method is the starting point of a Java program?",
                options: ["start()", "main()", "run()", "begin()"],
                answer: 1
            }

            // ADD QUESTIONS UP TO 30
        ],

        "Medium": [

            {
                question: "Which concept allows one class to acquire properties of another?",
                options: [
                    "Encapsulation",
                    "Inheritance",
                    "Abstraction",
                    "Polymorphism"
                ],
                answer: 1
            }

            // ADD QUESTIONS UP TO 30
        ],

        "Hard": [

            {
                question: "Which keyword prevents a class from being inherited?",
                options: ["static", "final", "private", "protected"],
                answer: 1
            }

            // ADD QUESTIONS UP TO 30
        ]
    },


    // ====================================
    // PYTHON
    // ====================================

    "Python": {

        "Easy": [

            {
                question: "Which symbol is used for comments in Python?",
                options: ["//", "#", "/*", "--"],
                answer: 1
            },

            {
                question: "Which function is used to display output?",
                options: ["display()", "echo()", "print()", "show()"],
                answer: 2
            }

            // ADD QUESTIONS UP TO 30
        ],

        "Medium": [

            {
                question: "Which data structure stores key-value pairs?",
                options: ["List", "Tuple", "Dictionary", "Set"],
                answer: 2
            }

            // ADD QUESTIONS UP TO 30
        ],

        "Hard": [

            {
                question: "Which keyword is used to create a generator?",
                options: ["return", "yield", "generate", "gen"],
                answer: 1
            }

            // ADD QUESTIONS UP TO 30
        ]
    }
};


// ========================================
// PAGE MANAGEMENT
// ========================================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.add("hidden");
    });

    document.getElementById(pageId).classList.remove("hidden");
}


// ========================================
// LOGIN
// ========================================

function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    if (email === "" || password === "") {

        message.textContent = "Please enter email and password.";
        message.style.color = "red";

        return;
    }

    if (!email.includes("@")) {

        message.textContent = "Please enter a valid email.";
        message.style.color = "red";

        return;
    }

    currentUser = email;

    localStorage.setItem("quizUser", email);

    showPage("subjectPage");
}


// ========================================
// LOGOUT
// ========================================

function logout() {

    localStorage.removeItem("quizUser");

    currentUser = "";

    showPage("loginPage");
}


// ========================================
// SUBJECT SELECTION
// ========================================

function selectSubject(subject) {

    selectedSubject = subject;

    document.getElementById("selectedSubject").textContent =
        subject + " - Select Level";

    showPage("levelPage");
}


// ========================================
// START QUIZ
// ========================================

function startQuiz(level) {

    selectedLevel = level;

    currentQuestion = 0;
    score = 0;
    correctCount = 0;
    wrongCount = 0;
    selectedAnswer = null;

    const questions =
        quizData[selectedSubject][selectedLevel];

    if (!questions || questions.length === 0) {

        alert("Questions are not available for this level yet.");

        return;
    }

    showPage("quizPage");

    displayQuestion();
}


// ========================================
// DISPLAY QUESTION
// ========================================

function displayQuestion() {

    const questions =
        quizData[selectedSubject][selectedLevel];

    const q = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        "Question " + (currentQuestion + 1) +
        " / 30";

    document.getElementById("score").textContent = score;

    document.getElementById("question").textContent =
        q.question;

    const progress =
        ((currentQuestion + 1) / 30) * 100;

    document.getElementById("progressBar").style.width =
        progress + "%";

    const optionsDiv =
        document.getElementById("options");

    optionsDiv.innerHTML = "";

    selectedAnswer = null;

    document.getElementById("nextButton").disabled = true;

    q.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "option";

        button.textContent =
            String.fromCharCode(65 + index) +
            ". " +
            option;

        button.onclick = function() {

            selectAnswer(index);
        };

        optionsDiv.appendChild(button);
    });
}


// ========================================
// SELECT ANSWER
// ========================================

function selectAnswer(index) {

    if (selectedAnswer !== null) {
        return;
    }

    selectedAnswer = index;

    const questions =
        quizData[selectedSubject][selectedLevel];

    const q = questions[currentQuestion];

    const optionButtons =
        document.querySelectorAll(".option");

    optionButtons.forEach(button => {

        button.disabled = true;
    });


    if (index === q.answer) {

        score += 4;

        correctCount++;

        optionButtons[index].classList.add("correct");

    } else {

        score -= 1;

        wrongCount++;

        optionButtons[index].classList.add("wrong");

        optionButtons[q.answer].classList.add("correct");
    }


    document.getElementById("score").textContent =
        score;

    document.getElementById("nextButton").disabled =
        false;
}


// ========================================
// NEXT QUESTION
// ========================================

function nextQuestion() {

    const questions =
        quizData[selectedSubject][selectedLevel];

    currentQuestion++;

    if (currentQuestion >= questions.length) {

        showResult();

        return;
    }

    displayQuestion();
}


// ========================================
// RESULT
// ========================================

function showResult() {

    document.getElementById("resultSubject").textContent =
        selectedSubject;

    document.getElementById("resultLevel").textContent =
        selectedLevel + " Level";

    document.getElementById("finalScore").textContent =
        score;

    document.getElementById("correctAnswers").textContent =
        correctCount;

    document.getElementById("wrongAnswers").textContent =
        wrongCount;

    showPage("resultPage");
}


// ========================================
// CHECK LOGIN WHEN APP OPENS
// ========================================

window.onload = function() {

    const savedUser =
        localStorage.getItem("quizUser");

    if (savedUser) {

        currentUser = savedUser;

        showPage("subjectPage");

    } else {

        showPage("loginPage");
    }
};
