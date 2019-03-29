


(function () {
    "use strict";

window.onload = function(){
    document.getElementById("anon").onclick = goToDealerScreen;
    document.getElementById("createAccountButton").onclick = createAccount;
    document.getElementById("signinButton").onclick = signinAccount;
}

function goToDealerScreen(){
    

}
/* createAccount will take the info from the sign-in div and send it
to the server side program. 
*/
function createAccount(){
    var user = document.getElementById("createUser").value;
    var pw = document.getElementById("createPW").value;
    
    console.log(user);
    console.log(pw);

    var userJSON = {"username":user,"password":pw};
    const fetchOptions = {
		method : 'POST',
		headers : {
			'Accept': 'application/json',
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(userJSON)
	};

	var url = "http://localhost:3000";
	fetch(url, fetchOptions)
		.then(checkStatus)
		.then(function(responseText) {
            console.log(responseText);
            
		})
		.catch(function(error) {
			console.log(error);
   		});
}


/* signinAccount will request json objects in order to find the
user within the server. Right now, this is all a test.
*/
function signinAccount(){
    var user = document.getElementById("signUser").value;
    var pw = document.getElementById("signPW").value;
    
    console.log("signin: "+user);
    console.log("signin: "+pw);
    
    var url = "http://localhost:3000";
	fetch(url)
		.then(checkStatus)
		.then(function(responseText) {
      //clearDivs();
      var comments = JSON.parse(responseText);
      console.log(comments);
      //messageBoard(comments);
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
