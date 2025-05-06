const quiz = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
    answer: "Paris"
  },
  {
    question: "Select prime numbers:",
    options: ["2", "4", "5", "9"],
    answer: ["2", "5"], // for multiselect
    type: "multi"
  },
  {
    question: "Fill in the blank: The ___ is the center of our solar system.",
    answer: "sun",
    type: "fill"
  }
];

let current = 0;
let score = 0;

function displayQuestion() {
  const q = quiz[current];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  if (q.type === "multi") {
    q.options.forEach(opt => {
      optionsDiv.innerHTML += `<label><input type="checkbox" value="${opt}">${opt}</label><br>`;
    });
  } else if (q.type === "fill") {
    optionsDiv.innerHTML = `<input type="text" id="fillInput">`;
  } else {
    q.options.forEach(opt => {
      optionsDiv.innerHTML += `<label><input type="radio" name="option" value="${opt}">${opt}</label><br>`;
    });
  }
}

function nextQuestion() {
  const q = quiz[current];
  let userAnswer;

  if (q.type === "multi") {
    userAnswer = [...document.querySelectorAll('input[type=checkbox]:checked')].map(e => e.value);
    if (arraysEqual(userAnswer, q.answer)) score++;
  } else if (q.type === "fill") {
    userAnswer = document.getElementById("fillInput").value.trim().toLowerCase();
    if (userAnswer === q.answer.toLowerCase()) score++;
  } else {
    userAnswer = document.querySelector('input[name="option"]:checked')?.value;
    if (userAnswer === q.answer) score++;
  }

  current++;
  if (current < quiz.length) {
    displayQuestion();
  } else {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result").innerText = `You scored ${score} out of ${quiz.length}`;
  }
}

function arraysEqual(a, b) {
  return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
}

displayQuestion();
