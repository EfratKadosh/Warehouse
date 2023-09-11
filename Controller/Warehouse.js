const connection = require('../mySQL');
const express = require('express');
const router = express.Router();

router.post('/add', addItem);
router.post('/UpdateItem', UpdateItem);
router.post('/deleteItem', deleteItem);
router.get('/watchItems', getAllItems);
router.get('/watchItemForCat', getItemForCat);
router.get('/watchItemForStatus', getItemForStatus);
router.get('/getsize', getSize);
router.get('/getAllPS', getStudiosAndPodcasts);
router.get('/getItemSort', getItemSort);


async function UpdateItem(req, response) {
    const db = await connection();
    let sql, val;
    let status = req.body.STATUS, item_name = req.body.NAME, item_sn= req.body.S_N, user= req.body.USERNAME, des_item= req.body.DESCRIPTION;
    sql = "SELECT TITLE FROM USERS WHERE USERNAME= :1"
    let title = await db.execute(sql,[user]);
    if(status == 'OUT')
    {
        let bor_date = req.body.BORROW_DATE;
        let ret_date = req.body.RETURN_DATE;
        sql = "UPDATE items SET status= :1, BORROW_DATE= :2, RETURN_DATE= :3 WHERE NAME= :4 AND S_N= :5";
        val = [status, bor_date, ret_date, item_name, item_sn];
    }
    else if(status == 'IN')
    {
        sql = "UPDATE items SET status= :1, BORROW_DATE= :2, RETURN_DATE= :3 WHERE NAME= :4 AND S_N= :5";
        val = [status, 'NULL' , 'NULL', item_name, item_sn];
    } else {
        sql = "UPDATE items SET status= :1, BORROW_DATE= :2, RETURN_DATE= :3,DESCRIPTION= :4  WHERE NAME= :5 AND S_N= :6";
        val = [status, 'NULL' , 'NULL',des_item, item_name, item_sn];
    }
    db.execute(sql, val, (err, res) => {
        if (err) {
           return response.status(400).json({ message: "Something went wrong" });
        } else 
            if(res.rowsAffected > 0)
            {
                if(status == 'FAULTY' && title.rows[0][0]!="StorgeManger")
                {
                    let description = user + " has updated item '"+ item_name +"' with serial number '"+ item_sn +"' as a FAULT ";
                    sql = `INSERT INTO notifications (DESCRIPTION, ASSOCIATION) VALUES(:1, :2)`;
                    db.execute(sql,[description, "StorgeManger"] ,  (err, res) => {
                    if (err) {
                        console.log(err);
                        return response.status(400).json({ message: "Something went wrong" });
                        
                    }});
                }
                return response.status(200).json({ message: "update successfully!" });
       }
});
}

async function addItem(req, response) {
    const db = await connection();
    let itemObj = req.body;
    console.log(itemObj);
    let sql = `INSERT INTO items (NAME, S_N, CATEGORY, STATUS)
            VALUES( :1, :2, :3, :4)`;

    let values = [
        itemObj.NAME,
        itemObj.S_N,
        itemObj.CATEGORY,
        'IN'
    ];

    db.execute(sql, values,  (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json({ message: "ERROR" });
        } else {
            console.log(res)
            if (res.rowsAffected > 0) {
                return response.json({ message: "New item successfully added" });
            } else {
                return response.status(400).json({ message: "Something went wrong" });
            }
        }
    });

}

async function deleteItem(req, response) {
    const db = await connection();

    db.execute('DELETE FROM items WHERE NAME= :1 AND S_N= :2', [req.body.NAME, req.body.S_N], (err, res) => {
        if (err) {
            response.status(400).json({ message: "Something went wrong" ,status:400});
        } else {
            response.status(200).json({ message: "delete successfully!",status:200});
        }
    });
}

async function getSize(req, response){
    const db = await connection();
    let sql = "SELECT COUNT(*) FROM " + [req.query.table];
    db.execute(sql, [],(err, res)=> {
        if (!err) {
             response.json(res.rows[0][0])
        } else {
                console.log(err);
                response.status(400).json({ message: "Somting went wrong" });
        }
        });
    }

    async function getAllItems(req, response) {
        const db = await connection();
        db.execute('select * from items' ,[], (err, res) => {
        console.log(res);
        if (res.rows.length == 0) {
            return response.status(400).json({ message: "no" });
        }
            if (!err) {
                let array = [];
                res.rows.map((items) => {
                    let obj = { name: items[0],
                        s_n: items[1], 
                        category:  items[2], 
                        ancillary_items:  items[3], 
                        amount: items[4], 
                        status: items[5], 
                        precautions: items[6], 
                        borrow_date: items[7], 
                        return_date: items[8], 
                        description: items[9]}
                    array.push(obj);
                })
                return response.status(200).json(array);
            } else {
                console.log(err);
                response.status(400).json({ message: "Error" });
            }
        });
    }

    async function getItemForCat(req, response) {
        const db = await connection();
    
        db.execute("select * from items where CATEGORY= :1", [req.query.CATEGORY],(err, res)=> {
        if (res.rows.length == 0) {
            return response.status(400).json({ message: "category is not found" });
        }
        if (!err) {
            let array = [];
            res.rows.map((items) => {
                let obj = { name: items[0],
                    s_n: items[1], 
                    category:  items[2], 
                    ancillary_items:  items[3], 
                    amount: items[4], 
                    status: items[5], 
                    precautions: items[6], 
                    borrow_date: items[7], 
                    return_date: items[8], 
                    description: items[9]}
                array.push(obj);
            })
            return response.status(200).json(array);
        } else {
                console.log(err);
                response.status(400).json({ message: "Sometihng went wrong" });
        }
        });
    }

    async function getItemForStatus(req, response) {
        const db = await connection();
        let status= [req.query.STATUS];
        db.execute("SELECT * FROM items WHERE STATUS= :1", status ,(err, res)=> {
        if (res.rows.length == 0) {
            return response.status(400).json({ message: "items " +status+" is not found" });
        }
        if (!err) {
            let array = [];
            res.rows.map((items) => {
                let obj = { name: items[0],
                    s_n: items[1], 
                    category:  items[2], 
                    ancillary_items:  items[3], 
                    amount: items[4], 
                    status: items[5], 
                    precautions: items[6], 
                    borrow_date: items[7], 
                    return_date: items[8], 
                    description: items[9]}
                array.push(obj);
            })
            return response.status(200).json(array);
        } else {
                console.log(err);
                response.status(400).json({ message: "Somting went wrong" });
        }
        });
    }
    async function getStudiosAndPodcasts(req, response) {
        const db = await connection();
        db.execute('select * from studio_podcast' , (err, res) => {
        console.log(res);
        if (res.rows.length == 0) {
            return response.status(400).json({ message: "Somting went wrong" });
        }
        if (!err) {
            let array = [];
            res.rows.map((PS) => {
                let obj = {
                    TYPE: PS[0],
                    NUM: PS[1]
                }
                array.push(obj)
            })
            return response.status(200).json(array);
        } else {
            console.log(err);
            response.status(400).json({ message: "Error" });
        }
    });
    }

    async function getItemSort(req, response) {
        const db = await connection();
        db.execute('SELECT * FROM items' , (err, res) => {
        console.log(res);
        if (res.rows.length == 0) {
            return response.status(400).json({ message: "Somting went wrong" });
        }
        if (!err) {
            let array = [];
            res.rows.map((items) => {
                array.push(items)
            })
        c=0; // for the example, set c to sort the first column.
        array.sort (function (a, b) 
                    {
                        if (a[c] === b[c]) 
                        {
                            return 0;
                        } else {
                            return (a[c] < b[c]) ? -1 : 1;
                        }});
            console.log(array);
            return response.status(200).json(array);
        } else {
            console.log(err);
            response.status(400).json({ message: "Error" });
        }
    });
    }
module.exports = { router};