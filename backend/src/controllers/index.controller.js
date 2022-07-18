const { Pool } = require('pg');
const { make } = require('simple-body-validator');


const pool = new Pool({
    connectionString: process.env.DATABASE_URL|| 'postgres://star_app:my-secret-pw@star_postgres:5432/star_db',
    ssl: process.env.DATABASE_URL ? true : false
})

const getProducts = async (req,res)=>{
    try
    {
        const response = await pool.query('SELECT id, name_product, description, price FROM star_products');
        res.status(200).json(response.rows);
    }
    catch(error){
        console.log(error);
        res.send("Error: "+error);
    }
};

const getProductById = async(req,res) => {
    const id = req.params.id;
    //Check if id is a number
    if(!isNaN(id)){
        try{
            const response = await pool.query('SELECT id, name_product, description, price FROM star_products WHERE id = $1',[id]);
            res.json(response.rows[0]);
        } catch(error){
            console.log(error);
            res.send("Error: "+error);
        }
    } else {
        res.send('No correct id provided');
    }
};

const getProductByName = async(req,res) => {
    const name_product = req.params.name;
    //Check if id is a number
    if(name_product){
        try{
            const response = await pool.query(`SELECT id, name_product, description, price FROM star_products WHERE name_product like '%'||$1||'%' `,[name_product]);
            res.json(response.rows);
        } catch(error){
            console.log(error);
            res.send("Error: "+error);
        }
    } else {
        res.send('Missing name of product');
    }
};

const createProduct = async (req,res)=>{
    const {name_product, description, price} = req.body;
    //We add all the rules on the creation of the product
    const rules = {
        name_product: 'required|string|min:3|max:100',
        description: 'required|string|min:5|max:1000',
        price: 'required|integer|min:1|max:20000'
    };

    const validator = make(req.body, rules);
    
    if (! validator.validate()) {
        console.log('Errors: ', validator.errors().all());
        res.status(422).json(validator.errors().all());
        //res.send('No data provided');
    } else {
        try{
            const response = await pool.query('INSERT INTO star_products(name_product, description, price) VALUES($1,$2,$3)',[name_product, description, price]);
            console.log(response);
            res.json('Product created successfully');
        } catch(error){
            console.log(error);
            res.send("Error: "+error);
        }
    }


};

const deleteProduct = async(req,res) =>{
    
    const id = req.params.id;
    if(!isNaN(id)){
        try{
            const response = await pool.query('DELETE FROM star_products WHERE id = $1',[id]);
            console.log(response);
            res.json(`Product with id ${id} was deleted successfully`);
        } catch(error){
            console.log(error);
            res.send('Error: '+error);
        }
    } else {
        res.send('No correct id provided');
    }
    
};

const updateProduct = async(req,res) => {
    //const id = req.params.id;
    const {id, name_product, description, price} = req.body;
    const rules = {
        id: 'required|integer',
        name_product: 'required|string|min:3|max:100',
        description: 'required|string|min:5|max:1000',
        price: 'required|integer|min:1|max:20000'
    };

    const validator = make(req.body, rules);
    
    if (! validator.validate()) {
        console.log('Errors: ', validator.errors().all());
        res.status(422).json(validator.errors().all());
    } else {
        try{
            const response = await pool.query('UPDATE star_products SET name_product = $1, description = $2, price = $3 WHERE id = $4',[name_product, description, price, id]);
            console.log(response);
            res.json(`Product with id ${id} was updated successfully`);
        } catch(error){
            console.log(error);
            res.send('Error: '+error);
        }
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
    getProductByName
}