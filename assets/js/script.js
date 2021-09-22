var apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

var nutritionUrl = "https://api.edamam.com/api/nutrition-details?app_id=e23b29e2&app_key=e8c537ddb283dff1d3f1c7b8621f15e0"
var recipeSearchEl = document.querySelector("#recipeSearch")
var yesButtonEl = document.querySelector("#yesButton")
var searchTerm = recipeSearchEl.value

    //event listener for yes button button
    var searchFunction = function() {
        yesButtonEl.addEventListener("click", function(event) {
   
        }
    )}



// OR ************
// just have a question & button asking if they feel like cooking today
// then give them a random recipe
// ****************

// display recipe 

// display nutrition info


fetch(apiUrl)

    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var measuredIngredients = []
        // if statement for meals to be defined
        //if else if no meals came back
        for (var i = 1; i < 20; i++) {
            var ingredientList = "strIngredient" + i 
            var measurementList = "strMeasure" + i
            var currentMeasurement = data.meals[0][measurementList]
            var currentIngredient = data.meals[0][ingredientList]
            if (currentIngredient === "") {
                // console.log(measuredIngredients)
                nutrition(measuredIngredients)
                return
            }
            else {
                var totalIngredient = currentMeasurement + " " + currentIngredient
                // console.log(totalIngredient)

                // create li element with each ingredient
                currentIngredient = document.createElement("li");

                currentIngredient.innerHTML=totalIngredient

                var ingT = document.querySelector("#ingList")

                ingT.appendChild(currentIngredient);

                measuredIngredients.push(totalIngredient);
                // console.log(measuredIngredients);
                
            }
        
            // Title & Instructions
            
            var titleData = data.meals[0]["strMeal"]
            var ingTitleEl = document.querySelector("#recipe-title")
            ingTitleEl.innerHTML=titleData
            var recipeInstruction = data.meals[0]["strInstructions"]
            var instructionEl = document.querySelector("#instructions")
            instructionEl.innerHTML = recipeInstruction
            console.log(data);
            // image, this code produces an image- however the image is repeated several times?
        
            var thumbnail = document.createElement("img")
            thumbnail.src = data.meals[0]["strMealThumb"]
            var imageEL = document.querySelector("#image-container")
        
            // imageEL.appendChild(thumbnail)
    
            //nutr info 
            
            //local storage savings
        }
           
        
        // console.log(measuredIngredients)
        nutrition(measuredIngredients)
    });
    

    var nutrition = function(measuredIngredients) {
        // console.log({measuredIngredients});
        fetch('https://api.edamam.com/api/nutrition-details?app_id=e23b29e2&app_key=e8c537ddb283dff1d3f1c7b8621f15e0', {
            method: 'POST',
            body: JSON.stringify({
                
                    "title": "Placeholder",
                    "ingr": measuredIngredients
                    })
                ,
            
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }) 
        .then(function(response) {
            return response.json();
        })
        .then(function(data){
            if(data.error) {
                // Error Handling
                console.log("Nutrition information is not available")
                var errorEl = document.querySelector("#nutriError")
                errorEl.classList.remove("hidden")
                return
            }
            else{
                // adding nutrition info
                var cals = Math.ceil(data.calories)
                var fat = Math.ceil(data.totalNutrients.FAT.quantity) + data.totalNutrients.FAT.unit
                var carbs = Math.ceil(data.totalNutrients.CHOCDF.quantity) + data.totalNutrients.CHOCDF.unit
                var cholest = Math.ceil(data.totalNutrients.CHOLE.quantity) + data.totalNutrients.CHOLE.unit
                var sugar = Math.ceil(data.totalNutrients.SUGAR.quantity) + data.totalNutrients.SUGAR.unit

                var caloriesEl = document.querySelector(".calories")
                var fatEl = document.querySelector(".fat")
                var carbsEl = document.querySelector(".carbs")
                var cholestEl = document.querySelector(".cholesterol")
                var sugarEl = document.querySelector(".sugar")

                caloriesEl.innerHTML = "Calories: " + cals
                fatEl.innerHTML = "Fat: " + fat
                carbsEl.innerHTML = "Carbs: " + carbs
                cholestEl.innerHTML = "Cholesterol: " + cholest
                sugarEl.innerHTML = "Sugar: " + sugar
            }

                // add data.calories value to div
                // there's a yield property (servings) - to get nutrition per serving - 
                // divide each value by the value of yield
            console.log({data})
        })

       
        
    }

    // load recipies function