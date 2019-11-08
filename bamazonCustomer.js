const mysql = require("mysql");
const inquirer = require('inquirer');
const Table = require('easy-table');

let connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "docker",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
      afterConnection();
    propmtID();
});

function propmtID() {
    inquirer.prompt([{
        name: "customerID",
        message: "Please choose the ID of the item you would like to purchase"
    }]).then(response => pickItem(parseInt(response.customerID)))
}

function promptQuantity() {
    inquirer.prompt([{
        name: "customerQuantity",
        message: "How many would you like?"
    }]).then(response => pickQuantity(response.customerQuantity));
}

function pickItem(id) {
    let t = new Table();

    let query = connection.query("SELECT * FROM products WHERE item_id=?", [id], (err, response) => {
        if (err) throw err;
        // console.log(`item_id | product_name | department_name | price | stock_quantity`);

        response.forEach(item => {
            t.cell('item_id', item.item_id);
            t.cell('product_name', item.product_name);
            t.cell('department_name', item.department_name);
            t.cell('price', parseFloat(item.price).toFixed(2));
            t.cell('stock_quantity', parseInt(item.stock_quantity))
            t.newRow();
            console.log('\n' + t.toString());
            // console.log(`${item.item_id} | ${item.product_name} | ${item.department_name} | ${} | ${parseInt(item.stock_quantity)}`);
        });
    });
    // console.log(query.sql);
    connection.end();
}

function pickQuantity(quantity) {
    
}

function afterConnection() {
    let t = new Table();

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(item => {
            t.cell('item_id', item.item_id);
            t.cell('product_name', item.product_name);
            t.cell('department_name', item.department_name);
            t.cell('price', parseFloat(item.price).toFixed(2));
            t.cell('stock_quantity', parseInt(item.stock_quantity))
            t.newRow();
        })
        console.log('\n' + t.toString() + '\n');
        // connection.end();
    });
}