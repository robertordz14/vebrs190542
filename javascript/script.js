// Se obtienen los elementos principales
const showVerb = document.getElementById("showVerb");
const showImage = document.getElementById("showImage");
const showAudio = document.getElementById("showAudio");

const next = document.getElementById("next");
const verbsCounter = document.getElementById("verbs-counter");
const allRightCounter = document.getElementById("all-right-answers");
const allWrongCounter = document.getElementById("all-wrong-answers");
const verbsContainer = document.getElementById("verbs-container");

// Se obtienen los elementos de las respuestas
const first = document.getElementById("first-verb");
const second = document.getElementById("second-verb");
const third = document.getElementById("third-verb");
const fourth = document.getElementById("fourth-verb");

// Se obtiene la cantidad de verbos
const numberOfVerbs = verbs.length;

// Se asigna la respuesta correcta en el array
let answerOptions  = [0, 1, 1, 1];
let positionsOfVerbs = [];
let rightAnswersCounter = 0;
let wrongAnswersCounter = 0;
let rightAnswers;

// Escucha la funcion click del boton svg de play
next.addEventListener("click", function () {
  ponerVerbo();
  next.style.display = "none";
  // console.log('hola');
});

makeRandomList();
let lastPosition = positionsOfVerbs.length - 1;

function makeRandomList() {
  // Se ejecuta el for con el numero total de verbos del array
  for (var i = 0; i < numberOfVerbs; i++) {
    positionsOfVerbs.push(i);
  }
  // Los verbos de acomodan de forma aleatoria
  positionsOfVerbs = positionsOfVerbs.sort(() => Math.random() - 0.5);
}


// Esta funcion revisa las opciones correctas o incorrectas
function buttonEffect(itsRight,button){
  if (itsRight){
    button.classList.add('rightAnswer');
    setTimeout(function(){
      button.classList.remove('rightAnswer');
    },1000);
    rightAnswersCounter = rightAnswersCounter+1;
  }else{
    button.classList.add('wrongAnswer');
    setTimeout(function(){
      button.classList.remove('wrongAnswer');
    },1000);
    wrongAnswersCounter = wrongAnswersCounter+1;

  }
  setTimeout(function(){
    ponerVerbo();
  },500);
}


// Escucha la funcion click de los cuatro botenes
first.addEventListener("click",function(){
  buttonEffect(isItRight_(first.innerHTML),this);
});
second.addEventListener("click", function(){
  buttonEffect(isItRight_(second.innerHTML),this);
});
third.addEventListener("click", function(){
  buttonEffect(isItRight_(third.innerHTML),this);
});
fourth.addEventListener("click", function(){
  buttonEffect(isItRight_(fourth.innerHTML),this);
});

// Muestra las diferentes opciones de respuestas segun los verbos
function randomAnswers(array) {
  let numberOfAnswerButtons = array.length;
  let randomIndex;
  while (numberOfAnswerButtons != 0) {
    randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
    numberOfAnswerButtons--;
    [array[numberOfAnswerButtons], array[randomIndex]] = [
      array[randomIndex], array[numberOfAnswerButtons]];
    }
  return array;
}

// Revisa si la respuesta es correcta con un ternario
function isItRight_(answer){
  return answer==rightAnswer?true:false;
}

// Esta funcion es para la respuesta incorrecta
function randomVerbo(notThisOne){
  theOne = Math.floor(Math.random()*verbos.length);
  return theOne == notThisOne?randomVerbo(notThisOne):theOne;
}

function ponerVerbo() {
  answerOptions  = randomAnswers(answerOptions );
  let randomPosition = positionsOfVerbs[lastPosition];
  let imgText = "<img src='images/"+verbs[randomPosition]+".jpg' height:'140px' width='100px'>";
  first.classList.add("btn","btn-warning","btn-md");
  second.classList.add("btn","btn-warning","btn-md");
  third.classList.add("btn","btn-warning","btn-md");
  fourth.classList.add("btn","btn-warning","btn-md");


  if (lastPosition >= 0){
    var just_position = lastPosition+1;
    verbsCounter.innerHTML = ""+just_position+" / "+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    allWrongCounter.innerHTML = "Wrong answers: "+wrongAnswersCounter;
    showVerb.innerHTML = verbs[randomPosition];
    showImage.innerHTML = imgText;

    showAudio.src = "audio/"+verbs[randomPosition]+".mp3";
    showAudio.play();

    first.innerHTML = !answerOptions[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    second.innerHTML = !answerOptions[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    third.innerHTML = !answerOptions[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    fourth.innerHTML = !answerOptions[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];

    rightAnswer = verbos[randomPosition];
    lastPosition =lastPosition - 1;
  }else{
    verbsCounter.innerHTML = "0 / "+numberOfVerbs;
    allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
    allWrongCounter.innerHTML = "Wrong answers: "+wrongAnswersCounter;
    showVerb.innerHTML = "You're done!";
    verbsContainer.innerHTML = "";
  }
}
