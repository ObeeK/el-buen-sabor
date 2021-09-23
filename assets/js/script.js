var apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

var nutritionUrl = "https://api.edamam.com/api/nutrition-details?app_id=e23b29e2&app_key=e8c537ddb283dff1d3f1c7b8621f15e0"
var yesButtonEl = document.querySelector("#btn1")
var noButtonEl = document.querySelector("#btn2")
var recipeEl = document.querySelector("#recipeContainer")
var nutriEl = document.querySelector("#nutrition-info")
var question= document.querySelector("#question")
    //event listener for yes button button
        yesButtonEl.addEventListener("click", function(event) {
            event.preventDefault()
            yesButtonEl.classList.add('hidden')
            noButtonEl.classList.add('hidden')
            question.classList.add('hidden')
            recipeEl.classList.remove('hidden')
            nutriEl.classList.remove('hidden')
            kitchen.innerHTML=""
            // qContainer = classList.add('hidden')
           

        }
    );

    noButtonEl.addEventListener("click", function(event) {
        event.preventDefault()
        var kitchen = document.querySelector("#kitchen")
        kitchen.classList.remove("hidden")
        

    }
);



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
        var thumbnail = document.createElement("img")
            thumbnail.src = data.meals[0]["strMealThumb"]
            var imageEL = document.querySelector("#image-container")
        
            imageEL.appendChild(thumbnail)
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
            // fixed the above by moving it out of the for loop
            
    
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

                var caloriesEl = document.querySelector("#calories")
                var fatEl = document.querySelector("#fat")
                var carbsEl = document.querySelector("#carbs")
                var cholestEl = document.querySelector("#cholesterol")
                var sugarEl = document.querySelector("#sugar")

                caloriesEl.innerHTML = cals
                fatEl.innerHTML = fat
                carbsEl.innerHTML = carbs
                cholestEl.innerHTML = cholest
                sugarEl.innerHTML = sugar
            }

                // add data.calories value to div
                // there's a yield property (servings) - to get nutrition per serving - 
                // divide each value by the value of yield
            console.log({data})
        })

       
        
    }