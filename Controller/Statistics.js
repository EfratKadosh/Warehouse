const connection = require('../mySQL');
const express = require('express');
const router = express.Router();

router.get('/getNumberOfOrdersCategory', getNumberOfOrdersCategory);
router.get('/getNumberAllOrdersPS', getNumberAllOrdersPS);
router.get('/getNumberOfAllFaulty', getNumberOfAllFaulty);
router.get('/getNumberOfFaultyCategory', getNumberOfFaultyCategory);
router.get('/getNumberAllOrders', getNumberAllOrders);

async function getNumberOfOrdersCategory(req, response) {
    const db = await connection();
    let allorders = await db.execute("SELECT NAMEITEM,S_N FROM orders WHERE STATUS_ORDER= 'Accept'");
    let allcategory =  await db.execute("SELECT DISTINCT CATEGORY FROM items");
    db.execute("SELECT NAME,S_N,CATEGORY FROM ITEMS" ,(err, res)=> {
    let array =[];
    allcategory.rows.map((cat) => {
        let obj = {
            CATEGORY: cat[0], 
            NUMBER: 0
        }
        array.push(obj)
    })
    if (!err) {
        for(let i=0; i<allorders.rows.length; i++)
        {
            for(let k=0; k<res.rows.length; k++)
                if(allorders.rows[i][0] == res.rows[k][0] && allorders.rows[i][1]==res.rows[k][1])
                {
                    for(let j=0; j<array.length; j++)
                        if(array[j].CATEGORY==res.rows[k][2])
                            array[j].NUMBER++;
                }
        }
        return response.status(200).json(array);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
    }
    });
}

async function getNumberAllOrdersPS(req, response) {
    const db = await connection();
    db.execute("SELECT TYPE,COUNT(*) FROM studio_podcast_order WHERE STATUS='Accept' GROUP BY TYPE" ,(err, res)=> {
    if (!err) {
        let array =[];
        res.rows.map((orders) => {
            let obj = {
                TYPE: orders[0], 
                NUMBER: orders[1]
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

async function getNumberOfAllFaulty(req, response) {
    const db = await connection();
    db.execute("SELECT COUNT(*) FROM ITEMS WHERE STATUS= 'FAULTY'" ,(err, res)=> {
    if (!err) {
        return response.status(200).json(res.rows[0][0]);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
}
});
}

async function getNumberOfFaultyCategory(req, response) {
    const db = await connection();
    db.execute("SELECT CATEGORY,COUNT(*) FROM ITEMS WHERE STATUS= 'FAULTY' GROUP BY CATEGORY " ,(err, res)=> {
    if (!err) {
        let array =[];
        res.rows.map((items) => {
            let obj = {
                CATEGORY: items[0], 
                NUMBER: items[1]
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

async function getNumberAllOrders(req, response) {
    const db = await connection();
    db.execute("SELECT COUNT(*) FROM orders WHERE STATUS_ORDER='Accept'" ,(err, res)=> {
    if (!err) {
        return response.status(200).json(res.rows[0][0]);
    } else {
            console.log(err);
            response.status(400).json({ message: "Somting went wrong" });
}
});
}

module.exports = { router};