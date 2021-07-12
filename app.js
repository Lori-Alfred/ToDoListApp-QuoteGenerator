//selection of elements
const todaysDate = document.querySelector("#dateheader");
const currentTime = document.querySelector("#timedisplay");
const addButton = document.querySelector("#add");
const listeditems = document.querySelector("#listeditems");
const inputValue = document.querySelector("#textinput");
const ulList = document.querySelector("#todaysList");
let quoteText=document.querySelector('.quote');
let quoteAuthor=document.querySelector('.author');


let newElement;
let newElement2;
let newElement3;
let quoteArr =[];

// Date

const d = new Date();
const dString = d.toDateString() + " .";
todaysDate.innerHTML = dString;

//time

function activeTime() {
  const d = new Date();
  const tString = d.toLocaleTimeString();
  currentTime.innerHTML = tString;
}
const activeTString = setInterval(activeTime, 1000);



//Adding input value to list


function toAddItem() {
  
  if(inputValue.value !== "") {
  newElement = document.createElement("li");
  newElement.textContent = `${inputValue.value}`;
  newElement2=document.createElement("span");
  newElement3=document.createElement("i");
  newElement3.className="fas fa-trash-alt deletebutton";
  newElement2.appendChild(newElement3);
  newElement.appendChild(newElement2);
  ulList.appendChild(newElement);
  
  inputValue.value = "";
}

 else {
  alert(" please enter a value")
}
  
//putting input value into array
const arrList = [];
arrList.push(newElement);



 

 


// delete function of list item
function deleteFunction () { 
 for (let elem of arrList ) {
   return elem.remove()
 }
   
  }

  newElement3.addEventListener('click', deleteFunction);

}
//end of toaddfunction



//Add item  using keyboard enter code function

function enterCode(e) {
  if (e.keyCode === 13) {
    return toAddItem();
  }
}
function displayQuotes () {
const quotesDetails = quoteArr[Math.floor(Math.random()* quoteArr.length)];

// conditional statement for text
if(quotesDetails.text) {
quoteText.textContent =quotesDetails.text;
}
else {
  quoteText.textContent ="Hey nothing is impossible for you";
}

// conditional statement for author
if(quotesDetails.author) {
quoteAuthor.textContent =quotesDetails.author;
}
else {
  quoteAuthor.textContent ="Hey nothing is impossible for you";
}
if(quotesDetails.text.length > 20) {
  quoteText.style.fontSize = 'small';
}
}

// API fetching of quotes
async function quotes () {
const apiUrl='https://type.fit/api/quotes';
try {
 const responseP = await fetch (apiUrl);
 quoteArr= await responseP.json();
displayQuotes();

}
catch (error) {
alert(error);
}
}


quotes();
//event listeners
addButton.addEventListener("click", toAddItem);

inputValue.addEventListener("keyup", enterCode);
