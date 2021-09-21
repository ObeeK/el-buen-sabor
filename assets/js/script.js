var apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
var nutritionUrl = "https://api.edamam.com/api/nutrition-details?app_id=e23b29e2&app_key=e8c537ddb283dff1d3f1c7b8621f15e0"
    

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
                console.log(measuredIngredients)
                nutrition(measuredIngredients)
                return
            }
            else {
                var totalIngredient = currentMeasurement + " " + currentIngredient
                console.log(totalIngredient)
                measuredIngredients.push(totalIngredient);
                console.log(measuredIngredients);
            }

        }
        
        console.log(measuredIngredients)
        nutrition(measuredIngredients)
    })
    
    // .then(function(data){
        
    // });

    var nutrition = function(measuredIngredients) {
        console.log({measuredIngredients});
        fetch('https://api.edamam.com/api/nutrition-details?app_id=e23b29e2&app_key=e8c537ddb283dff1d3f1c7b8621f15e0', {
            method: 'POST',
            body: JSON.stringify({
                
                    "title": "rice",
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
            console.log({data})
        })
        
    }
    // nutrition()

    // var ingFunction = function() {
    //     var measure1 = data.meals[0].strMeasure1 
    //     var ingr1 = data.meals[0].strIngredient1
    //     var measure2 = data.meals[0].strMeasure2 
    //     var ingr2 = data.meals[0].strIngredient2
    //     var measure3 = data.meals[0].strMeasure3 
    //     var ingr3 = data.meals[0].strIngredient3
    //     var measure4 = data.meals[0].strMeasure4 
    //     var ingr4 = data.meals[0].strIngredient4
    //     var measure1 = data.meals[0].strMeasure1 
    //     var ingr1 = data.meals[0].strIngredient1
    //     var measure2 = data.meals[0].strMeasure2 
    //     var ingr2 = data.meals[0].strIngredient2
    //     var measure3 = data.meals[0].strMeasure3 
    //     var ingr3 = data.meals[0].strIngredient3
    //     var measure4 = data.meals[0].strMeasure4 
    //     var ingr4 = data.meals[0].strIngredient4



    //     console.log(measure1 + ingr1) 
