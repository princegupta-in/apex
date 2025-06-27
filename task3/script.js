// Constants
const QUESTIONS_PER_ROUND = 5;

// All questions pool (can add more)
const allQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Madrid", "Berlin", "Rome"],
    answer: "Paris",
    hint: "It's also called the City of Lights."
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
    hint: "It's named after the Roman god of war."
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "Leo Tolstoy", "William Shakespeare", "Mark Twain"],
    answer: "William Shakespeare",
    hint: "He is often called England's national poet."
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Silver"],
    answer: "Oxygen",
    hint: "It's essential for breathing."
  },
  {
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale",
    hint: "It lives in the ocean."
  },
  {
    question: "What year did World War II end?",
    options: ["1945", "1939", "1918", "1963"],
    answer: "1945",
    hint: "Mid-1940s."
  },
  {
    question: "What is the boiling point of water?",
    options: ["100°C", "50°C", "212°C", "0°C"],
    answer: "100°C",
    hint: "At sea level."
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    answer: "Mount Everest",
    hint: "It's located in the Himalayas."
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    answer: "Leonardo da Vinci",
    hint: "He was also an inventor."
  },
  {
    question: "What currency is used in Japan?",
    options: ["Yen", "Won", "Dollar", "Euro"],
    answer: "Yen",
    hint: "Symbol is ¥."
  },
];

// Variables
let rounds = {1: [], 2: []};
let currentRound = 1;
let currentQuestion = 0;
let score = 0;
let hintsLeft = 2;
let timer;
let timeLeft = 15;

// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const roundCompleteScreen = document.getElementById("round-complete-screen");
const finalScoreScreen = document.getElementById("final-score-screen");

const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");
const hintBtn = document.getElementById("hint-btn");

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const hintsEl = document.getElementById("hints");

const roundNumEl = document.getElementById("round-num");
const roundScoreEl = document.getElementById("round-score");
const startRound2Btn = document.getElementById("start-round2-btn");

const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

// Setup questions for rounds
function setupRounds() {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  rounds[1] = shuffled.slice(0, QUESTIONS_PER_ROUND);
  rounds[2] = shuffled.slice(QUESTIONS_PER_ROUND, QUESTIONS_PER_ROUND * 2);
}

// Load question
function loadQuestion() {
  resultEl.textContent = "";
  hintBtn.disabled = hintsLeft === 0;

  const q = rounds[currentRound][currentQuestion];
  questionEl.textContent = q.question;

  optionsEl.innerHTML = "";
  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, q.answer));
    optionsEl.appendChild(btn);
  });

  timerEl.textContent = timeLeft;
}

// Select answer logic
function selectAnswer(button, correctAnswer) {
  clearInterval(timer);
  const chosen = button.textContent;
  if (chosen === correctAnswer) {
    score += 10;
    scoreEl.textContent = score;
    resultEl.style.color = "green";
    resultEl.textContent = "Correct! 🎉";
  } else {
    resultEl.style.color = "red";
    resultEl.textContent = `Wrong! Correct answer: ${correctAnswer}`;
  }
  // Disable all options after answer
  [...optionsEl.children].forEach(btn => btn.disabled = true);
}

// Next question logic
function nextQuestion() {
  currentQuestion++;
  timeLeft = 15;

  if (currentQuestion >= QUESTIONS_PER_ROUND) {
    endRound();
  } else {
    loadQuestion();
    startTimer();
  }
}

// Timer start
function startTimer() {
  timeLeft = 15;
  timerEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      resultEl.style.color = "orange";
      resultEl.textContent = "Time's up! Moving to next question.";
      [...optionsEl.children].forEach(btn => btn.disabled = true);
    }
  }, 1000);
}

// End round logic
function endRound() {
  quizScreen.style.display = "none";

  if (currentRound === 1) {
    roundNumEl.textContent = currentRound;
    roundScoreEl.textContent = score;
    roundCompleteScreen.style.display = "block";
  } else {
    finalScoreEl.textContent = score;
    finalScoreScreen.style.display = "block";
  }
}

// Event listeners

startBtn.addEventListener("click", () => {
  setupRounds();
  currentRound = 1;
  currentQuestion = 0;
  score = 0;
  hintsLeft = 2;
  hintsEl.textContent = hintsLeft;
  scoreEl.textContent = score;
  startScreen.style.display = "none";
  roundCompleteScreen.style.display = "none";
  finalScoreScreen.style.display = "none";
  quizScreen.style.display = "block";
  loadQuestion();
  startTimer();
});

hintBtn.addEventListener("click", () => {
  if (hintsLeft > 0) {
    alert("Hint: " + rounds[currentRound][currentQuestion].hint);
    hintsLeft--;
    hintsEl.textContent = hintsLeft;
    hintBtn.disabled = hintsLeft === 0;
  } else {
    alert("No hints left!");
  }
});

nextBtn.addEventListener("click", () => {
  clearInterval(timer);
  nextQuestion();
});

startRound2Btn.addEventListener("click", () => {
  roundCompleteScreen.style.display = "none";
  currentRound = 2;
  currentQuestion = 0;
  hintsLeft = 2;
  hintsEl.textContent = hintsLeft;
  scoreEl.textContent = score;
  quizScreen.style.display = "block";
  loadQuestion();
  startTimer();
});

restartBtn.addEventListener("click", () => {
  finalScoreScreen.style.display = "none";
  startScreen.style.display = "flex";
});






