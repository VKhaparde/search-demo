class YelpInfo{
  constructor(){
  this.domElements = {
    name: null,
    address: null,
    rating : null,
    phoneNumber:null,
    url: null
  };
}
  getData = ()=>{
    let userData = {
      userSearchTopic : $('.searchTopic').val(),
      userSearchAddress : $('.searchAddress').val(),
      userSearchRadius: (parseInt(($('.searchRadius').val()) * 1609.34)).toString()
    }
    console.log(userData.userSearchTopic,userData.userSearchAddress,userData.userSearchRadius);
    console.log(userData);
    this.getSearchResults(userData);
  }
  getSearchResults(userData){
    let ajaxConfigObj = {
      async: true,
      crossDomain: true,
      dataType : "json",
      url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",
      data: {
        term : userData.userSearchTopic,
        location:userData.userSearchAddress,
        radius:userData.userSearchRadius
      },
     method:'get',
      "headers": {
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer Tk6PRF-9Y5t64vllCs1WMt9TKTajUyDxc31SMcG2a6ENbj5ZI4bjyYzAPcefYWk9MoNKO9aBJdek0exD3wjVfXDb0G8xQHmiB541ekuYs6UzZpfXXvc3qFu9CLa3XXYx",
      },
      success: response => {
        this.displayUserResults(response);
      },
      error : ()=>{
        alert("Sorry! Cannot get the results at this time.")
      }
    };
    $.ajax(ajaxConfigObj);
  }
  displayUserResults(responseData){
    console.log(responseData);
    $(".businesses").empty();
    if(responseData.businesses.length === 0){
      $(".businesses").addClass("noData").text("Sorry! No data is available");
    }
    else{
      responseData.businesses.map((currentVal) => {
        this.domElements.name = $('<div>').addClass("name").text(currentVal.name);
        this.domElements.phoneNumber = $('<div>').addClass("phone").text(currentVal.display_phone);
        this.domElements.rating = $('<div>').addClass("rating").text(currentVal.rating)
        this.domElements.address = $('<div>').addClass("address");
        //.text(currentVal.location.display_address[0])
        let addressPart = currentVal.location.display_address;
        addressPart.map((element) => {
          let addressLine = $('<div>').addClass('addressLine').text(element);
          this.domElements.address.append(addressLine);
        });
        var businessElement = $('<div>').addClass('businessElement');
        businessElement.append(this.domElements.name, this.domElements.phoneNumber,
          this.domElements.rating, this.domElements.address);
        $(".businesses").append(businessElement);
      })
    }
  }
}
