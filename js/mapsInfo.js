class MapsInfo{
constructor(){
}
  getData = () => {
    let userData = {
      userSearchTopic: $('.searchTopic').val(),
      userSearchAddress: $('.searchAddress').val(),
      userSearchRadius: (parseInt(($('.searchRadius').val()) * 1609.34)).toString()
    }

    this.getGoogleMaps(userData);
  }
  getGoogleMaps = (data)=>{
    var cityName = data.userSearchAddress;
    var linkMap = $('<div>');
    var link = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBNIp5_GkVzi49g7nWSBYvWhOMuPl6ZTMQ&q=${cityName}`;
    linkMap.attr("src", link);
    $('.maps').append(linkMap);
  }
}
