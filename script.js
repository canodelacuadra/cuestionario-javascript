(function() {
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

      //añadimos la preugnta y sus respuestas en la salida
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
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

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
      // mostramos retralimentación
      const retro = document.createElement("p");
      retro.textContent = currentQuestion.retroAlimentacion[userAnswer];
      retro.className = "retro";
      answerContainers[questionNumber].appendChild(retro);
    });

    // show number of correct answers out of total

    resultsContainer.innerHTML = `${numCorrect} ${
      numCorrect === 1 ? "acierto" : "aciertos"
    }  de  ${myQuestions.length} preguntas <br/>
    Puedes revisar las respuestas: en verde, aciertos y en rojo, fallos <br/>
    Puedes cambiar las respuestas y volver a evaluar`;
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
  const myQuestions = [
    {
      question: "¿Quién inventó JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c",
      retroAlimentacion: {
        a:
          "Douglas Crockford es un programador estadounidense que participa en el desarrollo del lenguaje JavaScript. Él popularizó el formato de datos JSON, y ha desarrollado varias herramientas  como JSLint y JSMin",
        b:
          "Sheryl Kara Sandberg es una economista, autora y directora ejecutiva estadounidense, actual directora operativa de Facebook ",
        c:
          "Brendan Eich es un programador estadounidense conocido por inventar el lenguaje de programación JavaScript. "
      }
    },
    {
      question:
        "¿Cuál de los siguientes nombres es un administrador de paquetes en Javascript?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c",
      retroAlimentacion: {
        a:
          "Node.js es un entorno de código abierto , multiplataforma  que ejecuta código JavaScript fuera de un navegador",
        b:
          "TypeScript es un lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft. Es un superconjunto de JavaScript",
        c:
          "npm es el sistema de gestión de paquetes por defecto para Node.js, un entorno de ejecución para JavaScript,"
      }
    },
    {
      question:
        "¿Cuál de estas herramientas nos puede ayudar a asegurar la calidad del código?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d",
      retroAlimentacion: {
        a: "Es una librería para hacer dinámicas web",
        b: "Ayuda con el Dom",
        c:
          "es una librería JavaScript que nos permite aislar mediante módulos los componentes de nuestra aplicación cliente",
        d:
          "es una herramienta de análisis de código estático para identificar patrones problemáticos encontrados en el código JavaScript"
      }
    },
    {
      question: "¿Cual no es un valor primitivo en Javascript?",
      answers: {
        a: "Arrays",
        b: "Booelanos",
        c: "Números"
      },
      correctAnswer: "a",
      retroAlimentacion: {
        a: "es un conjunto de datos",
        b: "Es uno de los datos primitivos",
        c: "Los números sirven para operar"
      }
    },
    {
      question: "¿Como se evalúa 'true && false' ?",
      answers: {
        a: "true",
        b: "false",
        c: "error"
      },
      correctAnswer: "b",
      retroAlimentacion: {
        a: "false && false sí que es true",
        b: "true y falso es falso",
        c: "No hay error cuado se "
      }
    }
  ];
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
})();
