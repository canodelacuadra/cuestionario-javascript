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
      question: "¿El elemento 'title' debe ubicarse dentro?",
      answers: {
        a: "head",
        b: "body",
        c: "Es indiferente"
      },
      correctAnswer: "a"
    },
    {
      question: "¿Dónde podemos usar el elemento 'style'?",
      answers: {
        a: "head",
        b: "body",
        c: "en ambos puede usarse"
      },
      correctAnswer: "a"
    },
    {
      question: "¿Qué etiqueta usarías para crear un hipervínculo?",
      answers: {
        a: "link",
        b: "a",
        c: "iframe",
        d: "Las tres anteriores son correctas"
      },
      correctAnswer: "b"
    },
    {
      question: "¿Cómo puede abrir el enlace en una nueva ventana?",
      answers: {
        a: "target= '_target'",
        b: "target= '_window'",
        c: "Ntarget= '_blank'",
        d: "target= '_new'"
      },
      correctAnswer: "c"
    },
    {
      question:
        "¿Cuál de estos elementos no debería ser hijo del elemento head ?",
      answers: {
        a: "title",
        b: "form",
        c: "meta",
        d: "link"
      },
      correctAnswer: "b"
    },
    {
      question: "¿Con cuál de estos elementos creamos una fila de tabla?",
      answers: {
        a: "trow",
        b: "tr",
        c: "td",
        d: "tl"
      },
      correctAnswer: "b"
    },
    {
      question: "¿ Con qué elemento podemos añadir una descripción opcional a  una tabla?",
      answers: {
        a: "caption",
        b: "description",
        c: "label",
        d: "figcaption"
      },
      correctAnswer: "a"
    },
    {
      question: "¿Cómo se escribe un comentario en html?",
      answers: {
        a: " // Ésto es un comentario ",
        b: " /* Ésto es un comentario */",
        c: "<!--Ésto es un comentario -->",
        d: "# Ésto es un comentario"
      },
      correctAnswer: "c"
    },
    {
      question:
        "¿Qué elemento debemos utilizar si queremos crear una lista ordenada?",
      answers: {
        a: "ul",
        b: "ol",
        c: "dl",
        d: "label"
      },
      correctAnswer: "b"
    },
    {
      question: "¿H6 es el encabezado de nivel superior ?",
      answers: {
        a: "verdadero",
        b: "falso"
      },
      correctAnswer: "a"
    },
    {
      question: "¿Cuál de estos elementos NO es un elemento de bloque?",
      answers: {
        a: "p",
        b: "span",
        c: "blockquote",
        d: "li"
      },
      correctAnswer: "b"
    },
    {
      question: "¿Qué elemento html muestra una imagen?",
      answers: {
        a: "figure",
        b: "iframe",
        c: "img",
        d: "image"
      },
      correctAnswer: "c"
    },
    {
      question:
        "¿Qué tipo de input se utiliza en un formulario para seleccionar una de múltiples opciones?",
      answers: {
        a: "text",
        b: "checkbox",
        c: "radio",
        d: "textarea"
      },
      correctAnswer: "c"
    },
    {
      question: "¿Qué atributo del elemento img hace referencia a la localización de la imagen insertada?",
      answers: {
        a: "url",
        b: "location",
        c: "href",
        d: "src"
      },
      correctAnswer: "d"
    },
    {
      question: "¿ Cuál de estos elementos NO es vacío?",
      answers: {
        a: "hr",
        b: "br",
        c: "img",
        d: "strong"
      },
      correctAnswer: "b"
    },
    {
      question: "¿Cuál de estos elementos inserta una nueva línea?",
      answers: {
        a: "br",
        b: "break",
        c: "hr",
        d: "lb  "
      },
      correctAnswer: "a"
    },
    {
      question: "¿Cuál es el elemento para definir texto importante?",
      answers: {
        a: "b",
        b: "strong",
        c: "bold",
        d: "important"
      },
      correctAnswer: "a"
    },
    {
      question:
        "¿?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    },
    {
      question: "¿?",
      answers: {
        a: "Arrays",
        b: "Booelanos",
        c: "Números"
      },
      correctAnswer: "a"
    },
    {
      question: "¿?",
      answers: {
        a: "true",
        b: "false",
        c: "error"
      },
      correctAnswer: "b"
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
