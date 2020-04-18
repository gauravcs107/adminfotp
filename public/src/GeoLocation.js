module.exports = class Geolocation{
    
    constructor(latitude,longitude){
      this.latitude = latitude;
      this.longitude = longitude;
    }
    setLatLong(latitude,longitude){
      this.latitude = latitude;
      this.longitude = longitude;
    }
}