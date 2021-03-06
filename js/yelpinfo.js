class YelpInfo {
  constructor() {
    this.domElements = {
      name: null,
      address: null,
      rating: null,
      phoneNumber: null,
      image: null
    };
  }
  getData = () => {
    let userData = {
      userSearchTopic: $('.searchTopic').val(),
      userSearchAddress: $('.searchAddress').val(),
      userSearchRadius: (parseInt(($('.searchRadius').val()) * 1609.34)).toString()
    }
    let radius = parseFloat($('.searchRadius').val());
    if (radius === 0) {
      $('.resultsNum').text("No results found.");
      $(".businesses").empty();
      return;
    }
    else if (radius > 0 && radius < 1) {
      userData.userSearchRadius = "1";
    }
    else if (radius >= 24) {
      userData.userSearchRadius = "";
    }
    else{
      userData.userSearchRadius = (parseInt(($('.searchRadius').val()) * 1609.34)).toString();
    }
    this.getSearchResults(userData);
  }
  getSearchResults(userData) {
    let ajaxConfigObj = {
      async: true,
      crossDomain: true,
      dataType: "json",
      url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",
      data: {
        term: userData.userSearchTopic,
        location: userData.userSearchAddress,
        radius: userData.userSearchRadius,
        sort_by: "distance"
      },
      method: 'get',
      "headers": {
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer Tk6PRF-9Y5t64vllCs1WMt9TKTajUyDxc31SMcG2a6ENbj5ZI4bjyYzAPcefYWk9MoNKO9aBJdek0exD3wjVfXDb0G8xQHmiB541ekuYs6UzZpfXXvc3qFu9CLa3XXYx",
      },
      success: response => {
        this.displayUserResults(response);
      },
      error: () => {
        alert("Sorry! Cannot get the results at this time.Check if your inputs are valid.");
        $('.resultsNum').text("");
        $(".businesses").empty();
      }
    };
    $.ajax(ajaxConfigObj);
  }
  displayUserResults(responseData) {
    $(".businesses").empty();
    if (responseData.businesses.length === 0) {
      $('.resultsNum').text("");
      $(".businesses").addClass("noData").text("Sorry! No data is available for your search.");
    }
    else {
      $('.resultsNum').text("Showing top " + responseData.businesses.length + " matches...");
      responseData.businesses.map((currentVal) => {
        this.domElements.name = $('<a>').addClass("name");
        this.domElements.name.text(currentVal.name);
        this.domElements.name.attr("href", currentVal.url);
        this.domElements.name.attr("target", "_blank");
        this.domElements.phoneNumber = $('<div>').addClass("phone").text("Phone: " + currentVal.display_phone);
        this.domElements.rating = $('<div>').addClass("rating").text("Rating: " + currentVal.rating);
        this.domElements.image = $('<div>', {
          class: "image",
          css: {
            "background-image": "url(" + currentVal.image_url + ")"
          },
        });
        this.domElements.address = $('<div>').addClass("address").text("Address: ");
        let addressPart = currentVal.location.display_address;
        addressPart.map((element) => {
          let addressLine = $('<div>').addClass('addressLine').text(element);
          this.domElements.address.append(addressLine);
        });
        let businessElement = $('<div>').addClass('businessElement');
        businessElement.append(this.domElements.name, this.domElements.address,
          this.domElements.phoneNumber, this.domElements.rating, this.domElements.image);
        $(".businesses").append(businessElement);
      })
    }
  }
}
