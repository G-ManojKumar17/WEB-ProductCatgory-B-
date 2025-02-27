const sql = require('mysql2')
const db = require('../Database/db');

const getCategories = (req,res) => {
    const sql = `select * from categories` 
    db.query(sql,(err,data)=>{
        if(err){
            console.log("</ get> Error:", err);
        }
        else{
            res.send(data)
        }
    })
}

const addCategories =  (req,res)=>{
    const incomming = req.body;
    // console.log(incomming)           //debugging
    const sql = `INSERT INTO categories (c_name) VALUES ('${incomming.c_name}')`;
    // console.log(sql)                 //deugging
    db.query(sql,(err,data)=>{
        if(err){
            console.log("</ addCategories> Error:", err);
        }
        else{
            res.status(200).json({ message: "Category added", category: data });
        }    
    })
}

const updateCategories = (req,res) => {
    const c_id = req.params.c_id;
    const incomming = req.body;
    // console.log("Updating Data:",incomming);     debgging
    const sql = `Update categories set c_name = '${incomming.c_name}' where c_id = ?`
    db.query(sql,[c_id],(err,data)=>{
        if(err){
            console.log("</ updateCategories> Error:", err);
        }
        else{
            res.json({ message: "Category Updated Successfully" });  

        } 
    })
}

const deleteCategories = (req,res) => {
    const incomming = req.params.c_id;
    console.log(incomming)
    const sql = `delete from categories where c_id = ?`
    db.query(sql,[incomming],(err,data)=>{
        if(err){
            console.log("</ deleteCategories> Error:", err);
        }
        else{
            res.json({ message: "Category Deleted Successfully" });  
        } 
    })
}

module.exports = {getCategories,addCategories,updateCategories,deleteCategories}
