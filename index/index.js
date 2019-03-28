window.onload = function(){
    document.getElementById("anon").onclick = goToDealerScreen;
    document.getElementById("createAccountButton").onclick = createAccount;
}

function goToDealerScreen(){
    

}

function createAccount(){
    var user = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    
    console.log(user);
    console.log(pw);
    
}