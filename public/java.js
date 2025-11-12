// Scroll to Routes section
function scrollToRoutes() {
  document.getElementById("routes").scrollIntoView({ behavior: "smooth" });
}

// Google Maps - Show mock bus positions
let map;
let busMarkers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 12.9716, lng: 77.5946 }, // Bengaluru example
    zoom: 12,
  });

  // Mock bus data
  const buses = [
    { id: "Bus 101", lat: 12.9716, lng: 77.5946 },
    { id: "Bus 102", lat: 12.965, lng: 77.6 },
    { id: "Bus 103", lat: 12.975, lng: 77.59 },
  ];

  buses.forEach((bus) => {
    const marker = new google.maps.Marker({
      position: { lat: bus.lat, lng: bus.lng },
      map: map,
      title: bus.id,
      icon: {
        url: "https://img.icons8.com/color/48/bus.png",
        scaledSize: new google.maps.Size(40, 40),
      },
    });
    busMarkers.push(marker);
  });
}

// Route Search
function searchRoutes() {
  const input = document.getElementById("routeSearch").value.toLowerCase();
  const routes = document.getElementById("routeList").getElementsByClassName("route-card");

  for (let i = 0; i < routes.length; i++) {
    const routeText = routes[i].textContent.toLowerCase();
    routes[i].style.display = routeText.includes(input) ? "block" : "none";
  }
}

// Admin Login
function adminLogin(e) {
  e.preventDefault();
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  if (user === "admin" && pass === "1234") {
    alert("Login successful!");
    document.getElementById("adminDashboard").style.display = "block";
  } else {
    alert("Invalid credentials.");
  }
}

// Ticket QR Code
function generateQRCode(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const route = document.getElementById("route").value;

  const data = `Passenger: ${name}\nRoute: ${route}\nValid: ${new Date().toLocaleString()}`;

  const qrDiv = document.getElementById("qrcode");
  qrDiv.innerHTML = ""; // clear previous
  QRCode.toCanvas(document.createElement("canvas"), data, function (error, canvas) {
    if (error) console.error(error);
    qrDiv.appendChild(canvas);
  });
}
