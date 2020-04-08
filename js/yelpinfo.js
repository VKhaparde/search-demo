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
    let userSearchTopic = $('.searchTopic').val();
    let userSearchAddress = $('.searchAddress').val();
    let userSearchRadius = $('.searchRadius').val();
    console.log(userSearchTopic,userSearchAddress,userSearchRadius);
  }

}
