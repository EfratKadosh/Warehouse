const itemsPerPage = 8;
let currentPage = 1;



function pagenum(num){
    table(num)
}
function openFormorder() {
    document.getElementById("dateForm").style.display = "block";
}

function closeFormorder() {
    document.getElementById("dateForm").style.display = "none";
}

async function orderI(name , s_n  ){
    const username = sessionStorage.username;

    let borrow = document.getElementById("borrow").value;
    borrow = borrow.split('-')[2]+"/"+borrow.split('-')[1]+"/"+borrow.split('-')[0];
    let ret = document.getElementById("return").value;
    ret = ret.split('-')[2]+"/"+ret.split('-')[1]+"/"+ret.split('-')[0];
    if( ret == null || borrow ==null){
        alert("Enter dates");
    }
    console.log(name)
    console.log(s_n)
    console.log(username)


    //call for get to the url:
    let response = await fetch('http://localhost:3001/orders/addorder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            USERNAME:username,
            NAMEITEM: name,
            S_N: s_n,
            BORROW_DATE:borrow,
            RETURN_DATE:ret
        }),
    });
    //get data from backend response as json!
    let body = await response.json()

    if(body.message)
        alert(body.message);
    
    if(body.status == 200){
        document.getElementById(id).remove();


    }
        
}


async function deleteI(name , s_n , id ){

    //call for get to the url:
    let response = await fetch('http://localhost:3001/warehouse/deleteItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            NAME: name,
            S_N: s_n
        }),
    });
    //get data from backend response as json!
    let body = await response.json()

    if(body.message)
        alert(body.message);
    
    if(body.status == 200)
        document.getElementById(id).remove();
}

async function table(page) {
    //call for get to the url:
    let response = await fetch('http://localhost:3001/warehouse/watchItemForStatus?STATUS=IN', {
        //Get
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    //get data from backend response as json!
    let body = await response.json()

    // (C1) GET THE SOURCE & DESTINATION ELEMENTS
    var d = document.getElementById("12item");

const startIndex = (page - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedItems = body.slice(startIndex, endIndex);
console.log(itemsPerPage);
d.innerHTML = '';

paginatedItems.forEach((item) => {
  const id = Date.now();
  console.log(sessionStorage.title)
  if(sessionStorage.title == "StorageManger" ){
    const itemHtml = `
    <div class="col-xl-3 col-sm-6" id="${id}">
    <div class="card">
        <div class="card-body">
        <div class="dropdown float-end">
            <a class="text-muted dropdown-toggle font-size-16" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-horizontal-rounded"></i></a>
            <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">עריכה</a>
            <a class="dropdown-item" href="#" onclick="deleteI('${item.name}', '${item.s_n}', '${id}')">הסרה</a>
            </div>
        </div>
        <div class="d-flex align-items-center">
            <div><img src="" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
            <div class="flex-1 ms-3">
            <h5 class="font-size-16 mb-1" id="name-item"><a href="#" class="text-dark">${item.name}</a></h5>
            <span class="badge badge-soft-success mb-0" id="cat">${item.category}</span>
            </div>
        </div>
        <div class="mt-3 pt-1">
            <p class="text-muted mb-0" id="status"><i class="font-size-15 align-middle pe-2 text-primary"></i>זמין</p>
            <p class="text-muted mb-0 mt-2" id="amount"><i class="font-size-15 align-middle pe-2 text-primary"></i>${item.s_n}</p>
            <p class="text-muted mb-0 mt-2" id="s-num"><i class="font-size-15 align-middle pe-2 text-primary"></i>${item.amount}</p>
            <p class="text-muted mb-0 mt-2" id="side"><i class="font-size-15 align-middle pe-2 text-primary"></i>${item.ancillary_items}</p>
        </div>
        <div class="d-flex gap-2 pt-4">
            <button type="button" class="btn btn-danger" id="safe">הוראות בטיחות</button>
            <button type="button" class="btn btn-primary" onclick="openFormorder()" >השאלה</button>
            <div>
                        <div class="form-popup" id="dateForm">
                        <form class="form-container">
                            <label for="name"><b>תאריך לקיחה </b></label>
                            <input type="date" format="DD-MM-YYYY"  name="name" id ="borrow" required>
                        
                            <label for="email"><b>תאריך החזרה</b></label>
                            <input type="date" format="DD-MM-YYYY" name="SN" id ="return" required>

                            <button type="button" class="btn btn-primary" onclick = "orderI('${item.name}', '${item.s_n}')" >Submit</button>
                            <button type="button" class="btn btn-danger" onclick="closeFormorder()">Close</button>
                        </form>
                        </div>
        </div>
        </div>
    </div>
    </div>`
    d.innerHTML += itemHtml;


  }
  else if (sessionStorage.title == "Student") {
    document.getElementById("additem").hidden = true;
    const itemHtml = `
    <div class="col-xl-3 col-sm-6" id="${id}">
    <div class="card">
        <div class="card-body">
        <div class="d-flex align-items-center">
            <div><img src="" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
            <div class="flex-1 ms-3">
            <h5 class="font-size-16 mb-1" id="name-item"><a href="#" class="text-dark">${item.name}</a></h5>
            <span class="badge badge-soft-success mb-0" id="cat">${item.category}</span>
            </div>
        </div>
        <div class="mt-3 pt-1">
            <p class="text-muted mb-0" id="status"><i class="font-size-15 align-middle pe-2 text-primary"></i>זמין</p>
            <p class="text-muted mb-0 mt-2" id="amount"><i class="font-size-15 align-middle pe-2 text-primary"></i>${item.s_n}</p>
            <p class="text-muted mb-0 mt-2" id="s-num"><i class="font-size-15 align-middle pe-2 text-primary"></i>${item.amount}</p>
            <p class="text-muted mb-0 mt-2" id="side"><i class="font-size-15 align-middle pe-2 text-primary"></i>${item.ancillary_items}</p>
        </div>
        <div class="d-flex gap-2 pt-4">
            <button type="button" class="btn btn-danger" id="safe">הוראות בטיחות</button>
            <button type="button" class="btn btn-primary" onclick="openFormorder()" >השאלה</button>
            <div>
                        <div class="form-popup" id="dateForm">
                        <form class="form-container">
                            <label for="name"><b>תאריך לקיחה </b></label>
                            <input type="date" format="DD-MM-YYYY"  name="name" id ="borrow" required>
                        
                            <label for="email"><b>תאריך החזרה</b></label>
                            <input type="date" format="DD-MM-YYYY" name="SN" id ="return" required>

                            <button type="button" class="btn btn-primary" onclick = "orderI('${item.name}', '${item.s_n}')" >Submit</button>
                            <button type="button" class="btn btn-danger" onclick="closeFormorder()">Close</button>
                        </form>
                        </div>
        </div>
        </div>
    </div>
    </div>`
    d.innerHTML += itemHtml;
  }
  else{
    document.getElementById("additem").hidden = true;
    const itemHtml = `
    <div class="col-xl-3 col-sm-6" id="${id}">
    <div class="card">
        <div class="card-body">
        <div class="d-flex align-items-center">
            <div><img src="" alt="" class="avatar-md rounded-circle img-thumbnail" /></div>
            <div class="flex-1 ms-3">
            <h5 class="font-size-16 mb-1" id="name-item"><a href="#" class="text-dark">${item.name}</a></h5>
            <span class="badge badge-soft-success mb-0" id="cat">${item.category}</span>
            </div>
        </div>
        <div class="mt-3 pt-1">
            <p class="text-muted mb-0" id="status"><i class="font-size-15 align-middle pe-2 text-primary"></i>זמין</p>
            <p class="text-muted mb-0 mt-2" id="amount"><i class="font-size-15 align-middle pe-2 text-primary"></i>${item.s_n}</p>
            <p class="text-muted mb-0 mt-2" id="s-num"><i class="font-size-15 align-middle pe-2 text-primary"></i>${item.amount}</p>
            <p class="text-muted mb-0 mt-2" id="side"><i class="font-size-15 align-middle pe-2 text-primary"></i>${item.ancillary_items}</p>
        </div>
        <div class="d-flex gap-2 pt-4">
            <button type="button" class="btn btn-danger" id="safe">הוראות בטיחות</button>
            <button type="button" class="btn btn-primary" onclick="openFormorder()" >השאלה</button>
            <div>
                        <div class="form-popup" id="dateForm">
                        <form class="form-container">
                            <label for="name"><b> תאריך לקיחה </b></label>
                            <input type="date" format="DD-MM-YYYY"  value = ${new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')} name="name" id ="borrow" required readonly>

                            <input type="date" format="DD-MM-YYYY" value = ${new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')} name="SN" id ="return" class="hidden-input"  required>
                            <style>
                                .hidden-input {
                                display: none;
                                }
                            </style>
                            

                            <p>יש להחזיר את הפריט עד סוף היום<p>

                            <button type="button" class="btn btn-primary" onclick = "orderI('${item.name}', '${item.s_n}')" >Submit</button>
                            <button type="button" class="btn btn-danger" onclick= "closeFormorder()" >Close</button>
                        </form>
                        </div>
        </div>
        </div>
    </div>
    </div>`
    d.innerHTML += itemHtml;

  }
});
}

async function nextpage(){
    //call for get to the url:
    let response = await fetch('http://localhost:3001/warehouse/watchItemForStatus?STATUS=IN', {
        //Get
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    //get data from backend response as json!
    let body = await response.json();

    document.getElementById("size").innerText = "("+body.length+")"; 
    //if I dont get a variable called data from the back, something is wrong!
    let tot = Math.ceil(body.length/itemsPerPage);
    for(let i = 0 ; i <tot ;i++){
        const pageitemjtml = `<li class="page-item" onclick = "pagenum(${i+1})"><a href="#" class="page-link">${i+1}</a></li>`
        document.getElementById("pagenum").innerHTML += pageitemjtml
    }
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}



async function addI(name,s_n,cat){
    name = document.querySelector('#name').value;
    s_n = document.querySelector('#SN').value;
    cat = document.querySelector('#CATEGORY').value;
    let response = await fetch('http://localhost:3001/warehouse/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            NAME:name,
            S_N:s_n,
            CATEGORY:cat
        })
    })
    //get data from backend response as json!
    let body = await response.json();
    alert(body.message);
    closeForm();
    location.reload();
}

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
    if(body.message)
        alert(body.message);
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
    if(body.message)
        alert(body.message);
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
// async function ReadNotifiction(){
//     username = sessionStorage.username

//     let response = await fetch('http://localhost:3001/notification/UpdateToRead', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             ASSOCIATION:username
//         }) 
        
//     })
//     //get data from backend response as json!
//     let body = await response.json();
//     if(body.message)
//         alert(body.message);
// }


nextpage();
table(1);

// if(sessionStorage.title == 'StorgeManger')
// {
//     NumNotificationManager();
//     notificationManager();
// }
// else{
//     NumNotificationUser();
//     notificationUser();
// }




  