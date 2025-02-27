const sql = require('mysql2')
const db = require('../Database/db');

const getProduct = (req,res) => {
    const sql = `select * from products` 
    db.query(sql,(err,data)=>{
        if(err){
            console.log("</ get product> Error:", err);
        }
        else{
            res.send(data)
        }
    })
}

const addProduct =  (req,res)=>{
    const incomming = req.body;
    // console.log(incomming)                   //debugging
    const sql = `INSERT INTO products (p_name,c_id,c_name) VALUES ('${incomming.p_name}',${incomming.c_id},'${incomming.c_name}')`;
    // console.log(sql)                         //debugging
    db.query(sql,(err,data)=>{
        if(err){
            console.log("</ addProducts> Error:", err);
        }
        else{
            res.status(200).json({ message: "Category added", category: data });
        }    
    })
}

const updateProduct = (req,res) => {
    const incomming = req.body;
    // console.log("Updating Data:",incomming)  //debugging
    const sql = `Update products set p_name = '${incomming.p_name}', c_id = ${incomming.c_id}, c_name = '${incomming.c_name}' where p_id = ?`
    db.query(sql,[incomming.p_id],(err,data)=>{
        if(err){
            console.log("</ updateProducts> Error:", err);
        }
        else{
            res.json({ message: "Category Updated Successfully" });  
        } 
    })
}

const deleteProduct = (req,res) => {
    const p_id = req.params.p_id;
    // console.log(p_id)                        //debugging
    const sql = `delete from products where p_id = ?`
    db.query(sql,[p_id],(err,data)=>{
        if(err){
            console.log("</ deleteProducts> Error:", err);
        }
        else{
            res.send("Product deleted")
        } 
    })
}

module.exports = {getProduct,addProduct,updateProduct,deleteProduct}
