let brewerData, userInput;

let $inputCity = $("input[type=text]");
let $brewery = $(".breweryName");
let $address = $(".address");
let $phone = $(".phone");
let $type = $(".type");
let $website = $(".website");
let $cityName = $("#cityName");
const logoFinder = "https://logo.clearbit.com/"

$("form").on("click", "i", handleGetData);

function handleGetData(e) {
  e.preventDefault();
  if ($(".cardsWrap").children().length > 0) {
    $(".cardsWrap").empty();
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
    const newCard = $(`
    <div class="cardItem">
      <div class ="innerCard"
        <div class = "breweryLogo"><img src = "${logoFinder}+${brewerData[i].website_url}"</div>
        <div class= "breweryName">${brewerData[i].name}</div>
        <div class= "address">${brewerData[i].address}</div>
        <div class = "phone">${brewerData[i].phone}</div>
        <div class = "type">${brewerData[i].brewery_type}</div>
        <div class = "website"><a href = "${brewerData[i].website_url}">${brewerData[i].name}</a></div>
      </div>
    </div>`);
    $(".cardsWrap").append(newCard);
  }
  
}
