document.getElementById('items').addEventListener('click', function() {
    fetch('table.html')
      .then(response => response.text())
      .then(html => {
        document.querySelector('#content').innerHTML = html;
      });
  });

  async function notificationUser(){
    username = sessionStorage.username
    var d = document.getElementById("noti");

    let response = await fetch('http://localhost:3001/notification/getAllNotiForUser?USERNAME='+username, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    //get data from backend response as json!
    let body = await response.json();
    if(body.message){
        
    }
    else{
        body.forEach((item) => {
            const itemHtml = `
            <div class="notify_item">
            <div class="notify_img">
            </div>
            <div class="notify_info">
              <p>${item.DESCRIPTION}</p>
            </div>
          </div>
            `
            d.innerHTML += itemHtml;  
        });
        
    }
}

async function notificationManager(){
    var d = document.getElementById("noti");

    let response = await fetch('http://localhost:3001/notification/getAllNotiForManager', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    //get data from backend response as json!
    let body = await response.json();
    if(body.message){

    }
       
    else{
        body.forEach((item) => {
            const itemHtml = `
            <div class="notify_item">
            <div class="notify_img">
            </div>
            <div class="notify_info">
              <p>${item.DESCRIPTION}</p>
            </div>
          </div>
            `
            d.innerHTML += itemHtml;  
        });
        
    }
}

async function NumNotificationManager(){
    var d = document.getElementById("numnoti");

    let response = await fetch('http://localhost:3001/notification/getNumberNotReadNoti', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    //get data from backend response as json!
    let body = await response.json();
    if(body.message)
        alert(body.message);
    else{
            d.innerHTML += body;  
    }
}

async function NumNotificationUser(){
    username = sessionStorage.username
    var d = document.getElementById("numnoti");

    let response = await fetch('http://localhost:3001/notification/getNumberNotReadNotiForUser?USERNAME='+username, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    //get data from backend response as json!
    let body = await response.json();
    if(body.message)
        alert(body.message);
    else{
            d.innerHTML += body;  
    }
}

async function ReadNotifiction(){

    if (sessionStorage.title == 'StorgeManger')
        username = 'StorgeManger';
    else
        username = sessionStorage.username;

    let response = await fetch('http://localhost:3001/notification/UpdateToRead', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ASSOCIATION:username
        }) 
        
    })
    //get data from backend response as json!
    let body = await response.json();
    if(body.message != "update successfully!" ) {

    }
}



if(sessionStorage.title == 'StorgeManger')
{
    NumNotificationManager();
    notificationManager();
}
else{
    NumNotificationUser();
    notificationUser();
}