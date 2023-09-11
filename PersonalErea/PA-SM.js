async function goToHomePage() {
  window.location.href = "http://localhost:3001/Connected";
}

async function choosePage() {

	const title = sessionStorage.title

	if(title == "StorgeManger"){
		window.location.href = "http://localhost:3001/Storgemanger";
	}
	else{
		window.location.href = "http://localhost:3001/Stu_Lec_profile";
	}
}

async function showProfile() {

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

  
  async function acceptOrders() {
    var d = document.getElementById("items");
    var elements = d.getElementsByClassName("col-md-6");
    while (elements.length > 0) {
      elements[0].remove();
    }
  
    // Call for GET to the URL
    let response = await fetch('http://localhost:3001/orders/getAllOrderAccept', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    // Get data from the backend response as JSON
    let body = await response.json();
    if (body.message) {
      alert(body.message);
      return;
    }
  
    // Iterate over each item and create HTML elements
    body.forEach((item) => {
      const itemHtml = `
      <div class="col-md-6">
        <div class="panel">
          <div class="panel-body">
            <div class="bio-desk">
              <h4 class="red">${item.USERNAME}:שם המשאיל</h4>
              <p>${item.NAMEITEM}:שם הפריט</p>
              <p>${item.S_N}:מקט הפריט</p>
              <p>${item.BORROW_DATE}:תאריך השאלה</p>
              <p>${item.RETURN_DATE}:תאריך החזרה</p>
              <p>${item.STATUS}: סטטוס</p>
            </div>
            <div class="bio-chart">
              <div style="display: inline; width: 100px; height: 100px">
                <canvas width="100" height="100px"></canvas>
                <input
                  class="knob"
                  data-width="100"
                  data-height="100"
                  data-displayprevious="true"
                  data-thickness=".2"
                  value="16"
                  data-fgcolor="#e06b7d"
                  data-bgcolor="#e8e8e8"
                  style="
                    width: 54px;
                    height: 33px;
                    position: absolute;
                    vertical-align: middle;
                    margin-top: 33px;
                    margin-left: -77px;
                    border: 0px;
                    font-weight: bold;
                    font-style: normal;
                    font-variant: normal;
                    font-stretch: normal;
                    font-size: 20px;
                    line-height: normal;
                    font-family: Arial;
                    text-align: center;
                    color: rgb(224, 107, 125);
                    padding: 0px;
                    -webkit-appearance: none;
                    background: none;
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>`;
  
      d.innerHTML += itemHtml;
    });
  }


async function faultItem() {
  
  var d = document.getElementById("items");
  var elements = d.getElementsByClassName("col-md-6");
  while(elements.length > 0){
    elements[0].remove();
  }

 
  //call for get to the url:
  let response = await fetch('http://localhost:3001/warehouse/watchItemForStatus?STATUS=FAULTY', {
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
  //if I dont get a variable called data from the back, something is wrong!

body.forEach((item) => {
const itemHtml = `
<div class="col-md-6">
  <div class="panel">
    <div class="panel-body">
    <div class="bio-desk">
    <h4 class="red">${item.name}:שם הפריט</h4>
    <p>${item.s_n}:מקט הפריט</p>
  </div>
      <div class="bio-chart">
      <button class="button-14" role="button" onclick="updateStatusToIn('${item.name}','${item.s_n}','IN')">Proper</button>
        <div style="display: inline; width: 100px; height: 100px">
          <canvas width="100" height="100px"></canvas
          ><input
            class="knob"
            data-width="100"
            data-height="100"
            data-displayprevious="true"
            data-thickness=".2"
            value = "16"
            data-fgcolor="#e06b7d"
            data-bgcolor="#e8e8e8"
            style="
              width: 54px;
              height: 33px;
              position: absolute;
              vertical-align: middle;
              margin-top: 33px;
              margin-left: -77px;
              border: 0px;
              font-weight: bold;
              font-style: normal;
              font-variant: normal;
              font-stretch: normal;
              font-size: 20px;
              line-height: normal;
              font-family: Arial;
              text-align: center;
              color: rgb(224, 107, 125);
              padding: 0px;
              -webkit-appearance: none;
              background: none;
            "
          />
        </div>
      </div>
    </div>
  </div>
</div>`

  d.innerHTML += itemHtml;
});
}

async function updateStatusToIn(nameitem,s_n,status) {
 

  let requestBody = {
    NAME: nameitem,
    S_N: s_n,
    STATUS: status
  };

  // Call the UpdateStatusOrderPS endpoint
  let response = await fetch('http://localhost:3001/warehouse/UpdateItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  // Get the response data as JSON
  let body = await response.json();

  if (response.ok) {
    // Display success message
    alert(body.message);
  } else {
    // Display error message
    console.log(body);
    alert(body.message || 'Failed to update order status');
  }
  location.reload();
}



async function showItem() {
  var d = document.getElementById("items");
  var elements = d.getElementsByClassName("col-md-6");
  while (elements.length > 0) {
    elements[0].remove();
  }

  // Call for GET to the URL
  let response = await fetch('http://localhost:3001/orders/getOrderForStatus?STATUS_ORDER=In-processed', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  // Get data from the backend response as JSON
  let body = await response.json();
  if (body.message) {
    alert(body.message);
    return;
  }

  // Iterate over each item and create HTML elements
  body.forEach((item) => {
    const itemHtml = `
    <div class="col-md-6">
      <div class="panel">
        <div class="panel-body">
          <div class="bio-desk">
            <h4 class="red">${item.USERNAME}:שם המשאיל</h4>
            <p>${item.NAMEITEM}:שם הפריט</p>
            <p>${item.S_N}:מקט הפריט</p>
            <p>${item.BORROW_DATE}:תאריך השאלה</p>
            <p>${item.RETURN_DATE}:תאריך החזרה</p>
            <p>${item.STATUS}: סטטוס</p>
          </div>
          <div class="bio-chart">
            <button class="button-14" role="button" onclick="updateOrderStatus('${item.USERNAME}', '${item.NAMEITEM}', '${item.S_N}', '${item.BORROW_DATE}', 'Accept')">Accept</button>
            <button class="button-14" role="button" onclick="updateOrderStatus('${item.USERNAME}', '${item.NAMEITEM}', '${item.S_N}', '${item.BORROW_DATE}', 'Reject')">Reject</button>
            <div style="display: inline; width: 100px; height: 100px">
              <canvas width="100" height="100px"></canvas>
              <input
                class="knob"
                data-width="100"
                data-height="100"
                data-displayprevious="true"
                data-thickness=".2"
                value="16"
                data-fgcolor="#e06b7d"
                data-bgcolor="#e8e8e8"
                style="
                  width: 54px;
                  height: 33px;
                  position: absolute;
                  vertical-align: middle;
                  margin-top: 33px;
                  margin-left: -77px;
                  border: 0px;
                  font-weight: bold;
                  font-style: normal;
                  font-variant: normal;
                  font-stretch: normal;
                  font-size: 20px;
                  line-height: normal;
                  font-family: Arial;
                  text-align: center;
                  color: rgb(224, 107, 125);
                  padding: 0px;
                  -webkit-appearance: none;
                  background: none;
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>`;

    d.innerHTML += itemHtml;
  });
}

async function updateOrderStatus(username, itemName, itemSN, borrowDate, status) {
  let requestBody = {
    USERNAME: username,
    NAMEITEM: itemName,
    S_N: itemSN,
    BORROW_DATE: borrowDate,
    STATUS_ORDER: status 
  };

  // Call the UpdateStatusOrderItem endpoint
  let response = await fetch('http://localhost:3001/orders/updateStatusOrderItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  // Get the response data as JSON
  let body = await response.json();

  if (response.ok) {
    // Display success message
    alert(body.message);
  } else {
    // Display error message
    console.log(body);
    alert(body.message || 'Failed to update order status');
  }
  location.reload();
}



async function showPS() {
  var d = document.getElementById("items");
  var elements = d.getElementsByClassName("col-md-6");
  while (elements.length > 0) {
    elements[0].remove();
  }

  let response = await fetch('http://localhost:3001/orders/getOrderForStatusPS?STATUS=In-processed', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  let body = await response.json();
  if (body.message) {
    alert(body.message);
    return;
  }

  body.forEach((item) => {
    const itemHtml = `
      <div class="col-md-6">
        <div class="panel">
          <div class="panel-body">
            <div class="bio-desk">
              <h4 class="red">${item.USERNAME}:שם המשאיל</h4>
              <p>${item.TYPE}: סוג</p>
              <p>${item.NUM}:מספר חדר</p>
              <p>${item.DATE_TIME}:תאריך השאלה</p>
              <p>${item.STATUS}: סטטוס</p>
            </div>
            <div class="bio-chart">
              <button class="button-14" role="button" onclick="updateOrderStatusPS('${item.USERNAME}','${item.TYPE}', '${item.NUM}', '${item.DATE_TIME}', 'Accept')">Accept</button>
              <button class="button-14" role="button" onclick="updateOrderStatusPS('${item.USERNAME}','${item.TYPE}', '${item.NUM}', '${item.DATE_TIME}', 'Reject')">Reject</button>
              <div style="display: inline; width: 100px; height: 100px">
                <canvas width="100" height="100px"></canvas>
                <input
                  class="knob"
                  data-width="100"
                  data-height="100"
                  data-displayprevious="true"
                  data-thickness=".2"
                  data-fgcolor="#e06b7d"
                  data-bgcolor="#e8e8e8"
                  style="
                    width: 54px;
                    height: 33px;
                    position: absolute;
                    vertical-align: middle;
                    margin-top: 33px;
                    margin-left: -77px;
                    border: 0px;
                    font-weight: bold;
                    font-style: normal;
                    font-variant: normal;
                    font-stretch: normal;
                    font-size: 20px;
                    line-height: normal;
                    font-family: Arial;
                    text-align: center;
                    color: rgb(224, 107, 125);
                    padding: 0px;
                    -webkit-appearance: none;
                    background: none;
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>`;

    d.innerHTML += itemHtml;
  });
}

async function updateOrderStatusPS(username,type,num, dateTime, status) {


  let requestBody = {
    USERNAME: username,
    TYPE: type,
    NUM: num,
    DATE_TIME: dateTime,
    STATUS: status
  };

  // Call the UpdateStatusOrderPS endpoint
  let response = await fetch('http://localhost:3001/orders/updateStatusOrderPS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  // Get the response data as JSON
  let body = await response.json();

  if (response.ok) {
    // Display success message
    alert(body.message);
  } else {
    // Display error message
    console.log(body);
    alert(body.message || 'Failed to update order status');
  }
  location.reload();
}


  

var ordersChart;
var faultyChart;
var podcastChart;

async function itemOrders() {
  // Get the canvas element
  var ctx = document.getElementById('OrdersChart').getContext('2d');

  // Fetch the total number of orders
  let totalResponse = await fetch('http://localhost:3001/statistics/getNumberAllOrders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Get the total number of orders from the backend response as JSON
  let totalBody = await totalResponse.json();
  if (totalBody.message) {
    alert(totalBody.message);
    return;
  }

  // Fetch the number of orders per category
  let response = await fetch('http://localhost:3001/statistics/getNumberOfOrdersCategory', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Get data from the backend response as JSON
  let body = await response.json();
  if (body.message) {
    alert(body.message);
    return;
  }

  // Extract the category labels and numbers from the response body
  var categories = [];
  var numbers = [];
  body.forEach((item) => {
    categories.push(item.CATEGORY);
    numbers.push(item.NUMBER);
  });

  // Define the chart data using the extracted data
  var ordersData = {
    labels: categories,
    datasets: [{
      label: 'Total Orders: ' + totalBody,
      data: numbers,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(252, 3, 235, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(252, 3, 235, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Destroy the faultyChart if it exists
  if (faultyChart) {
    faultyChart.destroy();
  }

  // Destroy the podcastChart if it exists
  if (podcastChart) {
    podcastChart.destroy();
  }

  // Create the OrdersChart
  ordersChart = new Chart(ctx, {
    type: 'bar',
    data: ordersData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


async function faultyItems() {
  // Get the canvas element
  var ctx = document.getElementById('faultyChart').getContext('2d');

  // Fetch the total number of faulty items
  let totalResponse = await fetch('http://localhost:3001/statistics/getNumberOfAllFaulty', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Get the total number of faulty items from the backend response as JSON
  let totalBody = await totalResponse.json();
  if (totalBody.message) {
    alert(totalBody.message);
    return;
  }

  // Fetch the number of faulty items per category
  let response = await fetch('http://localhost:3001/statistics/getNumberOfFaultyCategory', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Get data from the backend response as JSON
  let body = await response.json();
  if (body.message) {
    alert(body.message);
    return;
  }

  // Extract the category labels and numbers from the response body
  var categories = [];
  var numbers = [];
  body.forEach((item) => {
    categories.push(item.CATEGORY);
    numbers.push(item.NUMBER);
  });

  // Define the chart data using the extracted data
  var faultyData = {
    labels: categories,
    datasets: [{
      label: 'Total Faulty Items: ' + totalBody,
      data: numbers,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(252, 3, 235, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(252, 3, 235, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Destroy the podcastChart if it exists
  if (podcastChart) {
    podcastChart.destroy();
  }
  // Destroy the ordersChart if it exists
  if (ordersChart) {
    ordersChart.destroy();
  }

  // Create the faultyItems chart
  faultyChart = new Chart(ctx, {
    type: 'bar',
    data: faultyData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



async function podcastOrders() {
  // Get the canvas element
  var ctx = document.getElementById('podcastChart').getContext('2d');

  // Fetch the number of orders per type
  let response = await fetch('http://localhost:3001/statistics/getNumberAllOrdersPS', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Get data from the backend response as JSON
  let body = await response.json();
  if (body.message) {
    alert(body.message);
    return;
  }

  // Extract the type labels and numbers from the response body
  var types = [];
  var numbers = [];
  body.forEach((item) => {
    types.push(item.TYPE);
    numbers.push(item.NUMBER);
  });

  // Define the chart data using the extracted data
  var podcastData = {
    labels: types,
    datasets: [{
      label: 'podcastChart',
      data: numbers,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }]
  };

  // Destroy the faultyChart if it exists
  if (faultyChart) {
    faultyChart.destroy();
  }

  // Destroy the ordersChart if it exists
  if (ordersChart) {
    ordersChart.destroy();
  }

  // Create the podcastChart
  podcastChart = new Chart(ctx, {
    type: 'bar',
    data: podcastData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
