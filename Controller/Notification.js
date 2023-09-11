const connection = require('../mySQL');
const express = require('express');
const router = express.Router();

router.get('/CheckDate', CheckDate);
router.get('/getAllNotiForUser', getAllNotiForUser);
router.get('/getAllNotiForManager', getAllNotiForManager);
router.get('/getNotReadNotiForUser', getNotReadNotiForUser);
router.get('/getAllNoti', getAllNoti);
router.get('/getNotReadNotiForManager', getNotReadNotiForManager);
router.get('/getNumberNotReadNotiForUser', getNumberNotReadNotiForUser);
router.get('/getNumberNotReadNoti', getNumberNotReadNoti);
router.post('/UpdateToRead', UpdateToRead);

async function getAllNotiForUser(req, response) {
    const db = await connection();
    let user= [req.query.USERNAME];
    db.execute("SELECT * FROM notifications WHERE association= :1", user ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders for " +user+" is not found" });
    }
    if (!err) {
        let array =[];
        res.rows.map((notification) => {
            let obj = {
                DESCRIPTION: notification[0], 
                READ: notification[2]
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

async function getAllNotiForManager(req, response) {
    const db = await connection();
    db.execute("SELECT * FROM notifications WHERE association= 'StorgeManger'" ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders for StorgeManger is not found" });
    }
    if (!err) {
        let array =[];
        res.rows.map((notification) => {
            let obj = {
                DESCRIPTION: notification[0], 
                READ: notification[2]
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

async function getNotReadNotiForUser(req, response) {
    const db = await connection();
    let user= [req.query.USERNAME];
    db.execute("SELECT * FROM notifications WHERE association= :1 AND read= 'NO'", user ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders for " +user+" is not found" });
    }
    if (!err) {
        let array =[];
        res.rows.map((notification) => {
            let obj = {
                DESCRIPTION: notification[0], 
                READ: notification[2]
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

async function CheckDate(req, response) {
    const db = await connection();
    const date = new Date();
    let sql = `SELECT * FROM orders WHERE BORROW_DATE <= :1`;
    let orders = await db.execute(sql,[date] );
    for(let i = 0; i<orders.rows.length; i++)
    {
        let number = getDays(date.toLocaleDateString('he-IL').split('').join(''), orders.rows[i][4].toLocaleDateString('he-IL').split('').join(''));
        if(number <= 7 && number >0)
        {
            sql = `INSERT INTO notifications (DESCRIPTION, ASSOCIATION) VALUES(:1, :2)`;
            let description = "Reminder: There are " +number+" days left to return an item '" + orders.rows[i][1] + "' with the serial number : '" + orders.rows[i][2]+"'"; 
            db.execute(sql,[description,orders.rows[i][0]] ,  (err, res) => {
            if (err) 
            {
                console.log(err);
                return response.status(400).json({ message: "failed add notification" });
            }
            });
        } else if(number == 0)
        {
            sql = `INSERT INTO notifications (DESCRIPTION, ASSOCIATION) VALUES(:1, :2)`;
            let description = "Today is the last day to return the item '" + orders.rows[i][1] + "' with the serial number : '" + orders.rows[i][2]+"'"; 
            db.execute(sql,[description,orders.rows[i][0]] ,  (err, res) => {
            if (err) 
            {
                console.log(err);
                return response.status(400).json({ message: "failed add notification" });
            }
            });
        }else if(number<0)
        {
            sql = `INSERT INTO notifications (DESCRIPTION, ASSOCIATION) VALUES(:1, :2)`;
            let description = "You are "+number*-1+" days late in returning an item '" + orders.rows[i][1] + "' with the serial number : '" + orders.rows[i][2]+"' , please return it immediately!!!"; 
            db.execute(sql,[description,orders.rows[i][0]] ,  (err, res) => {
            if (err) 
            {
                console.log(err);
                return response.status(400).json({ message: "failed add notification" });
            }
            });
            sql = `INSERT INTO notifications (DESCRIPTION, ASSOCIATION) VALUES(:1, :2)`;
            description = orders.rows[i][0]+" is "+number*-1+" days late in returning an item '" + orders.rows[i][1] + "' with the serial number : '" + orders.rows[i][2]+"'"; 
            db.execute(sql,[description,"StorgeManger"] ,  (err, res) => {
            if (err) 
            {
                console.log(err);
                return response.status(400).json({ message: "failed add notification" });
            }
            });
        }
    }
    return response.status(200).json({ message: "ok" });
}

function getDays(borrow, ret) {
    borrow = borrow.split('.')[2]+"/"+borrow.split('.')[1]+"/"+borrow.split('.')[0];
    ret = ret.split('.')[2]+"/"+ret.split('.')[1]+"/"+ret.split('.')[0];
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
  

  async function getAllNoti(req, response) {
    const db = await connection();
    db.execute("SELECT * FROM notifications" ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "notification is not found" });
    }
    if (!err) {
            let array =[];
            res.rows.map((notification) => {
                let obj = {
                    DESCRIPTION: notification[0], 
                    ASSOCIATION: notification[1],
                    READ: notification[2]
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

async function getNotReadNotiForManager(req, response) {
    const db = await connection();
    db.execute("SELECT * FROM notifications WHERE association= 'StorgeManger' AND read= 'NO'" ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders for StorgeManger is not found" });
    }
    if (!err) {
        let array =[];
        res.rows.map((notification) => {
            let obj = {
                DESCRIPTION: notification[0], 
                READ: notification[2]
            }
            array.push(obj)
        })
        return response.status(200).json(array);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" })
        }
});
}

async function getNumberNotReadNotiForUser(req, response) {
    const db = await connection();
    let user= [req.query.USERNAME];
    db.execute("SELECT COUNT(*) FROM notifications WHERE association= :1 AND read= 'NO'", user ,(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders for " +user+" is not found" });
    }
    if (!err) {
        return response.status(200).json(res.rows[0][0]);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
}
});
}

async function getNumberNotReadNoti(req, response) {
    const db = await connection();
    db.execute("SELECT COUNT(*) FROM notifications WHERE read= 'NO'", (err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "Orders for " +user+" is not found" });
    }
    if (!err) {
        return response.status(200).json(res.rows[0][0]);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}

async function UpdateToRead(req, response) {
    const db = await connection();
    let user = [req.body.ASSOCIATION];
    db.execute("UPDATE notifications SET READ= 'YES' WHERE ASSOCIATION= :1", user ,(err, res)=> {
    if (res.rowsAffected == 0) {
        return response.status(400).json({ message: "This notification is unavailable" });
    }
    if (!err) {
        response.status(200).json({ message: "update successfully!" });
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}
module.exports = { router};









