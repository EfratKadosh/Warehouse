const connection = require('../mySQL');
const express = require('express');
const router = express.Router();

router.post('/addOrderForPS', addOrderForPS);
router.post('/UpdateStatusOrderPS', UpdateStatusOrderPS);
router.get('/getAllOrdersPS', getAllOrdersPS);
router.get('/getAllOrderPSForUser', getAllOrderPSForUser);
router.get('/getOrderForStatusPS', getOrderForStatusPS);
router.post('/UpdateStatusOrderItem', UpdateStatusOrderItem);
router.get('/getAllOrdersItem', getAllOrdersItem);
router.get('/getAllOrderItemForUser', getAllOrderItemForUser);
router.get('/getOrderAcceptForUser', getOrderAcceptForUser);
router.get('/getAllOrderAccept', getAllOrderAccept);
router.get('/getOrderForStatus', getOrderForStatus);
router.post('/addorder', addOrder);


async function addOrder(req, response) {
    const db = await connection();
    let orderObj = req.body;
    let sql = `SELECT * from orders WHERE (BORROW_DATE <= to_date(:1,'DD/MM/YYYY') AND RETURN_DATE >= to_date(:1,'DD/MM/YYYY'))`;
    let allOrdersBetween = await db.execute(sql,[orderObj.BORROW_DATE] );
    sql =`SELECT * from orders WHERE (BORROW_DATE > to_date(:1, 'DD/MM/YYYY') AND BORROW_DATE < to_date(:2,'DD/MM/YYYY'))`;
    let allOrdersBefore = await db.execute(sql,[orderObj.BORROW_DATE,orderObj.RETURN_DATE] );
    let title = await db.execute(`SELECT TITLE from users WHERE USERNAME= :1`,[orderObj.USERNAME] );

    let values = [
        orderObj.USERNAME,
        orderObj.NAMEITEM,
        orderObj.S_N,
        orderObj.BORROW_DATE,
        orderObj.RETURN_DATE
    ];
    let temp = values;
    console.log(title.rows[0][0]);
    if(title.rows[0][0]== 'Lecture')
    {
        for(let i=0;i<allOrdersBetween.rows.length;i++)
        {
            if(allOrdersBetween.rows[i][1] == orderObj.NAMEITEM && allOrdersBetween.rows[i][2] == orderObj.S_N)
            {
                sql = "DELETE FROM orders WHERE USERNAME= :1 AND NAMEITEM= :2 AND S_N= :3 AND BORROW_DATE= to_date(:4,'DD/MM/YYYY')";
                val = [allOrdersBetween.rows[i][0],allOrdersBetween.rows[i][1],allOrdersBetween.rows[i][2],allOrdersBetween.rows[i][3].toLocaleDateString('he-IL').split('/').join('/')];
                console.log(val);
                db.execute(sql,val,  (err, res) => {
                    if (err) {
                        console.log(err);
                        return response.status(400).json({ message: "Something went wrong" });
                    }
                    else {
                        sql = `INSERT INTO notifications (DESCRIPTION, ASSOCIATION) VALUES(:1, :2)`;
                        let description = "The warehouse manager 'Reject' your order for " + allOrdersBetween.rows[i][1] + " with serial number '" + allOrdersBetween.rows[i][2] + "' on dates " + allOrdersBetween.rows[i][3].toLocaleDateString('he-IL').split('/').join('/') +" - "+ allOrdersBetween.rows[i][4].toLocaleDateString('he-IL').split('/').join('/');
                        db.execute(sql,[description, allOrdersBetween.rows[i][0]] ,  (err, res) => {
                            if (err) {
                                console.log(err);
                                return response.status(400).json({ message: "Something went wrong" });
                                
                    }});
                    
                }});
            }
        }
    } else {
        if(allOrdersBetween.rows.length > 0)
        {
            for(let i=0;i<allOrdersBetween.rows.length;i++)
            {
                if(allOrdersBetween.rows[i][1] == orderObj.NAMEITEM && allOrdersBetween.rows[i][2] == orderObj.S_N)
                {
                    if(allOrdersBetween.rows[i][5] != 'Reject')
                        return response.status(400).json({ message: "The selected dates are not available for this item" });
                }
            }
        }
        if(allOrdersBefore.rows.length > 0)
        {
            for(let i=0;i<allOrdersBefore.rows.length;i++)
            {
                if(allOrdersBefore.rows[i][1] == orderObj.NAMEITEM && allOrdersBefore.rows[i][2] == orderObj.S_N)
                {
                    if(allOrdersBefore.rows[i][5] != 'Reject')
                        return response.status(400).json({ message: "The selected dates are not available for this item" });
                }
            }
        }
    }
    sql = `INSERT INTO orders (USERNAME, NAMEITEM, S_N, BORROW_DATE, RETURN_DATE) 
    VALUES(:1, :2, :3, to_date(:4 , 'DD/MM/YYYY'), to_date(:5 , 'DD/MM/YYYY'))`;
    db.execute(sql, values,  (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "Existing order" });
        } else {
            if (res.rowsAffected > 0) {
                sql = `INSERT INTO notifications (DESCRIPTION, ASSOCIATION) VALUES(:1, :2)`;
                let description = temp[0]  +" order '" +temp[1] +"' with serial number '"+ temp[2] +"' on dates "+ temp[3] +" - "+temp[4];
                console.log(description);
                db.execute(sql,[description, "StorgeManger"] ,  (err, res) => {
                    if (err) {
                        console.log(err);
                        return response.status(400).json({ message: "failed add notification" });
                    } else {
                        console.log(res)
                        if (res.rowsAffected > 0) {
                            return response.json({ message: "New order created successfully" });
                        }
                }});
            }
                else return response.status(400).json({ message: "Something went wrong" });
        }
    });
}

async function addOrderForPS(req, response) {
    const db = await connection();
    let orderObj = req.body;
    let sql = `INSERT INTO Studio_Podcast_Order (USERNAME, TYPE, NUM, DATE_TIME) 
            VALUES(:1, :2, :3, TO_TIMESTAMP(:4, 'DD/MM/YYYY HH24:MI'))`;

    let values = [
        orderObj.USERNAME,
        orderObj.TYPE,
        orderObj.NUM,
        orderObj.DATE_TIME
    ];
    let temp = values;
    db.execute(sql, values,  (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "The podcast or studio is busy at the time you chose" });
        } else {
            if (res.rowsAffected > 0) {
                sql = `INSERT INTO notifications (DESCRIPTION, ASSOCIATION) VALUES(:1, :2)`;
                let description = temp[0]  +" order " +temp[1] +" number '"+temp[2]+"' on "+ temp[3];
                console.log(description);
                db.execute(sql,[description, "StorgeManger"] ,  (err, res) => {
                if (err) {
                    console.log(err);
                    return response.status(400).json({ message: "failed add notification" });
                } else {
                    console.log(res)
                    if (res.rowsAffected > 0) {
                        return response.json({ message: "New order created successfully" });
                    }
                }});
            }
            else return response.status(400).json({ message: "Something went wrong" });
        
    }
});}

async function UpdateStatusOrderPS(req, response) {
    const db = await connection();
    let sql, val;
    let status = req.body.STATUS,
      date_time = req.body.DATE_TIME,
      type = req.body.TYPE,
      number = req.body.NUM,
      user = req.body.USERNAME;
  
    if (status == 'Reject') {
      sql = "DELETE FROM Studio_Podcast_Order WHERE TYPE= :1 AND NUM= :2 AND DATE_TIME= TO_TIMESTAMP(:3, 'DD/MM/YYYY HH24:MI')";
      val = [type, number, date_time];
    }
    if (status == 'Accept') {
      sql = "UPDATE Studio_Podcast_Order SET STATUS= :1 WHERE TYPE= :2 AND NUM= :3 AND DATE_TIME= TO_TIMESTAMP(:4, 'DD/MM/YYYY HH24:MI')";
      val = [status, type, number, date_time];
    }
  
    db.execute(sql, val, (err, res) => {
      if (err) {
        return response.status(400).json({ message: "Something went wrong" });
      }
      if (res.rowsAffected > 0) {
        sql = `INSERT INTO notifications (DESCRIPTION, ASSOCIATION) VALUES(:1, :2)`;
        let description = "The warehouse manager '" + status + "' your order for " + type + " number '" + number + "' on " + date_time;
        db.execute(sql, [description, user], (err, res) => {
            if (err) {
            console.log(err);
            return response.status(400).json({ message: "failed add notification" });
            }
        });
            return response.status(200).json({ message: "update successfully!" });
          }
    });
  }
  

async function getAllOrdersPS(req, response) {
    const db = await connection();
    db.execute("SELECT * FROM Studio_Podcast_Order" ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders is not found" });
    }
    if (!err) {
            let array =[];
            res.rows.map((orders) => {
                let obj = {
                    USERNAME: orders[0], 
                    TYPE: orders[1],
                    NUM: orders[2],
                    DATE_TIME: orders[3].toLocaleString('he-IL').split('').join(''),
                    STATUS : orders[4]
                }
                array.push(obj)
            })
            return response.status(200).json(array);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}

async function getAllOrderPSForUser(req, response) {
    const db = await connection();
    let user= [req.query.USERNAME];
    db.execute("SELECT * FROM Studio_Podcast_Order WHERE USERNAME= :1", user ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders for " +user+" is not found" });
    }
    if (!err) {
        let array =[];
        res.rows.map((orders) => {
            let obj = {
                USERNAME: orders[0], 
                TYPE: orders[1],
                NUM: orders[2],
                DATE_TIME: orders[3].toLocaleString('he-IL').split('').join(''),
                STATUS: orders[4]
            }
            array.push(obj)
        })
        return response.status(200).json(array);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}

async function getOrderForStatusPS(req, response) {
    const db = await connection();
    let status = [req.query.STATUS];
    db.execute("SELECT * FROM studio_podcast_order WHERE STATUS = :1", status, (err, res) => {
        if (res.rows.length == 0) {
            return response.status(400).json({ message: "Orders with '" + status + "' status is not found" });
        }
        if (!err) {
            let array = [];
            var options = {
                year: "numeric",
                month: "2-digit",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            };
            res.rows.map((orders) => {
                let obj = {
                    USERNAME: orders[0],
                    TYPE: orders[1],
                    NUM: orders[2],
                    DATE_TIME: orders[3].toLocaleString('he-IL', options).split('').join(''),
                    STATUS: orders[4]
                };
                array.push(obj);
            });
            return response.status(200).json(array);
        } else {
            console.log(err);
            response.status(400).json({ message: "Something went wrong" });
        }
    });
}


async function UpdateStatusOrderItem(req, response) {
    const db = await connection();
    let sql, val;
    let status = req.body.STATUS_ORDER, user = req.body.USERNAME, bor_date = req.body.BORROW_DATE,item_name = req.body.NAMEITEM,item_sn= req.body.S_N;
    let sqlForRetDate = "SELECT RETURN_DATE from orders WHERE USERNAME= :1 AND NAMEITEM= :2 AND S_N= :3 AND BORROW_DATE= to_date(:4,'DD/MM/YYYY')";
    let ret_date = await db.execute(sqlForRetDate,[user, item_name, item_sn, bor_date] );

    if(status == 'Reject')
    {
        sql = "UPDATE orders SET STATUS_ORDER= :1 WHERE USERNAME= :2 AND NAMEITEM= :3 AND S_N= :4 AND BORROW_DATE= to_date(:5,'DD/MM/YYYY')";
        val = [status, user, item_name, item_sn, bor_date];
    }
    if(status == 'Accept') 
    {
        sql = "UPDATE orders SET STATUS_ORDER= :1 WHERE USERNAME= :2 AND NAMEITEM= :3 AND S_N= :4 AND BORROW_DATE= to_date(:5,'DD/MM/YYYY')";
        val = [status, user, item_name, item_sn, bor_date];
    }
    db.execute(sql, val, (err, res) => {
        if (err) {
            response.status(400).json({ message: "Something went wrong" });
        }
    });
    sql = `INSERT INTO notifications (DESCRIPTION, ASSOCIATION) VALUES(:1, :2)`;
    let description = "The warehouse manager '"+status+"' your order for '" + item_name + "' on dates " + bor_date + " - " +ret_date.rows[0][0].toLocaleDateString('he-IL').split('/').join('/') ;
    db.execute(sql,[description,user] ,  (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "failed add notification" });
        } else {
            console.log(res)
            if (res.rowsAffected > 0) {
                response.status(200).json({ message: "update successfully!" });
            }
}});
}

async function getAllOrdersItem(req, response) {
    const db = await connection();
    db.execute("SELECT * FROM orders" ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders is not found" });
    }
    if (!err) {
        let array =[];
        res.rows.map((orders) => {
            let obj = {
                USERNAME: orders[0], 
                NAMEITEM: orders[1],
                S_N: orders[2],
                BORROW_DATE: orders[3].toLocaleDateString('he-IL').split('').join(''),
                RETURN_DATE: orders[4].toLocaleDateString('he-IL').split('').join(''),
                STATUS: orders[5]
            }
            array.push(obj)
        })
        return response.status(200).json(array);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}

async function getAllOrderItemForUser(req, response) {
    const db = await connection();
    let user= [req.query.USERNAME];
    db.execute("SELECT * FROM orders WHERE USERNAME= :1", user ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders for " +user+" is not found" });
    }
    if (!err) {
        let array =[];
        res.rows.map((orders) => {
            let obj = {
                USERNAME: orders[0], 
                NAMEITEM: orders[1],
                S_N: orders[2],
                BORROW_DATE: orders[3].toLocaleDateString('he-IL').split('').join(''),
                RETURN_DATE: orders[4].toLocaleDateString('he-IL').split('').join(''),
                STATUS: orders[5],
                DAYS : getDays(orders[3].toLocaleDateString('he-IL').split('').join(''),orders[4].toLocaleDateString('he-IL').split('').join(''))
            }
            array.push(obj)
        })
        return response.status(200).json(array);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}

async function getOrderAcceptForUser(req, response) {
    const db = await connection();
    let user= [req.query.USERNAME];
    db.execute("SELECT * FROM orders WHERE USERNAME= :1 AND STATUS_ORDER= 'Accept'", user ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders for " +user+" with Accept status is not found" });
    }
    if (!err) {
        let array =[];
        res.rows.map((orders) => {
            let obj = {
                USERNAME: orders[0], 
                NAMEITEM: orders[1],
                S_N: orders[2],
                BORROW_DATE: orders[3].toLocaleDateString('he-IL').split('').join(''),
                RETURN_DATE: orders[4].toLocaleDateString('he-IL').split('').join(''),
                STATUS: orders[5]
            }
            array.push(obj)
        })
        return response.status(200).json(array);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}


async function getAllOrderAccept(req, response) {
    const db = await connection();
    db.execute("SELECT * FROM orders WHERE STATUS_ORDER= 'Accept'",(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders with Accept status is not found" });
    }
    if (!err) {
        let array =[];
        res.rows.map((orders) => {
            let obj = {
                USERNAME: orders[0], 
                NAMEITEM: orders[1],
                S_N: orders[2],
                BORROW_DATE: orders[3].toLocaleDateString('he-IL').split('').join(''),
                RETURN_DATE: orders[4].toLocaleDateString('he-IL').split('').join(''),
                STATUS: orders[5]
            }
            array.push(obj)
        })
        return response.status(200).json(array);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}


async function getOrderForStatus(req, response) {
    const db = await connection();
    let status= [req.query.STATUS_ORDER];
    db.execute("SELECT * FROM orders WHERE STATUS_ORDER= :1", status ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders with '" +status+ "' status is not found" });
    }
    if (!err) {
        console.log(status);
        let array =[];
        res.rows.map((orders) => {
            let obj = {
                USERNAME: orders[0], 
                NAMEITEM: orders[1],
                S_N: orders[2],
                BORROW_DATE: orders[3].toLocaleDateString('he-IL').split('').join(''),
                RETURN_DATE: orders[4].toLocaleDateString('he-IL').split('').join(''),
                STATUS: orders[5]
            }
            array.push(obj)
        })
        return response.status(200).json(array);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}

function getDays(borrow, ret) {
    borrow = borrow.split('.')[2]+"/"+borrow.split('.')[1]+"/"+borrow.split('.')[0];
    console.log(borrow);
    ret = ret.split('.')[2]+"/"+ret.split('.')[1]+"/"+ret.split('.')[0];
    console.log(ret);
  const a = new Date(borrow),
      b = new Date(ret),
      difference = dateDiffInDays(a, b);

  return difference;
}


function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC( a.getFullYear(), a.getMonth(),a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(),b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  

module.exports = { router};