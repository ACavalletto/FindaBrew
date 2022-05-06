let brewerData, userInput;

let $inputCity = $("input[type=text]");
let $brewery = $("#brewery");
let $type = $("#type");
let $address = $("#address");
let $phone = $("#phone");
let $website = $("#website");

$("form").on("click","i", handleGetData);

function handleGetData(e) {
  e.preventDefault();
  userInput = $inputCity.val();
  if(userInput)
  $.ajax({
    url: "https://api.openbrewerydb.org/breweries?by_city=san_diego",
    // url: "https://api.openbrewerydb.org/breweries?by_city=san%20diego"
  }).then(
    (data) => {
      brewerData = data;
    },
    (error) => {
      console.log("bad request", error);
    }
  );
}
