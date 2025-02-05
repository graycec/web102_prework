/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
// const button = document.getElementById("all-btn");
// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    gamesContainer.innerHTML = '';
    for (let i = 0; i < games.length; i++) {
      const game = games[i];
        const gameElement = document.createElement('div');
      gameElement.classList.add('game-card');
      gameElement.innerHTML = ` <img class="game-img" src=${game.img}> <p><strong>${game.name}</strong></p> <p>${game.description}</p> <p>Goal: ${game.goal}</p>`;
      gameElement.classList.add('game-card');
      gamesContainer.appendChild(gameElement);
    }
}

// button.addEventListener("click", addGamesToPage(GAMES_JSON));

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
  }, 0);
let num = totalBackers;
const number = (num.toLocaleString('en-US'));
const backerElement = document.createElement('div');
backerElement.innerHTML = `<p>${number}</p>`;
contributionsCard.appendChild(backerElement);

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
  }, 0);
let dollar = totalRaised;
const dollars = (dollar.toLocaleString('en-US'));
const raisedElement = document.createElement('div');
raisedElement.innerHTML = `<p> $ ${dollars}</p>`;
raisedCard.appendChild(raisedElement);
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.length
const totalElement = document.createElement('div');
totalElement.innerHTML = `<p>${totalGames}</p>`;
gamesCard.appendChild(totalElement);
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let listOfUnfundedGames = GAMES_JSON.filter ( (game) => {
         return game.goal > game.pledged;
      });
      console.log(listOfUnfundedGames);
    // use filter() to get a list of games that have not yet met their goal
    addGamesToPage(listOfUnfundedGames);
    // use the function we previously created to add the unfunded games to the DOM
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfFundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged > game.goal;
     });
     console.log(listOfFundedGames);
   // use filter() to get a list of games that have not yet met their goal
   addGamesToPage(listOfFundedGames);

    // use the function we previously created to add unfunded games to the DOM

}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

let unfundedGames = GAMES_JSON.filter ( (game) => {
    return game.goal > game.pledged;
 });
const totalUnfunded = unfundedGames.length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `Experience the thrill of supporting innovative game projects and shaping the future of gaming on our dynamic crowdfunding platform. There are currently ${totalUnfunded} games that still need funding!`;

// create a new DOM element containing the template string and append it to the description container
const unfundedDescElement = document.createElement('div');
descriptionContainer.innerHTML = `<p>${displayStr}</p>`;

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [item1, item2, ...others] = sortedGames;
// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement('div');
firstGameElement.innerHTML = `<p>${item1.name}</p>`;
firstGameContainer.appendChild(firstGameElement);
// do the same for the runner up item
const secondGameElement = document.createElement('div');
secondGameElement.innerHTML = `<p>${item2.name}</p>`;
secondGameContainer.appendChild(secondGameElement);
