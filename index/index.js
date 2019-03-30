/*
How to play:
if you win, you get double your bet
if you lose, you lose all money
if you draw, you get money back
if you get BlackJack, you win 1.5x your bet plus your bet
*/
var user; //current player
var money; //their money from database
var currPot = 0; //how much they can win back
var bet = 0; //how much the player bets before hand
var deck = []; //global deck
var playerHand = []; //global player hand
var dealerHand = []; //global dealer hand

window.onload = function(){
    document.getElementById("anon").onclick = playAnon;
}

function playAnon(){
    //buildPLayScreen with Anon as name
    buildPlayScreen("Anonomous", 100);
}

function buildPlayScreen(name, amount){
    document.getElementById("playScreen").innerHTML = ""; //if they want to play again
    user = name;
    money = amount;
    //hide homeScreen
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("playScreen").style.display = "block";

    //create greeting header with name and add it to the playScreen
    let welcomeDiv = document.createElement("div");
    welcomeDiv.id = "welcomeDiv";
    let welcomeHeader = document.createElement("h1");
    welcomeHeader.id = "welcomeHeader";
    welcomeHeader.innerHTML = "Hello " + name + ", lets play BJ!";

    welcomeDiv.appendChild(welcomeHeader);
    document.getElementById("playScreen").appendChild(welcomeDiv);

    //add silhouette and style
    let dealerDiv = document.createElement("div");
    dealerDiv.id = "dealerDiv";
    let dealerImg = document.createElement("img");
    dealerImg.src = "https://lawyerbatonrouge.com/wp-content/uploads/2016/07/male-silhouette.jpg";
    dealerImg.id = "dealerImg";

    dealerDiv.appendChild(dealerImg);
    document.getElementById("playScreen").appendChild(dealerDiv);

    //THIS IS WHERE THE UI WILL CHANGE WITH SCREENS( WANT TO KEEP DEALER AND NAME THERE )
    
    let subPlayScreen = document.createElement("div");
    subPlayScreen.id = "subPlayScreen";

    //add amount of money user has
    let moneyDiv = document.createElement("div");
    moneyDiv.id = "moneyDiv";
    let infoH2 = document.createElement("h2");
    infoH2.id = "infoH2";
    infoH2.innerHTML = "You have $" + amount + " to bet with."
    moneyDiv.appendChild(infoH2);
    subPlayScreen.appendChild(moneyDiv);

    //add UI
    let UIDiv = document.createElement("div");
    UIDiv.id = "UIDiv";
    let playButton = document.createElement("button");
    playButton.innerHTML = "PLAY";
    playButton.id = "playButton";
    playButton.onclick = playButtonPressed;
    let leaveButton = document.createElement("button");
    leaveButton.innerHTML = "LEAVE";
    leaveButton.id = "leaveButton";
    leaveButton.onclick = leaveButtonPressed;

    UIDiv.appendChild(playButton);
    UIDiv.appendChild(leaveButton);
    subPlayScreen.appendChild(UIDiv);
    document.getElementById("playScreen").appendChild(subPlayScreen);
}

function playButtonPressed(){
    //clear sub screen and update welcome
    let subPlayScreen = document.getElementById("subPlayScreen");
    subPlayScreen.innerHTML = "";
    document.getElementById("welcomeHeader").innerHTML = "Enter a bet, " + user;

    //create play UI
    let infoH2 = document.createElement("h2");
    infoH2.id = "infoH2";
    infoH2.innerHTML = "What would you like to bet?";

    let betContainer = document.createElement("div");
    betContainer.id = "betContainer";
    let betScreenLeft = document.createElement("div");
    betScreenLeft.innerHTML = "Current Pot: $" + currPot + "<br>Your Money: $" + money + "<br><br>";
    let betButton = document.createElement("button");
    betButton.innerHTML = "BET";
    betButton.onclick = start; //where actual game starts
    let backOutButton = document.createElement("button");
    backOutButton.innerHTML = "BACK OUT";

    if(user === "Anonomous"){
        backOutButton.onclick = leaveButtonPressed;
    }
    else{
        backOutButton.onclick = backOut;
    }
    
    
    
    betScreenLeft.appendChild(betButton);
    betScreenLeft.appendChild(backOutButton);

    let betScreenRight = document.createElement("div");
    betScreenRight.id = "betScreenRight";
    let betOptions = document.createElement("div");
    betOptions.id = "betOptions";
    let one = createRadioBet("1");
    let five = createRadioBet("5");
    let ten = createRadioBet("10");
    let twenty = createRadioBet("20");
    let fifty = createRadioBet("50");
    let hundred = createRadioBet("100");
    betOptions.appendChild(one);
    betOptions.appendChild(five);
    betOptions.appendChild(ten);
    betOptions.appendChild(twenty);
    betOptions.appendChild(fifty);
    betOptions.appendChild(hundred);

    betScreenRight.appendChild(betOptions);
    betContainer.appendChild(betScreenLeft);
    betContainer.appendChild(betScreenRight);

    subPlayScreen.appendChild(infoH2);
    subPlayScreen.appendChild(betContainer);
}

//enters game and gameScreen appears with new UI
function start(){
    //update screen
    document.getElementById("welcomeHeader").innerHTML = "Hit or Check?"
    let subPlayScreen = document.getElementById("subPlayScreen");
    subPlayScreen.innerHTML = "";

    //create and shuffle deck
    deck = createAndShuffleDeck();

    //create new subPlayScreen
    subPlayScreen.appendChild(createCardSubScreen());

    //deal cards to player dealer player dealer, and display them
    dealPlayer();
    dealDealer(false);
    dealPlayer();
    dealDealer(true); //to hide dealers, probably send a boolean to say hidden
    //game begins
}
//deals one card to player hand
function dealPlayer(){
    let playersCards = document.getElementById("playersCards");
    let drawnCard = deck.shift();
    playerHand.push(drawnCard);
    playersCards.innerHTML += drawnCard.card + "<br>";
}
//deals one card to dealer hand, also could hide one
function dealDealer(hidden){
    let dealersCards = document.getElementById("dealersCards");
    let drawnCard = deck.shift();
    dealerHand.push(drawnCard);
    if(hidden){
        dealersCards.innerHTML += "Other Card<br>";
    }
    else{
        dealersCards.innerHTML += drawnCard.card + "<br>";
    }
}
//when a player wants another card
function hit(){
    dealPlayer();
    checkBustOrBJ();
}
//when the player is satisfied with current hand and is done
function check(){
    //dealer gets to go until 17 (implement later) <=================================
    let playerScore = sumHand(playerHand);
    let dealerScore = sumHand(dealerHand);
    if(playerScore > dealerScore){
        resultScreen("win");
    }
    else if(dealerScore > playerScore){
        resultScreen("lose");
    }
    else if (dealerScore == playerScore){
        resultScreen("tie");
    }
}
function resultScreen(result){
    //clear subScreen
    let subScreen = document.getElementById("subPlayScreen");
    subScreen.innerHTML = "";
    let resultTitle = document.createElement("h2");
    let cardsPlayed = createCardsPlayed();
    let amount = 0;
    switch(result){
        case "bj":
            resultTitle.innerHTML = "Congratulations on the Black Jack, you won $" + parseFloat(currPot * 2);
            amount = parseFloat(currPot * 2);
        break;
        case "win":
            resultTitle.innerHTML = "Congratulations, you won $" + parseFloat(currPot * 2);
            amount = parseFloat(currPot * 2);
        break;
        case "lose":
            resultTitle.innerHTML = "You lost to the dealer."
            amount = 0;
        break;
        case "tie":
            resultTitle.innerHTML = "You push!"
            amount = parseFloat(currPot);
        break;
    }
    reset(amount);
    subScreen.appendChild(resultTitle);
    subScreen.appendChild(cardsPlayed);
    subScreen.appendChild(createReplayButtons());
}
//called when a user is done playing, should update database with money
function backOut(){
    
}

function updateDB(amount){
    //{FIXME}
}

//make the playscreen go away and make the home screen come back
//also reset
function leaveButtonPressed(){
    document.getElementById("playScreen").innerHTML = "";
    document.getElementById("homeScreen").style.display = "block";
    resetStats();
}




//helpers
//helps create radio buttons
function createRadioBet(value){
    let tempDiv = document.createElement("div");
    let temp = document.createElement("input");
    let tempLabel = document.createElement("label");

    temp.type = "radio";
    temp.name = "betOptions";
    temp.value = value;
    temp.id = value;
    temp.onclick = updateBetAndPot;

    tempLabel.htmlFor = value;
    tempLabel.innerHTML = "$" + value ;

    tempDiv.appendChild(temp);
    tempDiv.appendChild(tempLabel);

    return tempDiv;
}
//
function createCardsPlayed(){
    let cardsPlayed = document.createElement("div");
    cardsPlayed.id = "cardsPlayed";
    let playerDiv = document.createElement("div");
    let dealerDiv = document.createElement("div");

    playerDiv.innerHTML = "Your Cards: <br>";
    for(let i = 0; i < playerHand.length;i++){
        playerDiv.innerHTML += playerHand[i].card + "<br>";
    }
    dealerDiv.innerHTML = "Dealers Cards: <br>";
    for(let i = 0; i < dealerHand.length;i++){
        dealerDiv.innerHTML += dealerHand[i].card + "<br>";
    }
    cardsPlayed.appendChild(dealerDiv);
    cardsPlayed.appendChild(playerDiv);
    return cardsPlayed;
}
//updates bet and currPot when a radio button is pressed
function updateBetAndPot(){
    bet = parseInt(this.value);
    currPot += bet;
    money -= bet;
}
function reset(){
    currPot = 0;
    bet = 0;
    playerHand = [];
    dealerHand = [];
    createAndShuffleDeck();
}
//want in the form "Ace of Spades, 11" or name, value
function createAndShuffleDeck(){
    let deck = [];
    let suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
    let value = 0;
    let cardName = ""

    //create deck
    for(let i = 0; i < suits.length; i++){
        for(let j = 1; j <= 13; j++){
            switch(j){ //to assign names and values to specific cards
                case 1:
                value = 11;
                cardName = "Ace";
                break;
                case 11:
                value = 10;
                cardName = "Jack";
                break;
                case 12:
                value = 10;
                cardName = "Queen";
                break;
                case 13:
                value = 10;
                cardName = "King";
                break;
                default:
                value = j;
                cardName = j.toString();
                break;
            }
            cardName = cardName + " of " + suits[i];
            deck.push({card: cardName,worth: value});
        }
    }

    //shuffle deck
    for(let i = 0; i < 1000; i++){
        let rNum1 = Math.floor(Math.random() * 52);
        let rNum2 = Math.floor(Math.random() * 52);
        let tempCard = deck[rNum1];
        deck[rNum1] = deck[rNum2];
        deck[rNum2] = tempCard;
    }
    return deck;
}
//creates subscreen for when they are playing the actual game
function createCardSubScreen(){
    let cardSubScreen = document.createElement("div");
    cardSubScreen.id = "cardSubScreen";
    //left side
    let leftScreen = document.createElement("div");
    leftScreen.innerHTML = "Current Pot: $" + currPot + "<br>Your Money: $" + money + "<br><br>";
    let hitButton = document.createElement("button");
    hitButton.innerHTML = "HIT";
    hitButton.onclick = hit;
    let checkButton = document.createElement("button");
    checkButton.innerHTML = "CHECK";
    checkButton.onclick = check;
    leftScreen.appendChild(hitButton);
    leftScreen.appendChild(checkButton);

    //right side: for cards
    let rightScreen = document.createElement("div");
    rightScreen.id = "cardDisplay";
    let playersCards = document.createElement("div");
    playersCards.id = "playersCards";
    playersCards.innerHTML = "Your Cards:<br>";
    let dealersCards = document.createElement("div");
    dealersCards.id = "dealersCards";
    dealersCards.innerHTML = "Dealers Cards:<br>";
    rightScreen.appendChild(playersCards);
    rightScreen.appendChild(dealersCards);

    cardSubScreen.appendChild(leftScreen);
    cardSubScreen.appendChild(rightScreen);
    return cardSubScreen;
}
//sums up worth of hand
function sumHand(hand){
    let handSum = 0;
    for(let i = 0; i < hand.length; i++){
        handSum += hand[i].worth;
    }
    return handSum;
}
//creates replay buttons for result screen
function createReplayButtons(){
    let buttonDiv = document.createElement("div");
    let playAgain = document.createElement("button");
    playAgain.innerHTML = "Play Again?";
    playAgain.onclick = replay;
    let leaveButton = document.createElement("button");
    leaveButton.innerHTML = "Leave";
    if(user === "Anonomous"){
        leaveButton.onclick = leaveButtonPressed;
    }
    else {
        leaveButton.onclick = backOut;
    }
    buttonDiv.appendChild(playAgain);
    buttonDiv.appendChild(leaveButton);
    return buttonDiv;
}
//relaunches the play screen
function replay(){
    document.getElementById("subPlayScreen").innerHTML = "";
    playButtonPressed();
}
//function to update the monies for replay
function resetMoney(amount){
    currPot = 0;
    bet = 0;
    money += amount;
}
//ends game if the player busts or when player has BJ
function checkBustOrBJ(){
    let handSum = sumHand(playerHand);
    if(handSum > 21){
        resultScreen("lose");
    }
    else if(handSum === 21){
        resultScreen("bj");
    }
}