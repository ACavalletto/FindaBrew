let brewerData, userInput;
let $inputCity = $("input[type=text]");
let $brewery = $(".breweryName");
let $address = $(".address");
let $phone = $(".phone");
let $website = $(".website");
let $cityName = $("#cityName");
const logoFinder = "https://logo.clearbit.com/";

$("form").on("click", "i", handleGetData);

function handleGetData(e) {
  e.preventDefault();
  if ($(".cardsWrap").children().length > 0) {
    $(".cardsWrap").empty();
  } // Checks to see if grid is already populated with cards and if so clears the existing cards.
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
      if (brewerData.length === 0) {
        alert("Please enter another city");
        $inputCity.val("");
        $cityName.text("");
        return;
      } // Checks for valid input by user and if invalid asks for a new input and clears out incorrectly inputted value
      render();
    },
    (error) => {
      console.log("bad request", error);
    }
  );
}

function render() {
  for (let i = 0; i < brewerData.length; i++) {
    checkData(brewerData[i]);
    const newCard = $(`
    <div class="cardItem">
    <div class = "breweryLogo"><img src = "${logoFinder}+${brewerData[i].website_url}"></div>
    <button type="button" class="collapsible">${brewerData[i].name}</button>
      <div class ="innerCard">
        <div class= "breweryName">${brewerData[i].name}</div>
        <div class= "address">${brewerData[i].street}</div>
        <div class = "phone">${brewerData[i].phone}</div>
        <div class = "website"><a href = "${brewerData[i].website_url} target="_blank">${brewerData[i].name}</a></div>
      </div>
    </div>`);
    $(".cardsWrap").append(newCard);
  } //Iterates through returned data array and builds a card from each object then adds it to the card grid
}
function checkData(brewerData) {
  if (brewerData.street == null) {
    brewerData.street = "";
  }
  if (brewerData.phone == null) {
    brewerData.phone = "";
  } // Checks for null in data pulled from api and does not display if none is provided
}

$(".cardsWrap").on("click", "button", (e) => {
  let $targetCard = $(e.target).parent();
  if ($targetCard.children(".innerCard").css("visibility") == "collapse") {
    $targetCard.children(".innerCard").css("visibility", "visible");
  } else {
    $targetCard.children(".innerCard").css("visibility", "collapse");
  }
});
