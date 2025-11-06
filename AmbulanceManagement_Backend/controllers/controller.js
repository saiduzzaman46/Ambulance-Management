const {
  registerUser,
  loginUser,
  createBooking,
  loginAdmin,
  fetchSystemTotals,
} = require("../models/model");
const { get } = require("../routes/authRoutes");

async function register(req, res) {
  // console.log(req.body);
  try {
    const user = req.body;

    // Basic validation
    if (!user.username || !user.password || !user.firstName || !user.lastName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await registerUser(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);

    if (err.message.includes("unique constraint")) {
      return res.status(400).json({ message: "Username already exists" });
    }

    res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function adminLogin(req, res) {
  try {
    const { username, password } = req.body;
    const admin = await loginAdmin(username, password);
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json(admin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function estimatesValue(req, res) {
  const { ambulanceTypeId } = req.body; // <-- use body, not query

  if (!ambulanceTypeId)
    return res.status(400).json({ error: "Ambulance type required" });

  const estimatesArray = [
    { fare: 85, time: 10, distance: 5 },
    { fare: 120, time: 12, distance: 8 },
    { fare: 150, time: 15, distance: 10 },
    { fare: 200, time: 18, distance: 15 },
    { fare: 250, time: 20, distance: 20 },
    { fare: 300, time: 25, distance: 25 },
    { fare: 350, time: 30, distance: 30 },
    { fare: 400, time: 35, distance: 35 },
    { fare: 450, time: 40, distance: 40 },
    { fare: 500, time: 45, distance: 45 },
  ];

  const randomIndex = Math.floor(Math.random() * estimatesArray.length);
  const estimate = estimatesArray[randomIndex];

  res.json({
    fare: estimate.fare,
    time: estimate.time,
    distance: estimate.distance,
  });
}

async function bookAmbulance(req, res) {
  try {
    const {
      pickup,
      dropoff,
      distanceKm,
      estimatedFare,
      actualFare,
      userId,
      ambulanceId,
    } = req.body;

    // console.log(req.body);

    if (
      !pickup ||
      !userId ||
      !ambulanceId ||
      !estimatedFare ||
      !actualFare ||
      !distanceKm
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }
    const fairId = ambulanceId; // Assuming ambulanceId corresponds to Fare_ID
    const booking = await createBooking({
      pickup,
      dropoff,
      distanceKm,
      estimatedFare,
      actualFare,
      userId,
      fairId,
      ambulanceId,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while creating booking" });
  }
}

async function getSystemTotals(req, res) {
  try {
    const totals = await fetchSystemTotals();
    res.status(200).json(totals);
  } catch (err) {
    console.error("Controller error:", err);
    res.status(500).json({ error: "Error fetching system totals" });
  }
}
module.exports = {
  register,
  login,
  estimatesValue,
  bookAmbulance,
  adminLogin,
  getSystemTotals,
};
