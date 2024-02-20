//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    //this creates an object for each recommended dish item on the recommeneded dish side of the screen, so that this information
    //can be displayed on the leam plan page as a div element. These objects are stored in an array.
    const foodItems = [
        { name: "Mangonada", cost: 6.50 },
        { name: "Cucumber Lime Agua Fresca", cost: 5.99 },
        { name: "Street Corn",  cost: 7.50 },
        { name: "Chicken Sandwich", cost: 8.50}, 
        { name: "Veggie Dogs", cost: 3.50},
        { name: "Turkey Burger", cost: 9.00},
        { name: "Easy Plateau Pizza", cost: 21.95},
        { name: "Mockingbird Sing Pizza", cost: 21.95},
        { name: "Peach Cobbler with Ice Cream", cost: 5.95}
    ];

    //this creates an array to store the meal plan items that are added to the meal plan page
    const itemsAddedToMealPlan = [];

    // function: addDishToMealPlan: adds a dish to the meal plan side of the page
    function addDishToMealPlan(index) {
        //fetch the specified dish from the array of dishes
        const selectedDish = foodItems[index];

        //add a new dish to the meal plan page array for the selected dish
        itemsAddedToMealPlan.push({ ...selectedDish, originalIndex: index });

        //call this function to update the meal plan page with this change
        updateitemsAddedToMealPlan();
    }    

    // function: removeDishFromMealPlan: function to remove dish from the meal plan page
    function removeDishFromMealPlan(index) {

        //remove the specified dish from the meal plan page array
        itemsAddedToMealPlan.splice(index, 1);
        
        //call this function to update the meal plan page with this change
        updateitemsAddedToMealPlan();
    }

    // function: refreshMealPlanPage: this function updates the food items that are displayed on the recommended dish side of the webpage
    function refreshMealPlanPage() {

        //fetch the html container element in which the dishesto be displayed are held
        const dishRecsContainer = document.getElementById('recommended-dishes');

        //loop through each dish that was added to the array 
        foodItems.forEach((dish, index) => {

            //create a div element for each dish
            const recDishDiv = document.createElement('div');

            //add the div to the rec-dishes class
            recDishDiv.classList.add('rec-dishes');

            //format the text to output the name and cost of the dish
            recDishDiv.innerHTML = `
                <img class="photo" data-index="${index}" src="images/${dish.name.toLowerCase()}.jpg" alt="">
                <p>${dish.name}<br>
                    $${dish.cost.toFixed(2)}
                </p>`;
            
            // Add event listener to the dish's picture
            recDishDiv.querySelector('.photo').addEventListener('click', function () {
                addDishToMealPlan(index);
            });

            // add the div to the food container
            dishRecsContainer.appendChild(recDishDiv);
        });
    }

    // function: updateitemsAddedToMealPlan: this funciton updates the meal plan side of the page with the user's selections
    function updateitemsAddedToMealPlan() {
        // fetch the contaner for the meal plan part of the page
        const itemsAddedToMealPlanContainer = document.getElementById('meal-plan');

        //clear existing content
        itemsAddedToMealPlanContainer.innerHTML = "";

        //initialize total cost to zero
        let totalCost = 0;

        //iterate through the dishes in the meal plan array
        itemsAddedToMealPlan.forEach((order, index) => {

            //for each dish create a div element, and assign it to the meal-plan-item class
            const mealPlanItemDiv = document.createElement('div');
            mealPlanItemDiv.classList.add('meal-plan-item');
            
            //format the output of the html to display the name and cost of the dish
            mealPlanItemDiv.innerHTML = `
                <p>${order.name}<br>
                    $${order.cost.toFixed(2)}
                </p>
                <button class="remove-from-plan" data-index="${index}">Remove</button>
                <button class="add-another-order" data-index="${index}">Add Another Order</button>`;
            
            // Update total cost as an order is added to the meal plan
            totalCost += order.cost;

            // Add an event listener to the remove from plan button in the meal plan item div
            mealPlanItemDiv.querySelector('.remove-from-plan').addEventListener('click', function () {
                //when the button is clicked, call the function to remove the item from the meal plan
                removeDishFromMealPlan(index);
            });

            // add an event listener to the add another order button in the meal plan item div
            mealPlanItemDiv.querySelector('.add-another-order').addEventListener('click', function () {
                //when the button is clicked, call the funciton to add a duplicate order to the meal plan
                addDishToMealPlan(order.originalIndex);
            });

            // add this created div to the meal plan container
            itemsAddedToMealPlanContainer.appendChild(mealPlanItemDiv);
        });

        // Display total cost by creating a parapgrah html element, formatting text to go into it, and then adding it to the meal plan container
        const pElementForTotalCost = document.createElement('p');
        pElementForTotalCost.innerHTML = `<strong>Total Cost:</strong> $${totalCost.toFixed(2)}`;
        itemsAddedToMealPlanContainer.appendChild(pElementForTotalCost);
    }





    // these functions initialize the page to keep everything up to date
    refreshMealPlanPage();
    updateitemsAddedToMealPlan();
});