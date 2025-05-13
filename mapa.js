let map;
let marker;

function initMap() {
  const defaultLocation = { lat: -23.5505, lng: -46.6333 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 13,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(pos);
      marker = new google.maps.Marker({
        map,
        position: pos,
      });
    });
  }

  const input = document.getElementById("searchBox");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  // Quando um lugar é selecionado automaticamente pelo autocomplete
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      alert("Lugar não encontrado!");
      return;
    }

    map.setCenter(place.geometry.location);
    map.setZoom(15);

    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  });

  // Adicionando o evento para pressionar Enter
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Impede o comportamento padrão do Enter
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        alert("Lugar não encontrado!");
        return;
      }

      map.setCenter(place.geometry.location);
      map.setZoom(15);

      if (marker) marker.setMap(null);
      marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });
    }
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const moonIcon = document.querySelector(".modo-moon-btn");
  const sunIcon = document.querySelector(".modo-sun-btn");

  // Alterna visibilidade dos ícones
  if (document.body.classList.contains("dark")) {
    moonIcon.style.display = "none";
    sunIcon.style.display = "inline";
  } else {
    moonIcon.style.display = "inline";
    sunIcon.style.display = "none";
  }
}
