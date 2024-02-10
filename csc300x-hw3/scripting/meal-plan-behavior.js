//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    //this creates an object for each recommended dish item on the recommeneded dish side of the screen, so that this information
    //can be displayed on the leam plan page as a div element. These objects are stored in an array.
    const foodItems = [
        {name: "Mangonada",  cost: 5.00 }, {name: "Cucumber Lime Agua Fresca",  cost: 5.00 }, {name: "Street Corn",  cost: 5.00 }, {name: "Chicken Sandwich", cost: 8.50}, 
        {name: "Veggie Dogs", cost: 3.50}, {name: "Turkey Burger", cost: 9.00}, {name: "Easy Plateau Pizza", cost: 21.95}, {name: "MockingBird Sing Pizza", cost: 21.95},
        {name: "Peach Cobbler with Ice Cream", cost: 5.95}
    ];

    //this creates an array to store the meal plan items that are added to the meal plan page
    const mealPlanPage = [];

    // function: updateFoodItems: this function updates the food items that are displayed on the recommended dish side of the webpage
    function updatefoodItems() {

        //fetch the html food container element in which the dishesto be displayed are held
        const foodContainer = document.getElementById('recommended-dishes');

        //loop through each dish that was added to the array 
        foodItems.forEach((dish, index) => {
            //create a div element for each dish
            const mealPlanItem = document.createElement('div');

            //add the div to the rec-dishes class
            mealPlanItem.classList.add('rec-dishes');

            //format the text to output the name and cost of the dish
            mealPlanItem.innerHTML = `
                <img class="photo" data-index="${index}" src="images/${dish.name.toLowerCase()}.jpg" alt="">
                <p>${dish.name} - $${dish.cost.toFixed(2)}</p>`;
            
            // attach an event listener to the dish's picture
            mealPlanItem.querySelector('.photo').addEventListener('click', function () {
                //add the dish to the meal plan page once it is clicked
                addTomealPlanPage(index);
            });

            // add the div to the food container
            foodContainer.appendChild(mealPlanItem);
        });
    }

    // function: updateMealPlanPage: this funciton updates the meal plan side of the page with the user's selections
    function updatemealPlanPage() {

        //fetch the container for the meal plan side of the page
        const mealPlanPageContainer = document.getElementById('meal-plan');

        //initialize the total cost to be zero
        let total = 0;

        //loop through the dishes that have been added to the meal plan page array, creating a new div element for each one
        mealPlanPage.forEach((order, index) => {
            const orderCost = document.createElement('div');

            //update the item to be in the meal-plan-item class
            orderCost.classList.add('meal-plan-item');

            //format the display for the html, adding buttons for adding or removing another item
            orderCost.innerHTML = `
                <p>${order.name} - $${order.cost.toFixed(2)}
                </p>
                <button class="remove-from-plan" data-index="${index}">Remove</button>
                <button class="add-another-order" data-index="${index}">Add Another Order</button>`;
            
            // Update total cost with the addition of the item
            total += order.cost;

            // add an event listener to the "remove" button for meal plan item, so that when it is clicked it can remove the item from the meal plan page and the total cost is updated
            orderCost.querySelector('.remove-from-plan').addEventListener('click', function () {
                removeFrommealPlanPage(index);
            });

            //add an event listener to the "add another order" button for the meal plan item, so that when it is clicked an additional quantity is added to the meal plan page and the total cost is updated
            orderCost.querySelector('.add-another-order').addEventListener('click', function () {
                addTomealPlanPage(order.originalIndex);
            });

            //add the meal plan item div element to the container on the html page
            mealPlanPageContainer.appendChild(orderCost);
        });

        // create a paragraph html element and inside display the total cost of the meal plan
        const totalElement = document.createElement('p');
        totalElement.innerHTML = `<strong>Total Cost:</strong> $${total.toFixed(2)}`;

        //add the element created for the total cost to the meal plan container on the page
        mealPlanPageContainer.appendChild(totalElement);
    }

    // function: addToMealPlanPage: this function adds a dish to the mealPLanPage array, and then calls the updateMealPlanPage function to update the page with the new addition
    function addTomealPlanPage(index) {

        //get the selected meal item from the array of food items
        const selectedDish = foodItems[index];

        //append this item to the end of the mealPlanPage array
        mealPlanPage.push({ ...selectedDish, originalIndex: index });

        // update the meal plan
        updatemealPlanPage();
    }

    // function: removefromMealPlanPage: this function removes a dish from the mealPlanPage array, and then calls the updateMealPlanPage function to update the page with its absence
    function removeFrommealPlanPage(index) {

        //remove the food item from the mealPlanPage array at the specified index
        mealPlanPage.splice(index, 1);

        //update the meal plan
        updatemealPlanPage();
    }

    // these functions initialize the page to keep everything up to date
    updatefoodItems();
    updatemealPlanPage();
});