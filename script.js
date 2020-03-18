// accedemos al checked input
const radio = document.getElementsByName("seleccion");
console.log(radio);
function checkear() {
  var checkedValue = null;

  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      checkedValue = radio[i].value;
      console.log(checkedValue);
      break;
    }
  }
  var url = checkedValue;

  console.log(url);
  construirTest(url);
}
// recorremos los nodos y les añadimos un oyente de eventos
for (var i = 0; i < radio.length; i++) {
  radio[i].addEventListener("change", checkear);
}

function construirTest(url) {
  // cargamos data por fetch
  // Replace ./data.json with your JSON feed
  const fichero = fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      // Work with JSON data here
      const myQuestions = data;
      // Empezamos el código a ejecuta
      // Funciones
      function buildQuiz() {
        // variable que almacena la salida de HTML
        const output = [];

        // Para cada pregunta...
        myQuestions.forEach((currentQuestion, questionNumber) => {
          // variable que almacena las posibles respuestas
          const answers = [];

          // y para cada respuesta disponible...
          for (letter in currentQuestion.answers) {
            // ...añadimos un   radio button HTML
            answers.push(
              `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
            );
          }

          //añadimos la pregunta y sus respuestas en la salida
          output.push(
            `<div class="slide">
            <div class="question"> ${questionNumber + 1}. ${
              currentQuestion.question
            } </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
          );
        });

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join("");
      }

      function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll(".answers");

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
          // find selected answer
          const answerContainer = answerContainers[questionNumber];
          const selector = `input[name=question${questionNumber}]:checked`;
          const userAnswer = (answerContainer.querySelector(selector) || {})
            .value;

          // Si la respuesta es acertada
          if (userAnswer === currentQuestion.correctAnswer) {
            // añade un punto por respuesta acertada
            numCorrect++;
            // color verde en las respuestas acertadas
            answerContainers[questionNumber].style.color = "rgb(4, 114, 22)";
            answerContainers[questionNumber].style.fontWeight = "bolder";
          }
          // Si la respuesta es equivocada o está en blanco
          else {
            // color the answers red
            answerContainers[questionNumber].style.color = "red";
            answerContainers[questionNumber].style.fontWeight = "bolder";
          }
        });

        // Evaluamos , show number of correct answers out of total

        resultsContainer.innerHTML = `${numCorrect} ${
          numCorrect === 1 ? "acierto" : "aciertos"
        }  de  ${myQuestions.length} preguntas`;
        // creammos un párrafo para mostrar un mensaje dependiendo del resultado global
        var noticia = document.createElement("p");
        noticia.className = "noticia";
        // le asociamos un contenido dependiendo del resultado
        if (numCorrect === myQuestions.length) {
          noticia.textContent = "Eres un máquina Total";
        } else if (numCorrect < myQuestions.length / 2) {
          noticia.textContent = "Pobre resultado, deberías estudiar más";
        } else {
          noticia.textContent = "Muy bien. Estás en el camino";
        }
        // añadimos el hijo al id de resultados
        resultsContainer.appendChild(noticia);
        // ocultamos botones y ponemos uno para volver a realizar quiz
        reiniciar.style.display = "inline-block";

        submitButton.style.display = "none";
      }

      function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;
        if (currentSlide === 0) {
          previousButton.style.display = "none";
        } else {
          previousButton.style.display = "inline-block";
        }
        if (currentSlide === slides.length - 1) {
          nextButton.style.display = "none";
          submitButton.style.display = "inline-block";
        } else {
          nextButton.style.display = "inline-block";
          submitButton.style.display = "none";
          reiniciar.style.display = "none";
        }
        //Mostrar barra de progreso
        barraProgreso.value = ((currentSlide + 1) * 100) / slides.length;
      }

      function showNextSlide() {
        showSlide(currentSlide + 1);
      }

      function showPreviousSlide() {
        showSlide(currentSlide - 1);
      }
      //Mostrar barra de progreso
      function mostrarProgreso() {}

      // Variables
      const quizContainer = document.getElementById("quiz");
      const resultsContainer = document.getElementById("results");
      const submitButton = document.getElementById("submit");
      const reiniciar = document.getElementById("reiniciar");

      ////
      // Kick things off
      buildQuiz();

      // Pagination
      const previousButton = document.getElementById("previous");
      const nextButton = document.getElementById("next");
      const slides = document.querySelectorAll(".slide");
      let currentSlide = 0;
      const barraProgreso = document.getElementById("barraProgreso");
      // Show the first slide
      showSlide(currentSlide);

      // Event listeners
      submitButton.addEventListener("click", showResults);
      previousButton.addEventListener("click", showPreviousSlide);
      nextButton.addEventListener("click", showNextSlide);
      reiniciar.addEventListener("click", function() {
        location.reload();
      });

      //terminamos fetch
    })
    .catch(err => {
      // Do something for an error here
    });
}
