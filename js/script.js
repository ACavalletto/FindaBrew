let brewerData;
handleGetData();
function handleGetData() {
    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_city=san_diego"
    }).then(
        (data) => {
            brewerData = data;
            console.log(brewerData)
        },
        (error) => {
            console.log("bad request", error);
        });
}