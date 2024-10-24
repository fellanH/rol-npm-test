let defaultRegion = "en";
let defaultLanguage = "en";
let currentLanguage;
let currentRegion = getRegion();

//error handling if region is not set in local storage
if (currentRegion === null) {
  console.log("Current Region was null");
  currentRegion = defaultRegion;
  setRegion(currentRegion);
  console.log("Current Region set to:", currentRegion);
}

//set current language after weglot is initialized
Weglot.on("initialized", function () {
  currentLanguage = Weglot.getCurrentLang();
});

document.addEventListener("DOMContentLoaded", function () {
  preparePage();
});

function preparePage() {
  hideAllProducts();
  createRegionVariables();
  setRegion(currentRegion);
  setTimeout(() => {
    filterProducts(currentRegion);
  }, 500);
  //xClickEvent("Button ID", "language code"," "region code")
  addClickEvent("region-btn-sv", "sv", "sv", "Sverige");
  addClickEvent("region-btn-global", "en", "en", "Global");
  addClickEvent("region-btn-de", "de", "de", "Deutschland");
}

function createRegionVariables() {
  const searchThisDiv = "excluded_regions";
  const productItems = document.querySelectorAll(".product-grid_item");

  productItems.forEach((item, index, array) => {
    let link = item.querySelector(".product-card_component");
    let slug = link.getAttribute("href");
    let slugTrim = slug.split("/").pop();
    createDiv("region-exclude", `region-${slugTrim}`, item);
    loadVariables(slugTrim, slug, searchThisDiv);
  });
}

function filterProducts(region) {
  showAllProducts();
  const productItems = document.querySelectorAll(".product-grid_item");
  productItems.forEach((item) => {
    const variableList = item.querySelectorAll(".excluded-region-var");

    variableList.forEach((variable) => {
      if (variable.textContent.trim() === region) {
        //item.style.opacity = "0.2";
        //item.style.pointerEvents = "none";
        item.style.display = "none";
      }
    });
  });
}

//load variables from CMS collection pages
function loadVariables(slugTrim, slug, divClass) {
  $(`#region-${slugTrim}`).load(`${slug} .${divClass}`);
}

function createDiv(className, id, parentDiv) {
  let newDiv = document.createElement("div");
  newDiv.className = className;
  newDiv.id = id;
  //newDiv.style.display = "none";
  parentDiv.appendChild(newDiv);
}

/*  !----------------------------------

UTILITIES

 ----------------------------------- */

function addClickEvent(ID, language, region, name) {
  document.getElementById(ID).addEventListener("click", function () {
    changeLanguage(language);
    setRegion(region);
    filterProducts(region);
    $(".locals-list_current-language").text(name);
  });
}

function changeLanguage(langCode) {
  Weglot.switchTo(langCode);
}

function setRegion(region) {
  let currentRegion = region;
  localStorage.setItem("region", currentRegion);
}

function getRegion() {
  return localStorage.getItem("region");
}

function showAllProducts() {
  const productItems = document.querySelectorAll(".product-grid_item");
  productItems.forEach((item) => {
    //item.style.opacity = "1";
    item.style.display = "block";
  });
}

function hideAllProducts() {
  const productItems = document.querySelectorAll(".product-grid_item");
  productItems.forEach((item) => {
    //item.style.opacity = "0.2";
    //item.style.pointerEvents = "none";
    item.style.display = "none";
  });
}

function setTimers() {
  console.time("Weglot loadTime");
  console.time("Document loadTime");
  console.time("FilterProducts Start loadTime");
  console.time("FilterProducts End loadTime");
  console.time("CreateRegionVariables Start loadTime");
  console.time("CreateRegionVariables End loadTime");
  console.timeEnd("Script Start loadTime");
}
