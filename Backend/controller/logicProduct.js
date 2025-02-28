const sql = require('mysql2')
const db = require('../Database/db');

const getProduct = (req, res) => { 
    let page = parseInt(req.query.page) || 1;  // Default to page 1
    let limit = parseInt(req.query.limit) || 10;  // Default limit to 4 per page
    let offset = (page - 1) * limit;

    // Get paginated products
    const sql = `SELECT * FROM products LIMIT ? OFFSET ?`;
    
    // Count total products
    const countSql = `SELECT COUNT(*) AS total FROM products`;

    db.query(sql, [limit, offset], (err, data) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ error: "Database error" });
        }

        db.query(countSql, (err, countResult) => {
            if (err) {
                console.error("Error fetching product count:", err);
                return res.status(500).json({ error: "Database error" });
            }

            let totalRecords = countResult[0].total;
            let totalPages = Math.ceil(totalRecords / limit);

            res.json({
                products: data,
                currentPage: page,
                totalPages: totalPages,
                totalRecords: totalRecords
            });
        });
    });
};


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
