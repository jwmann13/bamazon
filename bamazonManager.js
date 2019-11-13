const mysql = require('mysql');
const inquirer = require('inquirer');
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
    manager();
});

function manager() {

    inquirer.prompt({
        name: "commands",
        type: "list",
        message: "options:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
    }).then((answer => {
        switch (answer.commands) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addItem();
                break;

            case "EXIT":
                connection.end();
                break;

            default:
                break;
        }
    }))
}

function viewProducts() {
    let t = new Table();

    connection.query("SELECT * FROM products", (err, res) => {
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
        manager();
    });
}

function viewLowInventory() {
    let t = new Table();

    connection.query("SELECT * FROM products WHERE stock_quantity < 5", (err, res) => {
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
        console.log(t.toString());
        manager();
    })
}

function addInventory() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Which item would you like to add inventory?"
    }, {
        name: "amount",
        type: "input",
        message: "How much would you like to add?"
    }]).then(answer => {
        connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${connection.escape(answer.amount)} WHERE item_id = ${connection.escape(answer.item)}`, (err, res) => {
            if (err) throw err;
            console.log('inventory updated!');
            manager();
        })
    })
}

function addItem() {
    inquirer.prompt([{
        name: "product_name",
        type: "input",
        message: "What is the item you would like to add?",
    }, {
        name: "department_name",
        type: "input",
        message: "What department is that item in?"
    }, {
        name: "price",
        type: "input",
        message: "What is the unit price of the item?"
    }, {
        name: "stock_quantity",
        type: "input",
        message: "How much of the item would you like to stock?",
        validate: (value) => {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then((answer) => {
        connection.query("INSERT INTO products SET ?", {
            product_name: answer.product_name,
            department_name: answer.department_name,
            price: parseFloat(answer.price).toFixed(2),
            stock_quantity: parseInt(answer.stock_quantity)
        }, (err) => {
            if (err) throw err;
            console.log('Item successfully added');
            manager();
        })
    })
}