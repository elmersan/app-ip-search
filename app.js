const api_key = "at_Fy71ZhP8k7wBAbc99usvbP3Kbsprx";

$(function () {
  //selectores
  const ip = document.getElementById("ip");
  const button = document.querySelector("#submit");
  const input = document.querySelector("#input");
  const location = document.getElementById("location");
  const timezone = document.getElementById("timezone");
  const isp = document.getElementById("isp");

  // event click
  button.addEventListener("click", () => {
    var input = document.getElementById("input"); //27.38.20.20
    searchIp(input.value);
  });

  // Event enter
  input.addEventListener("keydown", (event) => {
    let keyCode = event.keyCode;
    var input = document.getElementById("input"); //27.38.20.20
    if (keyCode === 13) {
      searchIp(input.value);
    }
  });

  // search ip of input value
  async function searchIp(ipAddress) {
    console.log(ipAddress);
    const response = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${api_key}&ipAddress=${ipAddress}`
    );

    if (response.ok) {
      document.getElementById("mapid").innerHTML =
        "<div id='map' style='width: 100%; height: 100%;'></div>";
      const dataIp = await response.json();
      document.getElementById("error").innerHTML = "";
      renderInfo(dataIp);
    } else {
      document.getElementById(
        "error"
      ).innerHTML = `Error al buscar IP ,por favor ingrese una IP valida`;
      document.getElementById("mapid").innerHTML =
        "<div id='map' style='width: 100%; height: 100%;'></div>";
    }
  }

  // render info
  function renderInfo(dataIp) {
    ip.innerHTML = dataIp.ip;
    location.innerHTML = `${dataIp.location.city},${dataIp.location.country},${dataIp.location.postalCode}`;
    timezone.innerHTML = `UTC ${dataIp.location.timezone}`;
    isp.innerHTML = dataIp.isp;
    renderMap(dataIp.location.lat, dataIp.location.lng);
  }

  //render map
  function renderMap(lat, lng) {
    console.log(lat, lng);
    var latlng = L.latLng(lat, lng);
    var mapRender = L.map("map").setView(latlng, 18);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRender);

    L.marker(latlng).addTo(mapRender).openPopup();
  }

  searchIp("190.108.88.146");
});
