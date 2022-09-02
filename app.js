const mealsEl = document.getElementById('meals')

getRandomMeal()
fetchFavMeals()


async function getRandomMeal() {

    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')

    const respData = await response.json()
    const randomMeal = respData.meals[0]
    console.log(randomMeal)

    displayMeal(randomMeal, true)
}

async function getMealById(id) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const respData = await response.json()
    const meal = respData.meals[0]
    return meal

}

async function getMealBySearch(term) {
    const meals = await fetch('https://www.themealdb.com/api/json/v1/1/random.php=' + term)
}

// Display Meals to DB

function displayMeal(mealData, random = false) {
    const meal = document.createElement('div')
    meal.classList.add('meal')

    meal.innerHTML = `
    <div class="meal-header">
        ${random ? `
        <span class="random">Random Meal</span>`
            : ''}
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>
        <button class="fav-btn"><i class="fa-solid fa-heart active"></i></button>
    </div>
    `

    // Toggle Fav Btn on click and add to favorites
    const btnEl = meal.querySelector('.meal-body .fav-btn')
    btnEl.addEventListener('click', (e) => {
        if (btnEl.classList.contains('active')) {
            removeMealFromLocalStorage(mealData.idMeal)
            btnEl.classList.remove('active')
        } else {
            addMealToLocalStorage(mealData.idMeal)
            btnEl.classList.add('active')
        }
    })


    mealsEl.appendChild(meal)

}


function addMealToLocalStorage(mealId) {

    const mealIds = getMealFromLocalStorage()
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))

}

function removeMealFromLocalStorage(mealId) {
    const mealIds = getMealFromLocalStorage()
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)))
}

function getMealFromLocalStorage() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds
}

// Get Fav Meals
async function fetchFavMeals() {
    const mealIds = getMealFromLocalStorage()

    for (const mealId of mealIds) {
        let meal = await getMealById(mealId)
        addMealToFav(meal)
    }



}

function addMealToFav(mealData) {
    const favMealsEl = document.querySelector(".fav-meals")
    const favMealLi = document.createElement('li')

    favMealLi.innerHTML = `
    <li>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
    </li>           
    `

    favMealsEl.appendChild(favMealLi)

}