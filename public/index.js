


(function () {
    "use strict";
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
var playerAces = 0;
var dealerHand = []; //global dealer hand
var dealerAces = 0;
var done = false;


window.onload = function(){
    document.getElementById("anon").onclick = playAnon;
    document.getElementById("createAccountButton").onclick = createAccount;
    document.getElementById("signinButton").onclick = signinAccount;
    fetchTable();
}

function playAnon(){
    //buildPLayScreen with Anon as name
    clearInputs();
    buildPlayScreen("Anonomous", 100);
    
}

function buildPlayScreen(name, amount){
    document.getElementById("playScreen").innerHTML = ""; //if they want to play again
    user = name;
    money = amount;
    //hide homeScreen
    clearInputs();
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

    //update currPot and money
    currPot += bet;
    money -= bet;

    //create new subPlayScreen
    subPlayScreen.appendChild(createCardSubScreen());

    //deal cards to player dealer player dealer, and display them
    dealPlayer(true);
    dealDealer(false, true);
    dealPlayer(true);
    dealDealer(true, true); //to hide dealers, probably send a boolean to say hidden
    checkPlayerBJ();
    checkPlayerBust();
    //update the score keeper
    document.getElementById("playerScore").innerHTML ="Your score: "  + sumHand(playerHand);
    //game begins
}
//deals one card to player hand
function dealPlayer(print){
    let playersCards = document.getElementById("playersCards");
    let drawnCard = deck.shift();
    if(drawnCard.worth === 11){
        playerAces++;
    }
    playerHand.push(drawnCard);

    if(print){
        playersCards.innerHTML += drawnCard.card + "<br>";
    }
}
//deals one card to dealer hand, also could hide one
function dealDealer(hidden, print){
    let dealersCards = document.getElementById("dealersCards");
    let drawnCard = deck.shift();
    if(drawnCard.worth === 11){
        dealerAces++;
    }
    dealerHand.push(drawnCard);
    if(hidden && print){
        dealersCards.innerHTML += "Other Card<br>";
    }
    else if (!hidden && print){
        dealersCards.innerHTML += drawnCard.card + "<br>";
    }
}
//when a player wants another card
function hit(){
    dealPlayer(true);
    checkPlayerBust();
    document.getElementById("playerScore").innerHTML ="Your score: "  + sumHand(playerHand);
    
}
//when the player is satisfied with current hand and is done
function check(){
    
    dealerTo17();
    if(done == false){
        let playerScore = sumHand(playerHand);
        let dealerScore = sumHand(dealerHand);
        console.log(playerScore);
        console.log(dealerScore);
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
    done = false;
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
        case "dealerBust":
            resultTitle.innerHTML = "Dealer busted, you won $" + parseFloat(currPot * 2);
            amount = parseFloat(currPot * 2);
        break;
        case "lose":
            resultTitle.innerHTML = "You lost to the dealer."
            amount = 0;
        break;
        case "bust":
            resultTitle.innerHTML = "You busted."
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
    document.getElementById("playScreen").innerHTML = "";

    updateDB(money);

    document.getElementById("homeScreen").style.display = "block";
    reset();
}

function updateDB(amount){

    var moneyJSON = {username: user, money: amount};
    const fetchOptions = {
		method : 'POST',
		headers : {
			'Accept': 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(moneyJSON)
	};

	var url = "http://ec2-52-53-181-134.us-west-1.compute.amazonaws.com:3000/update";
	fetch(url, fetchOptions)
		.then(checkStatus)
		.then(function(responseText) {
            console.log(responseText);
            
		})
		.catch(function(error) {
			console.log(error);
   		});

}

//make the playscreen go away and make the home screen come back
//also reset
function leaveButtonPressed(){
    document.getElementById("playScreen").innerHTML = "";
    document.getElementById("homeScreen").style.display = "block";
    reset();
}




//helpers
//clears inputs
function clearInputs(){
    document.getElementById("createUser").value = "";
    document.getElementById("createPW").value = "";
    document.getElementById("createScreen").value = "";
    document.getElementById("signUser").value = "";
    document.getElementById("signPW").value = "";
    
}

//helps create radio buttons
function createRadioBet(value){
    let tempDiv = document.createElement("div");
    let temp = document.createElement("input");
    let tempLabel = document.createElement("label");

    temp.type = "radio";
    temp.name = "betOptions";
    temp.value = value;
    temp.id = value;
    temp.onclick = updateBet;

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
function updateBet(){
    bet = parseInt(this.value);
}
function reset(amount){
    money += amount;
    currPot = 0;
    bet = 0; 
    playerHand = [];
    dealerHand = [];
    playerAces = 0;
    dealerAces = 0;
    done = false;
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
//creates subscreen for when they START the actual game
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

    let playerScore = document.createElement("div");
    playerScore.id = "playerScore";
    
    let dealersCards = document.createElement("div");
    dealersCards.id = "dealersCards";
    dealersCards.innerHTML = "Dealers Cards:<br>";
    rightScreen.appendChild(playersCards);
    rightScreen.appendChild(playerScore);
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

//ends game if the player busts or when player has BJ
function checkPlayerBust(){
    let handSum = sumHand(playerHand);
    if(handSum > 21){
        if(playerAces > 0){
            //find ace and change worth to 1
            changeAce(playerHand);
            playerAces--;
        }
        else{
            resultScreen("bust");
            
        }
    }
}
function changeAce(hand){
    for(let i = 0; i < hand.length; i++){
        if(hand[i].worth === 11){
            hand[i].worth = 1;
        }
    }
}
function checkPlayerBJ(){
    let handSum = sumHand(playerHand);
    if(handSum === 21){
        resultScreen("bj");
    }

}

//make the dealer draw until he has greater than or equal to 17
function dealerTo17(){
    while((sumHand(dealerHand) < 17) && (sumHand(dealerHand) <= sumHand(playerHand) && done == false)){
        dealDealer(false, false);
        //doesnt return after check dealer
        checkDealer();
    }
    
}
//helper for dealerTo17
function checkDealer(){
    if(sumHand(dealerHand) > 21) {
        if(dealerAces > 0){
            //find ace and change worth to 1
            changeAce(dealerHand);
            dealerAces--;
        }
        else{
            resultScreen("dealerBust");
            done = true;
        }
        
    }
}

//will fetch top 10 players on page startup
function fetchTable(){
    let table = document.getElementById("winners");

    let url = "http://ec2-52-53-181-134.us-west-1.compute.amazonaws.com:3000/winners";

    fetch(url)
    .then(checkStatus)
    .then(function(responseText){
        for(let i = 0; i < responseText.length; i++){
            let newRow = document.createElement("tr");
            let userD = document.createElement("td");
            let moneyD = document.createElement("td");
            userD.innerHTML = responseText[i][0].username;
            moneyD.innerHTML = responseText[i][0].money;
            newRow.appendChild(userD);
            newRow.appendChild(moneyD);
            table.appendChild(newRow);
        }
    })
    .catch(function(err){
        console.log(err);
    });
}


/* createAccount will take the info from the sign-in div and send it
to the server side program. 
*/

function createAccount(){
    var user = document.getElementById("createUser").value;
    var pw = document.getElementById("createPW").value;
    var screen = document.getElementById("createScreen").value;
    var userJSON = {"username":user,"password":pw, "screen_name":screen};
    const fetchOptions = {
		method : 'POST',
		headers : {
			'Accept': 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(userJSON)
	};

	var url = "http://ec2-52-53-181-134.us-west-1.compute.amazonaws.com:3000";
	fetch(url, fetchOptions)
		.then(checkStatus)
		.then(function(responseText) {
            let jsonResponse = JSON.parse(responseText);
            buildPlayScreen(jsonResponse.screen_name, jsonResponse.money);
		})
		.catch(function(error) {
			console.log(error);
   		});
}


/* signinAccount will request json objects in order to find the
user within the server. Right now, this is all a test.
*/
function signinAccount(){
    var usern = document.getElementById("signUser").value;
    var pw = document.getElementById("signPW").value;
    
    console.log("signin: "+usern);
    console.log("signin: "+pw);
    
    //will have to replace with current ec2 instance every initialization
    var url = "http://ec2-52-53-181-134.us-west-1.compute.amazonaws.com:3000/signin?user=" + usern + "&pass=" + pw;
	fetch(url)
		.then(checkStatus)
		.then(function(responseText) {
            let jsonResponse = JSON.parse(responseText);
            buildPlayScreen(jsonResponse[0].screen_name, jsonResponse[0].money);
        })
		.catch(function(error) {
			console.log(error);
		});
}

/*
checkStatus will return a special message depending on the error type that
is given.
*/
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response.text();
    }else if(response.status == 400){
        alert("Username already taken, try another!");
        clearInputs();
    } else if (response.status == 410) {
    	return Promise.reject(new Error("Sorry, the state you requested does not contain any information."));
    } else if (response.status == 404){
      return Promise.reject(new Error("HTTP 404 File Not Found error. Please check that you are accessing then correct server address."));
    } else {
        return Promise.reject(new Error(response.status+": "+
        response.statusText));
    }
}



})();

