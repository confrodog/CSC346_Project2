var user;
var money;
var currPot = 0;
var bet = 0;
var deck = [];
var playerHand = [];
var dealerHand = [];

window.onload = function(){
    document.getElementById("anon").onclick = playAnon;
}

function playAnon(){
    //buildPLayScreen with Anon as name
    buildPlayScreen("Anonomous", 100);
}

function buildPlayScreen(name, amount){
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

    //create new UI
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

    //We dont save stats for anon
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
    dealDealer();
    dealPlayer();
    dealDealer(); //to hide dealers, probably send a boolean to say hidden
    //game begins
}
function hit(){

}
function check(){

}
function dealPlayer(){
    let playersCards = document.getElementById("playersCards");
    let drawnCard = deck.shift();
    playerHand.push(drawnCard);
    playersCards.innerHTML += drawnCard.card;
}
function dealDealer(){
    let dealersCards = document.getElementById("dealersCards");
    let drawnCard = deck.shift();
    dealerHand.push(drawnCard);
    dealersCards.innerHTML += drawnCard.card;
}

//leave the current game and update the database with new money value (if not Anon)
function backOut(){
    // {FXIME}
}

//make the playscreen go away and make the home screen come back
//also reset
function leaveButtonPressed(){
    document.getElementById("playScreen").innerHTML = "";
    document.getElementById("homeScreen").style.display = "block";
    resetStats();
}




//helpers
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
function updateBetAndPot(){
    bet = parseInt(this.value);
    currPot += bet;
    money -= bet;
}
function resetStats(){
    currPot = 0;
    bet = 0;
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