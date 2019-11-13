# Bamazon

Bamazon is a node-based model of a retailer's database. Using a SQL database and the Node MySQL package, three Node scripts model the typical interactions of a customer, a store manager, and a store supervisor.

## Getting Started

### Installing

To install Bamazon clone this repo
```
git clone git@github.com:jwmann13/bamazon.git
```

### Prerequisites

Bamazon requires three node packages that are included in the package.json. ```npm install``` will download the appropriate packages. However, if for some reason the package.json does not include the appropriate dependecies run:
```
npm install mysql
npm install inquirer
npm install easy-table
```

* mysql interfaces with the sql database
* inquirer allows user prompts through the console
* easy-table creates easily readable tables to print to the console

## Features

Bamazon runs through node and offers features for three different kinds of users:

```
node bamazonCustomer
```
bamazonCustomer.js displays a table of all products and prompts the user to pick the id of the product the want to buy. Another prompt asks the user to enter a quantity of their item and finally the user is shown the total of the order and the connection closes.

```
node bamazonManager
```
bamazonManager.js prompts the user with four choices and an exit command. The "View Products for Sale" command prints a table of all the available products' names, departments, price, stock quantity, and sales. The "View Low Inventory" command prints all items with a stock quantity below 5. The "Add to Inventory" command allows the user to add more stock of a particular item. The "Add New Product" command allows the user to create a new product and add it to the database.

```
node bamazonSupervisor
```
bamazonSupervisor.js prompts the user with two choices and an exit command. The "View Product Sales by Department" command shows the user a table with the names, overhead costs, sales, and profits of each each department. The "Create New Department" command allows the user to create a new department to add to the database.
**(note: bamazonSupervisor is not fully functional yet)**

## Authors

* __Jeffrey Mann__ - all contributions

## License

This project is licensed under the MIT License

Copyright 2019 Jeffrey Mann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.