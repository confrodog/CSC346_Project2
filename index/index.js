var user;
var money;
var currPot = 0;

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
    betButton.onclick = start;
    let backOutButton = document.createElement("button");
    backOutButton.innerHTML = "BACK OUT";
    backOutButton.onclick = backOut;
    betScreenLeft.appendChild(betButton);
    betScreenLeft.appendChild(backOutButton);

    let betScreenRight = document.createElement("div");
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

function start(){

}

function backOut(){

}

//make the playscreen go away and make the home screen come back
function leaveButtonPressed(){
    document.getElementById("playScreen").innerHTML = "";
    document.getElementById("homeScreen").style.display = "block";
}







//helper to make bet options
function createRadioBet(value){
    let tempDiv = document.createElement("div");
    let temp = document.createElement("input");
    let tempLabel = document.createElement("label");
    temp.type = "radio";
    temp.name = "betOptions";
    temp.value = value;
    temp.id = value;
    tempLabel.htmlFor = value;
    tempLabel.innerHTML = "$" + value ;

    tempDiv.appendChild(temp);
    tempDiv.appendChild(tempLabel);


    return tempDiv;
}
