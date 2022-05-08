let brewerData, userInput;

let $inputCity = $("input[type=text]");
let $brewery = $("#brewery");
let $type = $("#type");
let $address = $("#address");
let $phone = $("#phone");
let $website = $("#website");
let $cityName = $("#cityName");
// const logoFinder = "https://logo.clearbit.com/"

$("form").on("click", "i", handleGetData);

function handleGetData(e) {
  e.preventDefault();
  if ($("#tableBody").children().length > 0) {
    $("#tableBody").empty();
  }
  userInput = $inputCity.val();
  $cityName.text(userInput);
  userInput = userInput.replace(/\s+/g, "%20");
  //checks userInput for any whitespace and replaces it with URL encoding reference

  $.ajax({
    //Initiate ajax request to openbrewerydb based on city input
    url: `https://api.openbrewerydb.org/breweries?by_city=${userInput}`,
  }).then(
    (data) => {
      brewerData = data;
      render();
    },
    (error) => {
      console.log("bad request", error);
    }
  );
}

function render() {
  for (let i = 0; i < brewerData.length; i++) {
    const $newBrewery = $(
      `<tr><td>${brewerData[i].name}</td><td>${brewerData[i].brewery_type}</td><td>${brewerData[i].street}</td><td>${brewerData[i].phone}</td><td><a href ="${brewerData[i].website_url}">${brewerData[i].name}</a></td></tr>`
    );
    $("#tableBody").append($newBrewery);
  }
}
