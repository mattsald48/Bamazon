var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: ""
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  //console.log("Connection is good");
  start();
});


// function that gets the party started. Prompts user for the ID number of the product they would like to purchase 
function start() {

  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // goes through the database to print out all the products that are available
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            var idArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
              idArray.push(results[i].item_id);
      
            }
            return choiceArray;
          },
          message: "What item would you like to purchase?"
        },
    
        {
      	  name:"itemQuantity",
      	  type:"input",	
      	  message:"How many units would you like to buy?"
        }  

         ])
    		.then(function(answer) {
    			//console.log(answer.choice);
      			//console.log(answer.itemQuantity);
      			quantityCheck(answer.choice, answer.itemQuantity);
      			
   		});
 	});
}   


function quantityCheck(item, quantity){

	inquirer
      .prompt([
    
        {
      	  name:"confirm",
      	  type:"confirm",	
      	  message:"Your order amount is "+quantity+". Would you like to continue?"
        }  

         ]).then(function(answer) {
         	//if the customer is happy with the order amount the code will then check to see if the input was valid.  If valid it will check to see if there is enough in stock to complete order
         	if (answer.confirm == true){
         			connection.query("SELECT stock_quantity, item_id, price FROM products WHERE product_name=?",[item], function(err, results){
					if(err) throw err;
						var currentQuantity = results[0].stock_quantity;
						var orderQuantity = Number(quantity);
						var id = results[0].item_id;
						var price = results[0].price;
						
						//console.log("Your order amount: "+orderQuantity);
						//console.log("Current stock: "+currentQuantity);
						//console.log("Item id: "+id);
						//console.log("The price of the item is: "+price)
					
					if(isNaN(orderQuantity) == true){
						console.log("That was not a valid number");
						start();
					}else if(orderQuantity > currentQuantity){
						console.log("We cannot process your order of "+orderQuantity+" units.  We currently have "+currentQuantity+" in stock.");
						start();
					}else if(orderQuantity <= currentQuantity){
						console.log("Your order is being processed.");
						updateDB(price, currentQuantity, orderQuantity, id);
					}
				});//end of connection.query
         	}else{
         		//starts from beginning if the custome felt the order was not suitable
         		start();
         	}
      			
   		});
    };     	



//updates the stock_quantity in the database
function updateDB(price, quantity, order, id){

	var updateQuantity = quantity - order;
	var total = price * order;
	//console.log(quantity+"-"+order+"="+updateQuantity);

	connection.query("UPDATE products SET stock_quantity =?  WHERE item_id =?",[updateQuantity, id], function(err, results){
			
			 console.log("Your order has been placed. Your total is "+total+".");
			 start();
	});//end of connection.query
};








