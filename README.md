# Bamazon



## Getting Started





### Using bamazonCustomer.js

Running bamazonCustomer.js in node will start a CLI storefront that allows you to purchase products.

The user will be presented with a list of products offered by the store.

![Bamazon1](/images/Bamazon1.png)

Select the corresponding number to chose your product.  You will then be prompted to input the amount of the product you would like to purchase. A prompt asking if this is the correct amount will pop up.  Input Y for yes and N for no. It is important that you are positive this is the correct amount as the order will placed and you will not be able to cancel it.  If your order is correct and there is enough available stock to complete your order you will be notified of total amount and the order will be entered.

![Bamazon2](/images/Bamazon2.png)

### Using bamazonManager.js

Running bamazonManager.js in node will the user to run a few different commands to check on and update the store database

#### View Products for Sale

Shows you all the information of the products in the database in this order

item_id|Product|Department|Price|Stock

![Bamazon3](/images/Bamazon3.png)


#### View Low Inventory

Shows you all products that have stock less than or equal to 5

![Bamazon4](/images/Bamazon4.png)

#### Add to Inventory

Allows you to add inventory to your stock. You are prompted to enter the id of the product. If you do not know the id use View Products for Sale to check.  After entering the id you will be prompted to enter how much stock you would like to add.

![Bamazon5](/images/Bamazon5.png)

#### Add New Products

Allows you to add new products to the store.  You will be prompted to enter the product name, department, price, and quantity.

![Bamazon6](/images/Bamazon6.png)