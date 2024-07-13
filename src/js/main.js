let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});

function openSideNav() {
  $(".side-nav-menu").animate(
    {
      left: 0,
    },
    500
  );

  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate(
        {
          top: 0,
        },
        (i + 5) * 100
      );
  }
}

function closeSideNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
  $(".side-nav-menu").animate(
    {
      left: -boxWidth,
    },
    500
  );

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate(
    {
      top: 300,
    },
    500
  );
}

closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    openSideNav();
  }
});

function displayMeals(arr) {
  let allData = "";
  arr.forEach((meal) => {
    allData += ` <div class="col-md-3">
                <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meal.strMealThumb}" alt="" srcset="">
                    <div class="meal-overlay position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
        </div>
        `;
  });
  rowData.innerHTML = allData;
}

async function getCategories() {
  searchContainer.innerHTML = "";
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();

  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}

function displayCategories(arr) {
  let allData = "";
  arr.forEach((meal) => {
    allData += ` <div class="col-md-3">
                <div onclick="getCategoryMeals('${
                  meal.strCategory
                }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${
                      meal.strCategoryThumb
                    }" alt="" srcset="">
                    <div class="meal-overlay position-absolute text-center text-black p-2">
                        <h3>${meal.strCategory}</h3>
                        <p>${meal.strCategoryDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
        </div>
        `;
  });
  rowData.innerHTML = allData;
}

async function getArea() {
  searchContainer.innerHTML = "";
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  console.log(response.meals);

  displayArea(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

function displayArea(arr) {
  let allData = "";
  arr.forEach((meal) => {
    allData += ` <div class="col-md-3">
                <div onclick="getAreaMeals('${meal.strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${meal.strArea}</h3>
                </div>
        </div>
        `;
  });
  rowData.innerHTML = allData;
}

async function getIngredients() {
  searchContainer.innerHTML = "";
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  console.log(response.meals);

  displayIngredients(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

function displayIngredients(arr) {
  let allData = "";
  arr.forEach((meal) => {
    allData += ` <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
                  meal.strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${meal.strIngredient}</h3>
                        <p>${meal.strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  });
  rowData.innerHTML = allData;
}

async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

async function getIngredientsMeals(ingredients) {
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();

  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

async function getMealDetails(mealID) {
  closeSideNav();
  searchContainer.innerHTML = "";

  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  response = await response.json();

  displayMealDetails(response.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}

function displayMealDetails(meal) {
  searchContainer.innerHTML = "";

  let ingredients = ``;

  console.log(meal);
  for (let i = 1; i <= 10; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="bg-ingredient text-black  m-2 p-1 px-2">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) {
    tags = [];
  }

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="bg-tag text-black m-2 px-2 p-1">${tags[i]}</li>`;
  }

  let singleMealView = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  rowData.innerHTML = singleMealView;
}

function showSearchInputs() {
  searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFilter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  rowData.innerHTML = "";
}

async function searchByName(term) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}

async function searchByFilter(term) {
  closeSideNav();
  rowData.innerHTML = "";
  $(".inner-loading-screen").fadeIn(300);

  if (term == "") {
    term = "a";
  }

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();

  response.meals ? displayMeals(response.meals) : displayMeals([]);
  $(".inner-loading-screen").fadeOut(300);
}

function showContacts() {
  rowData.innerHTML = `
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
      <div class="container w-75 text-center">
          <div class="row g-4">
              <div class="col-md-6">
                  <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                  <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Special characters and numbers are not allowed
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                  <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Email not valid *exemple@yyy.zzz
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                  <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid Phone Number
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                  <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid age
                  </div>
              </div>
              <div class="col-md-6">
                  <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                  <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid password *Minimum eight characters, at least one letter and one number:*
                  </div>
              </div>
              <div class="col-md-6">
                  <input  id="conformPasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Conform Password">
                  <div id="conformPasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid conform password
                  </div>
              </div>
          </div>
          <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
      </div>
  </div> `;

  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document
    .getElementById("conformPasswordInput")
    .addEventListener("focus", () => {
      conformPasswordInputTouched = true;
    });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let conformPasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (conformPasswordInputTouched) {
    if (conformPasswordValidation()) {
      document
        .getElementById("conformPasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("conformPasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[0-9]{10}$/.test(document.getElementById("phoneInput").value);
}

function ageValidation() {
  return /^[1-9][0-9]?$|^100$/.test(document.getElementById("ageInput").value);
}

function passwordValidation() {
  return /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function conformPasswordValidation() {
  return (
    document.getElementById("conformPasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
