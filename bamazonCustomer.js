const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("easy-table");

const PORT = process.env.PORT || 3306

let connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: PORT,

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
});

function afterConnection() {
    let t = new Table();

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(item => {
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    const element = item[key];
                    t.cell(key, element);
                }
            }
            t.newRow();
        })
        console.log('\n' + t.toString() + '\n');
        propmtID();
    });
}

function propmtID() {
    inquirer.prompt([{
        name: "customerID",
        message: "Please choose the ID of the item you would like to purchase"
    }]).then(response => pickItem(parseInt(response.customerID)))
}

function pickItem(id) {
    let t = new Table();

    connection.query("SELECT * FROM products WHERE item_id=?", [id], (err, response) => {
        if (err) throw err;

        response.forEach(item => {
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    const element = item[key];
                    t.cell(key, element);
                }
            }
            t.newRow();
            console.log('\n' + t.toString());
        });

        promptQuantity(connection.escape(id));
    });
}

function promptQuantity(id) {
    inquirer.prompt([{
        name: "customerQuantity",
        message: "How many would you like?"
    }]).then(response => updateQuantity(response.customerQuantity, id));
}

function updateQuantity(quantity, id) {
    let t = new Table();

    connection.query("SELECT * FROM products WHERE item_id=?", [id], (err, selectRes) => {
        if (err) throw err;
        let queryStr = `UPDATE products SET stock_quantity = stock_quantity - ${connection.escape(quantity)}, product_sales = price * ${connection.escape(quantity)} WHERE item_id = ${connection.escape(id)}`;
        // console.log(selectRes)

        if (selectRes[0].stock_quantity - quantity > 0) {
            connection.query(queryStr, (err, updateRes) => {
                if (err) throw err;
                // console.log(updateRes);
                
            });

            console.log(`Your order total is: $${parseFloat(selectRes[0].price).toFixed(2) * quantity}`)
            // selectRes.forEach(item => {
            //     for (const key in item) {
            //         if (item.hasOwnProperty(key)){
            //             t.cell(key, item[key]);
            //         }
            //     }
            // });
            // t.newRow();
            // console.log(t.toString());

            connection.end();
        } else {
            console.log("There is not enough stock of that item to fulfill your order!");
            propmtID();
        }
    })
}

class Transaction {
    constructor() {
        this.item = null;
    }
}