const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const session = require("express-session");
const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');

const server = http.createServer(app);
const io = socketio(server);

// Database connection
const db = new Database('safe_zone.db');
console.log("Connected to the database.");

// Create tables if they don't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS server_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS client_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS emergency_signals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        latitude REAL,
        longitude REAL,
        type VARCHAR(50),
        ip_address VARCHAR(45),
        request_count INTEGER DEFAULT 1,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key', // Use a strong, unique secret key
    resave: false,
    saveUninitialized: true,
}));

// Middleware to check if server user is authenticated
function isServerAuthenticated(req, res, next) {
    if (req.session.serverUserId) {
        return next();
    }
    res.redirect('/server_login');
}

// Middleware to check if client user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/emergency_login');
}

// Check if there are any server users already in the database
function checkFirstTimeSetup(req, res, next) {
    const query = 'SELECT * FROM server_users';
    const results = db.prepare(query).all();
    if (results.length > 0) {
        return next();
    } else {
        res.redirect('/server_signup');
    }
}

// Redirect root URL to server login if not logged in
app.get("/", isServerAuthenticated, (req, res) => {
    res.render("index");
});

// Server User Routes
app.get("/server_login", checkFirstTimeSetup, (req, res) => {
    res.render("server_login");
});

app.post("/server_login", (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM server_users WHERE email = ?';

    try {
        const user = db.prepare(query).get(email);
        if (user) {
            // Compare the hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return res.render("server_login", { error: "An error occurred. Please try again." });
                }
                if (isMatch) {
                    req.session.serverUserId = user.id;
                    console.log("Server user logged in successfully:", user.id);
                    res.redirect("/");
                } else {
                    console.log("Invalid password for server user:", email);
                    res.render("server_login", { error: "Invalid password. Please try again." });
                }
            });
        } else {
            console.log("Server user not found:", email);
            res.render("server_login", { error: "Invalid email. Please try again." });
        }
    } catch (err) {
        console.error("Database query error:", err);
        return res.render("server_login", { error: "An error occurred. Please try again." });
    }
});

app.get("/server_signup", (req, res) => {
    res.render("server_signup");
});

app.post("/server_signup", (req, res) => {
    const { email, password, name } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        const query = 'INSERT INTO server_users (email, password, name) VALUES (?, ?, ?)';
        const result = db.prepare(query).run(email, hashedPassword, name);
        req.session.serverUserId = result.lastInsertRowid;
        res.redirect("/");
    });
});

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/server_login");
    });
});

// Client User Routes
app.get("/emergency", (req, res) => {
    res.redirect("/emergency_login");
});

app.get("/emergency_login", (req, res) => {
    res.render("emergency_login");
});

app.post("/emergency_login", (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM client_users WHERE email = ?';

    try {
        const user = db.prepare(query).get(email);
        if (user) {
            // Compare the hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error("Error comparing passwords:", err);
                    return res.render("emergency_login", { error: "An error occurred. Please try again." });
                }
                if (isMatch) {
                    req.session.userId = user.id;
                    console.log("Client user logged in successfully:", user.id);
                    res.redirect("/emergency_dashboard");
                } else {
                    console.log("Invalid password for client user:", email);
                    res.render("emergency_login", { error: "Invalid password. Please try again." });
                }
            });
        } else {
            console.log("Client user not found:", email);
            res.render("emergency_login", { error: "Invalid email. Please try again." });
        }
    } catch (err) {
        console.error("Database query error:", err);
        return res.render("emergency_login", { error: "An error occurred. Please try again." });
    }
});

app.get("/emergency_signup", (req, res) => {
    res.render("emergency_signup");
});

app.post("/emergency_signup", (req, res) => {
    const { email, password, name } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        const query = 'INSERT INTO client_users (email, password, name) VALUES (?, ?, ?)';
        const result = db.prepare(query).run(email, hashedPassword, name);
        req.session.userId = result.lastInsertRowid;
        res.redirect("/emergency_dashboard");
    });
});

app.get("/emergency_dashboard", isAuthenticated, (req, res) => {
    res.render("emergency_dashboard", { userId: req.session.userId });
});

// Emergency User Logout Route
app.get("/emergency_logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/emergency_login");
    });
});

// Endpoint to view request logs
app.get("/logs/view", isServerAuthenticated, (req, res) => {
    const query = 'SELECT * FROM emergency_signals ORDER BY timestamp DESC';
    const logs = db.prepare(query).all();
    res.render("logs", { logs });
});

// Dashboard route
app.get("/dashboard", isServerAuthenticated, (req, res) => {
    const tables = ['client_users', 'server_users', 'emergency_signals'];
    let data = {};

    tables.forEach(table => {
        const query = `SELECT * FROM ${table}`;
        data[table] = db.prepare(query).all();
    });

    res.render("dashboard", { data });
});

// Socket.io setup
let clients = {}; // Store client locations
let emergencies = {}; // Store emergency locations

io.on("connection", function (socket) {
    console.log("Client connected:", socket.id);

    // Send existing clients' locations and emergencies to the new client
    socket.emit("initialize", { clients, emergencies });

    // Map the socket ID to the user ID
    socket.on("register-user", (userId) => {
        clients[socket.id] = { userId };
    });

    // Handle incoming location data
    socket.on("send-location", function (data) {
        clients[socket.id] = { ...clients[socket.id], ...data };

        // Update emergency location if the user is in an emergency state
        if (emergencies[socket.id]) {
            emergencies[socket.id].latitude = data.latitude;
            emergencies[socket.id].longitude = data.longitude;
            io.emit("update-emergency-location", {
                id: socket.id,
                latitude: data.latitude,
                longitude: data.longitude,
                userId: emergencies[socket.id].userId,
                type: emergencies[socket.id].type,
                ipAddress: emergencies[socket.id].ipAddress,
                requestCount: emergencies[socket.id].requestCount,
                timestamp: new Date()
            });
        }

        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Handle emergency button press
    socket.on("emergency", function (data) {
        console.log(`Emergency button pressed by ${socket.id}:`, data);

        // Validate that userId exists
        if (!data.userId) {
            console.error("Emergency signal rejected: userId is missing");
            return;
        }

        // Get the client's IP address
        const ipAddress = socket.handshake.address;

        // Check if there is already an entry for this user and type
        const queryCheck = 'SELECT * FROM emergency_signals WHERE user_id = ? AND type = ? ORDER BY timestamp DESC LIMIT 1';
        const existingSignal = db.prepare(queryCheck).get(data.userId, data.type);

        let requestCount = 1;
        if (existingSignal) {
            requestCount = existingSignal.request_count + 1;
        }

        // Store the emergency signal in the database
        const queryInsert = 'INSERT INTO emergency_signals (user_id, latitude, longitude, type, ip_address, request_count) VALUES (?, ?, ?, ?, ?, ?)';
        db.prepare(queryInsert).run(data.userId, data.latitude, data.longitude, data.type, ipAddress, requestCount);
        console.log("Emergency signal stored in database");

        emergencies[socket.id] = {
            latitude: data.latitude,
            longitude: data.longitude,
            userId: data.userId,
            type: data.type,
            ipAddress: ipAddress,
            requestCount: requestCount,
            timestamp: new Date()
        };
        io.emit("emergency-notification", {
            id: socket.id,
            latitude: data.latitude,
            longitude: data.longitude,
            userId: data.userId,
            type: data.type,
            ipAddress: ipAddress,
            requestCount: requestCount,
            timestamp: new Date()
        });
    });

    // Handle client disconnection
    socket.on("disconnect", function () {
        console.log("Client disconnected:", socket.id);
        delete clients[socket.id];
        delete emergencies[socket.id];
        io.emit("client-disconnected", socket.id);
    });
});

// Listen on all network interfaces
server.listen(3030, '0.0.0.0', () => {
    console.log("Server is running on port 3030");
});