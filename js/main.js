$('document').ready(startApp);

var yelpObj ;
function startApp(){
yelpObj = new YelpInfo();
$('.searchButton').on("click",yelpObj.getData);
}
