let picturesContainer = document.getElementById('pictures');
let reportContainer = document.getElementById('report');
let image1 = document.querySelector('.pic1 img');
let image2 = document.querySelector('.pic2 img');
let image3 = document.querySelector('.pic3 img');
let button = document.getElementById('showResults');

let numClicks = 0;
let numClicksAllowed = 25;

let state = {
  numClicks: 0,
  numClicksAllowed: 25,
  allPictures: [],
  selected: [],
};

let storedState = localStorage.getItem('state');
if (storedState) {
  state = JSON.parse(storedState);
}

function saveToLocalStorage() {
  localStorage.setItem('state', JSON.stringify(state));
}

function Pictures(name, image) {
  this.name = name;
  this.image = image;
  this.votes = 0;
  this.views = 0;
  state.allPictures.push(this);
}

function renderPictures(){
  function randomPicture(){
    return Math.floor(Math.random() * state.allPictures.length);
  }

  let picture1 = randomPicture();
  let picture2 = randomPicture();
  let picture3 = randomPicture();

  while(picture1 === picture2 || picture2 === picture3 || picture3 === picture1 || state.selected.includes(picture1) || state.selected.includes(picture2) || state.selected.includes(picture3)) {
    picture1 = randomPicture();
    picture2 = randomPicture();
    picture3 = randomPicture();
  }

  state.selected = [];

  state.selected.push(picture1, picture2, picture3);
  console.log(state.selected);

  image1.src = state.allPictures[picture1].image;
  image1.alt = state.allPictures[picture1].name;

  image2.src = state.allPictures[picture2].image;
  image2.alt = state.allPictures[picture2].name;

  image3.src = state.allPictures[picture3].image;
  image3.alt = state.allPictures[picture3].name;

  state.allPictures[picture1].views++;
  state.allPictures[picture2].views++;
  state.allPictures[picture3].views++;

  saveToLocalStorage();
}

function renderResultsButton(){
  button.style.display = 'block';
}

function renderResults() {
  let resultsContainer = document.getElementById('results');
  resultsContainer.style.display = 'block';
  let list = document.createElement('ul');
  state.allPictures.forEach(picture => {
    let li = document.createElement('li');
    li.textContent = `Name: ${picture.name} Views: ${picture.views} Votes: ${picture.votes}`;
    list.appendChild(li);
  });
  resultsContainer.appendChild(list);

  const ctx = document.getElementById('myChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: state.allPictures.map(picture => picture.name),
      datasets: [{
        label: 'Views',
        data: state.allPictures.map(picture => picture.views),
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 1
      }, {
        label: 'Votes',
        data: state.allPictures.map(picture => picture.votes),
        backgroundColor: 'blue',
        borderColor: 'black',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  saveToLocalStorage();
}

function handleClick(event) {
  console.log(state);
  let pictureName = event.target.alt;
  for (let i = 0; i < state.allPictures.length; i++) {
    if(pictureName === state.allPictures[i].name) {
      state.allPictures[i].votes++;
    }
  }
  state.numClicks++;

  if(state.numClicks >= state.numClicksAllowed) {
    removeListener();
    renderResultsButton();
  } else {
    renderPictures();
  }
  saveToLocalStorage();
}

function picturesListener() {
  image1.addEventListener('click', handleClick);
  image2.addEventListener('click', handleClick);
  image3.addEventListener('click', handleClick);
  button.addEventListener('click', renderResults);
}

function removeListener(){
  image1.removeEventListener('click', handleClick);
  image2.removeEventListener('click', handleClick);
  image3.removeEventListener('click', handleClick);
}

new Pictures('bag', 'img/bag.jpg');
new Pictures('banana', 'img/banana.jpg');
new Pictures('bathroom', 'img/bathroom.jpg');
new Pictures('boots', 'img/boots.jpg');
new Pictures('breakfast', 'img/breakfast.jpg');
new Pictures('bubblegum', 'img/bubblegum.jpg');
new Pictures('chair', 'img/chair.jpg');
new Pictures('cthulhu', 'img/cthulhu.jpg');
new Pictures('dog-duck', 'img/dog-duck.jpg');
new Pictures('dragon', 'img/dragon.jpg');
new Pictures('pen', 'img/pen.jpg');
new Pictures('pet-sweep', 'img/pet-sweep.jpg');
new Pictures('scissors', 'img/scissors.jpg');
new Pictures('shark', 'img/shark.jpg');
new Pictures('sweep', 'img/sweep.png');
new Pictures('tauntaun', 'img/tauntaun.jpg');
new Pictures('unicorn', 'img/unicorn.jpg');
new Pictures('water-can', 'img/water-can.jpg');
new Pictures('wine-glass', 'img/wine-glass.jpg');

renderPictures();
picturesListener();
