

async function login() {
    let email = document.getElementById("EMAIL").value;
    let pass = document.getElementById("PASSWORD").value;
    //fetch
    //call for POST to the url:
    let response = await fetch('http://localhost:3001/users/login', {
        //post
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //this is the stuff we refer to as: req.body in the backend!!!!!
        body: JSON.stringify({
            EMAIL: email,
            PASSWORD: pass
        })
    })
    //get data from backend response as json!
    let body = await response.json()

    //if I dont get a variable called data from the back, something is wrong!

    if (!body.data) {
        alert(body.message);
        return;
    }
    //if im here i have the data so lets save it!!!
    sessionStorage.setItem("username", body.data.USERNAME);
    sessionStorage.setItem("title", body.data.TITLE);
    sessionStorage.setItem("email", body.data.EMAIL)
    //data.data keeps username and role, lets use the role to see to where to navigate
    
    window.location.href = "http://localhost:3001/Connected";

}

