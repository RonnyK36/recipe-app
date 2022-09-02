getRandomMeal()


async function getRandomMeal() {

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')

    const respData = await response.json()
    const randomMeal = respData.meals[0]
    console.log(randomMeal)

    displayMeal(randomMeal, true)
}

async function getMealById(id) {
    const meal = await fetch('https://www.themealdb.com/api/json/v1/1/random.php=' + id)
}

async function getMealBySearch(term) {
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/random.php=' + term)
}

// Display Meals to DB

function displayMeal(mealData, random = false) {


}