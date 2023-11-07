let picturesContainer = document.getElementById('pictures');
let reportContainer = document.getElementById('report');
let image1 = document.querySelector('.pic1 img');
let image2 = document.querySelector('.pic2 img');
let image3 = document.querySelector('.pic3 img');

let numClicks = 0;
let numClicksAllowed = 25;

let state = {
  numClicks: 0,
  numClicksAllowed: 25,
  allPictures: [],

};

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

  while(picture1 === picture2) {
    picture2 = randomPicture();
  }

  while(picture2 === picture3 || picture3 === picture1) {
    picture3 = randomPicture();
  }

  image1.src = state.allPictures[picture1].image;
  image1.alt = state.allPictures[picture1].name;

  image2.src = state.allPictures[picture2].image;
  image2.alt = state.allPictures[picture2].name;

  image3.src = state.allPictures[picture3].image;
  image3.alt = state.allPictures[picture3].name;

  state.allPictures[picture1].views++;
  state.allPictures[picture2].views++;
  state.allPictures[picture3].views++;

}

function handleClick(event) {
  let pictureName = event.target.alt;
  for (let i = 0; i < state.allPictures.length; i++) {
    if(pictureName === state.allPictures[i].name) {
      state.allPictures[i].votes++;
      break;
    }
  }
}

function picturesListener() {
  image1.addEventListener('click', handleClick);
  image2.addEventListener('click', handleClick);
  image3.addEventListener('click', handleClick);
}

let bag = new Pictures('bag', 'img/bag.jpg');
let banana = new Pictures('banana', 'img/banana.jpg');
let bathroom = new Pictures('bathroom', 'img/bathroom.jpg');
let boots = new Pictures('boots', 'img/boots.jpg');
let breakfast = new Pictures('breakfast', 'img/breakfast.jpg');
let bubblegum = new Pictures('bubblegum', 'img/bubblegum.jpg');
let chair = new Pictures('chair', 'img/chair.jpg');
let cthulhu = new Pictures('cthulhu', 'img/cthulhu.jpg');
let dogDuck = new Pictures('dog-duck', 'img/dog-duck.jpg');
let dragon = new Pictures('dragon', 'img/dragon.jpg');
let pen = new Pictures('pen', 'img/pen.jpg');
let petSweep = new Pictures('pet-sweep', 'img/pet-sweep.jpg');
let scissors = new Pictures('scissors', 'img/scissors.jpg');
let shark = new Pictures('shark', 'img/shark.jpg');
let sweep = new Pictures('sweep', 'img/sweep.png');
let tauntaun = new Pictures('tauntaun', 'img/tauntaun.jpg');
let unicorn = new Pictures('unicorn', 'img/unicorn.jpg');
let waterCan = new Pictures('water-can', 'img/water-can.jpg');
let wineGlass = new Pictures('wine-glass', 'img/wine-glass.jpg');

renderPictures();

picturesListener();
