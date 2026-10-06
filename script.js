/* ==============================
   DATA SOAL
================================ */

const questions = [
    {
        question: "Apa yang dimaksud dengan HTML?",
        answers: [
            "Bahasa pemrograman untuk database",
            "Bahasa markup untuk membuat struktur halaman web",
            "Sistem operasi untuk komputer",
            "Aplikasi untuk mengedit gambar"
        ],
        correct: 1
    },

    {
        question: "Apa fungsi utama CSS pada sebuah website?",
        answers: [
            "Mengatur tampilan dan gaya halaman web",
            "Menyimpan data pengguna",
            "Mengelola database",
            "Menjalankan sistem operasi"
        ],
        correct: 0
    },

    {
        question: "Bahasa yang digunakan untuk membuat halaman web menjadi interaktif adalah...",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correct: 2
    },

    {
        question: "Manakah yang digunakan untuk menyimpan data secara lokal pada browser?",
        answers: [
            "LocalStorage",
            "Photoshop",
            "Microsoft Word",
            "File Explorer"
        ],
        correct: 0
    },

    {
        question: "Apa fungsi event listener pada JavaScript?",
        answers: [
            "Mengatur ukuran gambar",
            "Menangani suatu kejadian atau aksi pengguna",
            "Membuat database",
            "Mengubah sistem operasi"
        ],
        correct: 1
    },

    {
        question: "Apa fungsi utama dari JavaScript dalam pengembangan web?",
        answers: [
            "Membuat halaman web menjadi interaktif",
            "Menggantikan sistem operasi",
            "Membuat kabel jaringan",
            "Mengatur hardware komputer secara langsung"
        ],
        correct: 0
    },

    {
        question: "Apa kegunaan document.createElement()?",
        answers: [
            "Menghapus browser",
            "Membuat elemen HTML baru menggunakan JavaScript",
            "Menyimpan data ke database",
            "Menghubungkan komputer ke internet"
        ],
        correct: 1
    },

    {
        question: "Apa fungsi dari addEventListener()?",
        answers: [
            "Menambahkan event atau aksi yang akan ditangani",
            "Membuat file CSS",
            "Menghapus elemen HTML",
            "Mengubah nama komputer"
        ],
        correct: 0
    },

    {
        question: "Apa keuntungan menggunakan textContent dibandingkan innerHTML untuk memasukkan teks?",
        answers: [
            "Dapat menjalankan kode JavaScript",
            "Lebih aman karena teks tidak diproses sebagai HTML",
            "Menghapus semua CSS",
            "Membuat database otomatis"
        ],
        correct: 1
    },

    {
        question: "Apa yang dimaksud dengan event delegation?",
        answers: [
            "Menambahkan listener ke setiap halaman",
            "Menangani event dari elemen anak melalui parent element",
            "Menghapus semua event",
            "Menyimpan event ke LocalStorage"
        ],
        correct: 1
    }
];


/* ==============================
   STATE
================================ */

let currentQuestion = 0;

let score = 0;

let answered = false;

let timer;

let timeLeft = 15;


/* ==============================
   ELEMENT
================================ */

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const feedbackElement =
    document.getElementById("feedback");

const questionNumberElement =
    document.getElementById("question-number");

const scoreDisplay =
    document.getElementById("score-display");

const progressBar =
    document.getElementById("progress-bar");

const progressText =
    document.getElementById("progress-text");

const nextButton =
    document.getElementById("next-button");

const quizCard =
    document.getElementById("quiz-card");

const resultSection =
    document.getElementById("result-section");

const finalScore =
    document.getElementById("final-score");

const percentageScore =
    document.getElementById("percentage-score");

const highScoreElement =
    document.getElementById("high-score");

const restartButton =
    document.getElementById("restart-button");

const timerElement =
    document.getElementById("timer");


/* ==============================
   SHOW QUESTION
================================ */

function showQuestion() {

    clearInterval(timer);

    answered = false;

    timeLeft = 15;

    timerElement.textContent = timeLeft;

    timerElement.parentElement.classList.remove(
        "timer-warning",
        "timer-danger"
    );

    feedbackElement.textContent = "";

    feedbackElement.className = "feedback";

    nextButton.disabled = true;

    const question =
        questions[currentQuestion];


    /* QUESTION NUMBER */

    const number =
        String(currentQuestion + 1).padStart(2, "0");

    questionNumberElement.textContent =
        `${number} / ${questions.length}`;


    /* QUESTION */

    questionElement.textContent =
        question.question;


    /* SCORE */

    scoreDisplay.textContent =
        score;


    /* PROGRESS */

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width =
        `${progress}%`;

    progressText.textContent =
        `${progress}%`;


    /* REMOVE OLD ANSWERS */

    answersElement.innerHTML = "";


    /* CREATE ANSWERS */

    question.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.classList.add(
            "answer-button"
        );

        button.textContent =
            answer;

        button.dataset.index =
            index;

        answersElement.appendChild(button);

    });


    startTimer();
}


/* ==============================
   TIMER
================================ */

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent =
            timeLeft;


        if (timeLeft <= 7) {

            timerElement.parentElement.classList.add(
                "timer-warning"
            );

        }


        if (timeLeft <= 3) {

            timerElement.parentElement.classList.remove(
                "timer-warning"
            );

            timerElement.parentElement.classList.add(
                "timer-danger"
            );

        }


        if (timeLeft <= 0) {

            clearInterval(timer);

            timeUp();

        }

    }, 1000);
}


/* ==============================
   TIME UP
================================ */

function timeUp() {

    if (answered) {
        return;
    }

    answered = true;

    feedbackElement.textContent =
        "⏰ Waktu habis!";

    feedbackElement.className =
        "feedback feedback-wrong";

    showCorrectAnswer();

    disableAnswers();

    nextButton.disabled = false;
}


/* ==============================
   EVENT DELEGATION
================================ */

answersElement.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.classList.contains(
                "answer-button"
            )
        ) {
            return;
        }


        if (answered) {
            return;
        }


        answered = true;

        clearInterval(timer);


        const selectedAnswer =
            Number(
                event.target.dataset.index
            );


        const correctAnswer =
            questions[currentQuestion].correct;


        disableAnswers();


        if (
            selectedAnswer ===
            correctAnswer
        ) {

            score++;

            event.target.classList.add(
                "correct"
            );

            feedbackElement.textContent =
                "✓ Jawaban kamu benar!";

            feedbackElement.className =
                "feedback feedback-correct";

        } else {

            event.target.classList.add(
                "wrong"
            );

            feedbackElement.textContent =
                "✗ Jawaban kamu salah.";

            feedbackElement.className =
                "feedback feedback-wrong";

            showCorrectAnswer();

        }


        scoreDisplay.textContent =
            score;

        nextButton.disabled = false;

    }
);


/* ==============================
   DISABLE ANSWERS
================================ */

function disableAnswers() {

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );

    buttons.forEach(button => {

        button.disabled = true;

    });
}


/* ==============================
   SHOW CORRECT ANSWER
================================ */

function showCorrectAnswer() {

    const correctAnswer =
        questions[currentQuestion].correct;

    const buttons =
        document.querySelectorAll(
            ".answer-button"
        );

    if (buttons[correctAnswer]) {

        buttons[correctAnswer]
            .classList.add("correct");

    }
}


/* ==============================
   NEXT QUESTION
================================ */

nextButton.addEventListener(
    "click",
    function () {

        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            showQuestion();

        } else {

            finishQuiz();

        }

    }
);


/* ==============================
   FINISH QUIZ
================================ */

function finishQuiz() {

    clearInterval(timer);

    const totalQuestions =
        questions.length;


    const percentage =
        Math.round(
            (score / totalQuestions) * 100
        );


    /* FINAL SCORE */

    finalScore.textContent =
        `Skor kamu: ${score} dari ${totalQuestions}`;


    percentageScore.textContent =
        `${percentage}%`;


    /* HIGH SCORE */

    const oldHighScore =
        Number(
            localStorage.getItem(
                "quizHighScore"
            )
        ) || 0;


    if (score > oldHighScore) {

        localStorage.setItem(
            "quizHighScore",
            score
        );

    }


    const highScore =
        Number(
            localStorage.getItem(
                "quizHighScore"
            )
        ) || 0;


    highScoreElement.textContent =
        `${highScore} dari ${totalQuestions}`;


    /* SHOW RESULT */

    quizCard.classList.add(
        "hidden"
    );

    resultSection.classList.remove(
        "hidden"
    );

}


/* ==============================
   RESTART
================================ */

restartButton.addEventListener(
    "click",
    function () {

        clearInterval(timer);

        currentQuestion = 0;

        score = 0;

        answered = false;


        resultSection.classList.add(
            "hidden"
        );

        quizCard.classList.remove(
            "hidden"
        );


        showQuestion();

    }
);


/* ==============================
   START QUIZ
================================ */

showQuestion();