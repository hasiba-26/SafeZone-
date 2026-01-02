const socket = io();

const map = L.map("map").setView([6.1215, 100.3687], 16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Albukhary International University",
}).addTo(map);

let markers = {};
let emergencyMarkers = {};

const userIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    shadowSize: [41, 41]
});

const emergencyIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    shadowSize: [41, 41]
});

// Function to fetch address using reverse geocoding
async function getAddress(lat, lon) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
    const data = await response.json();
    return data.display_name;
}

// Function to format the timestamp to a readable format
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.toDateString()} ${date.toTimeString().split(' ')[0]}`;
}

// Function to add or update a marker for a client
async function updateMarker(id, lat, lon, ip) {
    const address = await getAddress(lat, lon);
    document.getElementById('address').innerText = `Current Address: ${address}`;
    if (markers[id]) {
        markers[id].setLatLng([lat, lon]);
    } else {
        markers[id] = L.marker([lat, lon], { icon: userIcon })
            .addTo(map)
            .bindPopup(`IP: ${ip}<br>Address: ${address}`)
            .openPopup();
    }
}

// Function to remove a marker for a client
function removeMarker(id) {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
}

// Function to add an emergency marker
async function addEmergencyMarker(data) {
    const { id, latitude, longitude, type, timestamp } = data;
    const address = await getAddress(latitude, longitude);
    const timeSinceRequest = `${Math.round((new Date() - new Date(timestamp)) / 1000)} seconds ago`;
    const popupContent = `
        <b>Emergency: ${type}</b><br>
        Address: ${address}<br>
        Time Since Request: ${timeSinceRequest}
    `;
    document.getElementById('address').innerText = `Emergency Address: ${address}`;
    if (emergencyMarkers[id]) {
        emergencyMarkers[id].setLatLng([latitude, longitude]).setPopupContent(popupContent);
    } else {
        emergencyMarkers[id] = L.marker([latitude, longitude], { icon: emergencyIcon })
            .addTo(map)
            .bindPopup(popupContent)
            .openPopup();
    }
    showNotification(`Emergency reported: ${type}`, 'emergency');
}

// Function to remove an emergency marker
function removeEmergencyMarker(id) {
    if (emergencyMarkers[id]) {
        map.removeLayer(emergencyMarkers[id]);
        delete emergencyMarkers[id];
    }
}

// Function to show notifications
function showNotification(message, type) {
    const notifications = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    notifications.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Initialize markers for existing clients and emergencies
socket.on("initialize", (data) => {
    console.log("Initializing markers for existing clients:", data.clients);
    for (const [id, clientData] of Object.entries(data.clients)) {
        updateMarker(id, clientData.latitude, clientData.longitude, id);
    }
    console.log("Initializing emergency markers:", data.emergencies);
    for (const [id, emergencyData] of Object.entries(data.emergencies)) {
        addEmergencyMarker(emergencyData);
    }
});

// Listen for location updates from other clients
socket.on("receive-location", (data) => {
    console.log("Received location update:", data);
    updateMarker(data.id, data.latitude, data.longitude, data.id !== socket.id ? data.id : 'Your IP');
    showNotification(`Location update for ${data.id}`, 'location');
});

// Listen for emergency notifications
socket.on("emergency-notification", (data) => {
    console.log("Received emergency notification:", data);
    addEmergencyMarker(data);
});

// Listen for client disconnections
socket.on("client-disconnected", (id) => {
    console.log("Client disconnected:", id);
    removeMarker(id);
    removeEmergencyMarker(id);
    showNotification(`Client ${id} disconnected`, 'disconnection');
});

// Listen for removal of emergency markers
socket.on("remove-emergency", (id) => {
    console.log("Removing emergency marker:", id);
    removeEmergencyMarker(id);
    showNotification(`Emergency marker for ${id} removed`, 'removal');
});