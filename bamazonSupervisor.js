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
    supervisor();
});

function supervisor() {
    inquirer.prompt([{
        name: "commands",
        type: "list",
        message: "options:",
        choices: ["View Product Sales by Department", "Create New Department", "EXIT"]
    }]).then(answer => {
        switch (answer.commands) {
            case "View Product Sales by Department":
                viewSales();
                break;

            case "Create New Department":
                createDepartment();
                break;

            case "EXIT":
                connection.end();
                break;

            default:
                break;
        }
    })
}

function viewSales() {
    let t = new Table();

    // delete contents of departments
    connection.query("DELETE FROM departments", (err1) => {
        if (err1) throw err1;

        // select departments from products
        connection.query("SELECT department_name FROM products", (err2, selectRes) => {
            if (err2) throw err2;

            // array for bespoke departments
            let eachDept = [];

            // iterate over response
            selectRes.forEach(item => {

                // if the department is not in the array
                if (!eachDept.includes(item.department_name)) {

                    // insert it as a new value in departments table
                    connection.query("INSERT INTO departments SET ?", {
                        department_id: null,
                        department_name: item.department_name,
                        over_head_costs: Math.floor(10000 * Math.random())
                    }, (err3) => {
                        if (err3) throw err3;
                        connection.query("SELECT * FROM departments", (err4, printRes) => {
                            if (err4) throw err4;
                            printRes.forEach(dept => {
                                for (const key in dept) {
                                    if (dept.hasOwnProperty(key)) {
                                        const element = dept[key];
                                        t.cell(key, element);
                                    }
                                }
                                t.newRow();
                            });
                            console.log(t.toString());
                        });
                    });

                    // add department name to array; results should only contain unique department names
                    eachDept.push(item.department_name);
                }
            });
        })
    });
}

function createDepartment() {

}