function checkEmailFormat(email) {
    const regex = /^[^\s@]+@ac\.sce\.ac\.il$/;
    return regex.test(email);
  }
  
function validatePassword(password, repeatPassword) {
const regex = /^.{8,16}$/
if (password != repeatPassword) {
    return false;
}
if (!regex.test(password)) {
    return false;
}
return true;
  }
function validateDateOfBirth(dateOfBirth) {
    const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateOfBirth);
  }  

async function register() {
    let User = document.getElementById("Username").value;
    let date = document.getElementById("date").value;
    let Pass = document.getElementById("Password").value;
    let Pass2 = document.getElementById("Pass2").value;
    let email = document.getElementById("email").value;
    let firstname = document.getElementById("firstname").value;
    let lastnasme = document.getElementById("lastnasme").value;

    if(!checkEmailFormat(email)){
        alert("The format of the email is not correct!");
        return;
    }
    
    if(!validatePassword(Pass, Pass2)){
        alert("Your passwords do not match or are between 8-16 characters");
        return;
    }

    if(!validateDateOfBirth(date)){
        alert("The date of birth you entered is not in 'DD/MM/YYYY' format");
        return;
    }
      
    //fetch
    //call for POST to the url:
    let response = await fetch('http://localhost:3001/users/register', {
        //post
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //this is the stuff we refer to as: req.body in the backend!!!!!
        body: JSON.stringify({
            FIRSTNAME : firstname ,
            LASTNAME : lastnasme ,
            EMAIL : email ,
            BIRTHDAY : date ,
            USERNAME : User ,
            PASSWORD : Pass
        }) 
    })

    //get data from backend response as json!
    let body = await response.json()

    //if I dont get a variable called data from the back, something is wrong!
    if (!body.flag) {
        alert(body.message);
        return;
    }

    alert(body.message);    
    window.location.href = "http://localhost:3001/login";
    
}