function initMap() {

  var markersToShow = [];

  var infowindow = new google.maps.InfoWindow({
        content: 'BAGIETY ALERT (2min temu)'
      });

  var marker = new google.maps.Marker({
    position: {lat: 52.239802, lng: 21.011818},
    animation: google.maps.Animation.BOUNCE,
    map: map,
    title: 'Hello World!'
  });

  infowindow.open(map, marker);

  const fetchMarkers = () => {
    let url = 'http://10.78.25.34:8080/patrols/?x=52.239802&y=21.011818&rad=1000';
    fetch(url).then(response => {
      if (response.ok) {

        return response.json();
      } else {
        throw new Error('Fetching markers failed');
      }
    })
  .then(response => {

      data.forEach(marker => {
        let newMarker = new google.maps.Marker({
          position: {lat: marker.x, lng: marker.y},
          animation: google.maps.Animation.BOUNCE,
          map: map,
          title: 'Hello World!'
        });
        markersToShow.push(newMarker);
      });

    })
  .catch(error => {
      console.log('Fetching data error:', error);
    });
  };

  let refresher = setInterval(() => {
    markersToShow.forEach(marker => {
      marker.setMap(null);
    });
    markersToShow = [];
    fetchMarkers();
    console.log(markersToShow);
  }, 5000);

  var myPosition = new google.maps.LatLng(52.229802,21.011818);

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = 'Geolocation is not supported by this browser.';
    }
  }

  function showPosition(position) {
    console.log(position);
    myPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    console.log(myPosition);
    drawMap();

  }
  drawMap();
  getLocation();

  function drawMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: myPosition
    });

    var myCity = new google.maps.Circle({
      center: myPosition,
      radius: 150,
      strokeColor: '#0000FF',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#0000FF',
      fillOpacity: 0.4
    });
    myCity.setMap(map);
  }

}
