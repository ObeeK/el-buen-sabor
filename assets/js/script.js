var apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
var nutritionUrl = "https://api.edamam.com/api/nutrition-details?app_id=e23b29e2&app_key=e8c537ddb283dff1d3f1c7b8621f15e0"
    
fetch(apiUrl)

    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var ing1 = data.meals[0].strIngredient1

        console.log(ing1);
        // ingFunction()
        console.log(data);
        var measure1 = data.meals[0].strMeasure1 
        var ingr1 = data.meals[0].strIngredient1

        var p1 = (measure1 + " " + ingr1)
        console.log(p1)
        // nutrition()
    })
    
    .then(function(data){

    });

    var nutrition = function() {
        fetch('https://api.edamam.com/api/nutrition-details?app_id=e23b29e2&app_key=e8c537ddb283dff1d3f1c7b8621f15e0', {
            method: 'POST',
            body: JSON.stringify({
                
                    "title": "rice",
                    "ingr": ["1 cup rice"]
                    })
                ,
            
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }) 
        .then(function(response) {
            return response.json();
            console.log(response)
        })
        .then(function(data){
            console.log({data})
        })
    }
    nutrition()

    // var ingFunction = function() {
    //     var measure1 = data.meals[0].strMeasure1 
    //     var ingr1 = data.meals[0].strIngredient1

    //     console.log(measure1 + ingr1) 
