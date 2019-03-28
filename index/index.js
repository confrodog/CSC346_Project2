var user;
var money;

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
    
    let subPlayScreen1 = document.createElement("div");
    subPlayScreen1.id = "subPlayScreen1";

    //add amount of money user has
    let moneyDiv = document.createElement("div");
    moneyDiv.id = "moneyDiv";
    let moneyH2 = document.createElement("h2");
    moneyH2.innerHTML = "You have $" + amount + " to bet with."
    moneyDiv.appendChild(moneyH2);
    subPlayScreen1.appendChild(moneyDiv);

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
    subPlayScreen1.appendChild(UIDiv);
    document.getElementById("playScreen").appendChild(subPlayScreen1);
}

function playButtonPressed(){
    //clear sub screen and update welcome
    document.getElementById("subPlayScreen1").innerHTML = "";
    document.getElementById("welcomeHeader").innerHTML = "Enter a bet," + user;
    //create new UI
    let subPlayScreen2 = document.createElement("div");
    let betScreen = document.createElement("div");
    betScreen.id = "betScreen";
    
}
//make the playscreen go away and make the home screen come back
function leaveButtonPressed(){
    document.getElementById("playScreen").innerHTML = "";
    document.getElementById("homeScreen").style.display = "block";
}