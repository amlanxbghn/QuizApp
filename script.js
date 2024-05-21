const queries = [
    {
      query: 'Which HTML tag is used to define an inline style?',
      options: ["<script>", "<css>", "<style>", "<span>"],
      correctIdx: 2,
    },
    {
      query: "Which property is used to change the text color in CSS?",
      options: ["text-color", "font-color", "text-style", "color"],
      correctIdx: 3,
    },
    {
      query: "Which of the following is the correct way to comment in HTML?",
      options: ["// Comment", "<!-- Comment -->", "/* Comment */", "<! Comment>"],
      correctIdx: 1,
    },
  ];
  
  let currentQueryIndex = 0;
  let choiceMade = false;
  let totalScore = 0;
  let questionNumber = 0;
  let queryLength = queries.length;
  
  function randomQuery() {
    let randomIndex = Math.floor(Math.random() * queries.length);
    currentQueryIndex = randomIndex;
  }
  
  window.onload = function () {
    randomQuery();
    displayQuery();
    updateUI();
  };
  
  function displayQuery() {
    choiceMade = false;
    let query = queries[currentQueryIndex];
    let queryElement = document.getElementById("question");
    queryElement.innerText = query.query;
    for (let i = 0; i < query.options.length; i++) {
      let option = query.options[i];
      let optionElement = document.getElementById("c" + i);
      optionElement.innerText = option;
      optionElement.parentNode.style.backgroundColor = "";
    }
    questionNumber++;
    updateUI();
  }
  
  function updateUI() {
    document.getElementById(
      "question-number"
    ).innerText = `Question: ${questionNumber} / ${queryLength}`;
    document.getElementById("scoreCount").innerText = `${totalScore}`;
    let progress = (questionNumber / queryLength) * 100;
    document.getElementById("progressBarFull").style.width = `${progress}%`;
  }
  
  function removeQuery() {
    queries.splice(currentQueryIndex, 1);
  }
  
  for (let i = 0; i < 4; i++) {
    document
      .getElementById("c" + i)
      .parentNode.addEventListener("click", function () {
        if (!choiceMade) {
          choiceMade = true;
          let isCorrect = queries[currentQueryIndex].correctIdx === i;
          let element = document.getElementById("c" + i).parentNode;
          element.style.backgroundColor = isCorrect ? "green" : "red";
  
          if (isCorrect) {
            totalScore = totalScore + 10;
          } else {
            let correctOption = document.getElementById(
              "c" + queries[currentQueryIndex].correctIdx
            ).parentNode;
            correctOption.style.backgroundColor = "green";
          }
  
          setTimeout(() => {
            removeQuery();
            if (queries.length > 0) {
              randomQuery();
              displayQuery();
            } else {
              displayEnd();
            }
          }, 2000);
        }
      });
  }
  
  function displayEnd() {
    document.getElementById("question").style.display = "none";
    document.querySelector(".choices").style.display = "none";
    document.getElementById("hud").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
    document.getElementById("final-score").innerText = `Your score: ${totalScore}`;
  }
  
  document
    .getElementById("restart-button")
    .addEventListener("click", function () {
      location.reload();
    });
  
  document.getElementById("home-button").addEventListener("click", function () {
    window.location.href = "index.html";
  });