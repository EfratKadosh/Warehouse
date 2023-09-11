const connection = require('../mySQL');
const express = require('express');
const router = express.Router();

router.post('/login', login);
router.post('/register', addUser);
router.get('/watchUsers', getAllUsers);
router.get('/watchUser', getUser);


async function login(req, response) {
    const db = await connection();
    db.execute('select * from users where email = :1', [req.body.EMAIL], (err, res) => {
        if (res && res.rows[0]) {
            if (res.rows[0][2]==req.body.EMAIL && res.rows[0][6]==req.body.PASSWORD) {            
                response.status(200).contentType('application/json').json({
                    "message": "login ok!",
                    "data" :{
                        USERNAME: res.rows[0][5],
                        TITLE: res.rows[0][4],
                        EMAIL: res.rows[0][2]
                    },
                })
            }
            else {
                response.status(400).contentType('application/json').json({
                    "message": "Wrong email or password"
                })
            }
        }
        else {
            response.status(400).contentType('application/json').json({
                "message": "Wrong email or password"
            })
        }
    })
}

async function addUser(req, response) {
    const db = await connection();
    let userObj = req.body;
    let sql = `INSERT INTO users (FIRSTNAME, LASTNAME, EMAIL, BIRTHDAY, USERNAME,  PASSWORD) 
            VALUES(:1,:2, :3, :4, :5, :6)`;

    let values = [
        userObj.FIRSTNAME,
        userObj.LASTNAME,
        userObj.EMAIL,
        userObj.BIRTHDAY,
        userObj.USERNAME,
        userObj.PASSWORD
    ];

    db.execute(sql, values,  (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({flag:0, message: "Existing username or existing email" });
        } else {
            console.log(res)
            if (res.rowsAffected > 0) {
                return response.json({flag:1, message: "New user created successfully" });
            } else {
                return response.status(400).json({ flag:0, message: "Something went wrong" });
            }
        }
    });

}


async function getAllUsers(req, response) {
    const db = await connection();
    db.execute('select * from users', [] ,(err, res) => {

    if (res.rows.length == 0) {
        return response.status(400).json({ message: "no" });
    }
        if (!err) {
            let array = [];
           for(let i=0;i<res.rows.length;i++)
            {
                let obj = { firstname: res.rows[i][0], lastname: res.rows[i][1], email:  res.rows[i][2],birthday:  res.rows[i][3], title:  res.rows[i][4],username: res.rows[i][5],password: res.rows[i][6] }
                array.push(obj);
            }
            return response.status(200).json(array);
        } else {
            console.log(err);
            response.status(400).json({ message: "Error" });
        }
    });
}


async function getUser(req, response) {
    const db = await connection();

    db.execute("select * from users where username= :1", [req.query.USERNAME],(err, res)=> {
    if (res.rows.length == 0) {
        return response.status(400).json({ message: "user is not found" });
    }
    if (!err) {
         response.json(res.rows)
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}

module.exports = { router};