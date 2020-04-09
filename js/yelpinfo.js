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
    // let userSearchTopic = $('.searchTopic').val();
    // let userSearchAddress = $('.searchAddress').val();
    // let userSearchRadius = $('.searchRadius').val();
    let userData = {
      userSearchTopic : $('.searchTopic').val(),
      userSearchAddress : $('.searchAddress').val(),
      userSearchRadius : $('.searchRadius').val()
    }
    console.log(userData.userSearchTopic,userData.userSearchAddress,userData.userSearchRadius);
    console.log(userData);
    this.getSearchResults(userData);
  }
  getSearchResults(userData){
    let ajaxConfigObj = {
      dataType : "json",
      url: 'yelpproxy.php',
      data: {
        term : userData.userSearchTopic,
        location:userData.userSearchAddress,
        radius:userData.userSearchRadius
      },
     method:'get',
      "headers": {
        "Authorization": "Bearer Tk6PRF-9Y5t64vllCs1WMt9TKTajUyDxc31SMcG2a6ENbj5ZI4bjyYzAPcefYWk9MoNKO9aBJdek0exD3wjVfXDb0G8xQHmiB541ekuYs6UzZpfXXvc3qFu9CLa3XXYx",
      },
      success: response => {
        this.displayUserResults(response);
      },
      error : ()=>{
        alert("Sorry! Cannot get the results at this time.")
      }
    };
    $ajax(ajaxConfigObj);
  }
}
