var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({

	host: "localhost",
	port: 3306,

	user: "root",

	password: "",
	database: ""


});

connection.connect(function(err){

	if (err) throw err;
	console.log("Connection is good");
	start();

});


function start(){

	inquirer.
	   prompt([

	   {
	   	 name: "choices",
	   	 type: "list",
	   	 choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Products"],
	   	 message: "What would you like to do?"
	   }


	   	]).then(function(ans){
	   		
	   		if(ans.choices === "View Products for Sale"){
	   			//console.log("Under construction1");
	   			viewProducts();
	   		
	   		}else if(ans.choices === "View Low Inventory"){
	   			//console.log("Under construction2");
	   			viewLowInv();
	   				   		
	   		}else if(ans.choices === "Add to Inventory"){

	   			addInventory();

            }else if(ans.choices === "Add New Products"){
	   			//console.log("Under construction4");
	   			addProduct();
	   		};
	   });
};


function viewProducts(){

	connection.query("SELECT * FROM products", function(err, res){

		if (err) throw err;

		for(var i = 0; i < res.length; i++){
			console.log(res[i].item_id+" | "+res[i].product_name+" | "+res[i].department_name+" | "+ res[i].price+" | "+res[i].stock_quantity);
		};
		
		console.log("////////////////////////////////////////////////")
	    start();

	});
};

function viewLowInv(){

 connection.query("SELECT * FROM products WHERE stock_quantity <=?", [5], function(err, res){

 	if (err) throw err;
 	 console.log("");
	 for(var i = 0; i < res.length; i++){
	      console.log(res[i].item_id+" | "+res[i].product_name+" | "+res[i].department_name+" | "+ res[i].price+" | "+res[i].stock_quantity);
	   };
     console.log("//////////////////////////////////////////////////////");
     start();
   });
};

function addInventory(){
inquirer.
	prompt([
	    {
		  name: "itemID",
	      type: "input",
		  message: "What is the id of the product you want to add stock to?"
		},

		{
		 name: "amount",
		 type: "input",
		 message: "How much would you like to add?"
		}

	  ]).then(function(ans){

	   	    if((isNaN(ans.amount) || isNaN(ans.itemID)) === true){
				console.log("That was not a valid number");
			    start();
					   
			}else if((isNaN(ans.amount) && isNaN(ans.itemID)) === false){

	   	      connection.query("SELECT * FROM products", function(err, res){

			 	if (err) throw err;
				    //console.log(res[id-1].stock_quantity);
				    var requestedUpdate = Number(ans.amount);
				    var currentQuantity = res[ans.itemID-1].stock_quantity;
				    requestedUpdate += currentQuantity;

			    if(ans.itemID>res.length){
			    	console.log("You did not enter a valid id.");
			    
			    }else{
			    	connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [requestedUpdate, ans.itemID], function(err, res){
			    		if (err) throw err;
			    		console.log("Iventory is now at "+ requestedUpdate+".");
			    		console.log("//////////////////////////////////////////////////////////////")
			    		start();
      			});
    		};//end of else
  		 });
	  }//end of else if
  });//end of inquirer for "Add to inventory"
}//end of function

function addProduct(){

	inquirer.
	  prompt([

	  		{
	  		 name: "productName",
	  		 type: "input",
	  		 message: "What is the name of the product?"
	  		},

	  		{
	  		 name: "departmentName",
	  		 type:"input",
	  		 message: "What is the department of the product?"
	  		},

	  		{
	  		 name: "price",
	  		 type: "input",
	  		 message: "What is the price of the product?"
	  		},

	  		{
	  		 name: "stockQuantity",
	  		 type: "input",
	  		 message: "What is the number of stock?",
	  		 validate: function(value) {
          		if (isNaN(value) === false) {
            		return true;
          		}
          		return false;
        	  }
	  		},

	  	     ]).then(function(ans){
	  		
	  			connection.query("INSERT INTO products SET ?",
	  			   {
	  				product_name: ans.productName,
	  				department_name: ans.departmentName,
	  				price: ans.price,
	  				stock_quantity: ans.stockQuantity
                   },

                   function(err){
                   	if (err) throw err;
                   	console.log("Product was added succesfully.");
                   	start();
                   }
	  			);
	  	   });
   }//end of addProduct function