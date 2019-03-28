window.onload = function(){
    document.getElementById("anon").onclick = playAnon;
}

function playAnon(){
    //buildPLayScreen with Anon as name
    buildPlayScreen("Anonomous", 100);
}

function buildPlayScreen(name, amount){
    //hide homeScreen
    document.getElementById("homeScreen").style.display = "none";

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

    //add UI


}