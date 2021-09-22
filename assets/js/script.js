var apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

var nutritionUrl = "https://api.edamam.com/api/nutrition-details?app_id=e23b29e2&app_key=e8c537ddb283dff1d3f1c7b8621f15e0"
var recipeSearchEl = document.querySelector("#recipeSearch")
var searchButtonEl = document.querySelector("#searchButton")
var searchTerm = recipeSearchEl.value
var searchApiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`

    //event listener for search button
    var searchFunction = function() {
        searchButtonEl.addEventListener("click", function(event) {
    })}

// this will be a function called when the search button is clicked

// make it choose the first index in the array of results

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
            
            var ingTitleEl = document.querySelector("#recipe-title")
            //.appendChild()

            console.log(data);

        }
        
        // console.log(measuredIngredients)
        nutrition(measuredIngredients)
    })
    

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
                // later on - have a modal or change the nutrition div to display error
                console.log("Nutrition information is not available")
            }

                // add data.calories value to div
                // there's a yield property (servings) - to get nutrition per serving - 
                // divide each value by the value of yield
            console.log({data})
        })
        
    }



