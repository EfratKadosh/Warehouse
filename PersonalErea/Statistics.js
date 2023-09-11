async function ShowProfile() {

    const username = sessionStorage.username
     //call for get to the url:
     let response = await fetch('http://localhost:3001/users/watchUser?USERNAME='+username, {
      //Get
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
  
  })
  //get data from backend response as json!
  let body = await response.json()
  if(body.message){
    alert(body.message)
    return;
  }
  document.getElementById("firstname").innerText = body[0][0];
  document.getElementById("lastname").innerText = body[0][1];
  document.getElementById("DateOfBirth").innerText = body[0][3];
  document.getElementById("email").innerText = body[0][2];
  document.getElementById("username").innerText = body[0][5];
  document.getElementById("title").innerText = body[0][4];
  document.getElementById("fullname").innerText = body[0][0] +" "+ body[0][1];
  document.getElementById("titlefullname").innerText = body[0][0] +" "+ body[0][1];
  
  }
  showProfile();
