const { getConnection, oracledb } = require("../config/db");

// Create new user
async function registerUser(user) {
  const conn = await getConnection();
  try {
    const sql = `INSERT INTO App_Users (
  User_ID, Phone_Number, First_Name, Last_Name, Age, Gender, Street, City, State, ZipCode, Username, PASSWORD
) VALUES (
  user_seq.NEXTVAL, :phone, :firstName, :lastName, :age, :gender, :street, :city, :state, :zip, :username, :password
)`;

    const binds = {
      phone: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      gender: user.gender,
      street: user.street,
      city: user.city,
      state: user.state,
      zip: user.zipCode,
      username: user.username,
      password: user.password,
    };

    await conn.execute(sql, binds, { autoCommit: true });
    return true;
  } finally {
    await conn.close();
  }
}

async function loginUser(username, password) {
  const conn = await getConnection();
  try {
    const sql = `SELECT * FROM App_Users WHERE Username = :username AND PASSWORD = :password`;
    const binds = { username, password };
    const result = await conn.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return result.rows[0];
  } finally {
    await conn.close();
  }
}

async function loginAdmin(username, password) {
  const conn = await getConnection();
  try {
    const sql = `SELECT * FROM Admin WHERE Username = :username AND PASSWORD = :password`;
    const binds = { username, password };
    const result = await conn.execute(sql, binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    return result.rows[0];
  } finally {
    await conn.close();
  }
}

async function createBooking(bookingData) {
  const conn = await getConnection();
  try {
    const sql = `INSERT INTO Booking (
      Booking_ID, Pickup_Location, Dropoff_Location, Distance_KM, Estimated_Fare, Actual_Fare, User_ID,Fare_ID, Ambulance_ID
    ) VALUES (
      booking_seq.NEXTVAL, :pickup, :dropoff, :distanceKm, :estimatedFare, :actualFare, :userId,:fairId, :ambulanceId
    )`;
    const binds = {
      pickup: bookingData.pickup,
      dropoff: bookingData.dropoff,
      distanceKm: bookingData.distanceKm,
      estimatedFare: bookingData.estimatedFare,
      actualFare: bookingData.actualFare,
      userId: bookingData.userId,
      fairId: bookingData.fairId,
      ambulanceId: bookingData.ambulanceId,
    };
    const result = await conn.execute(sql, binds, { autoCommit: true });
    return result;
  } finally {
    await conn.close();
  }
}
async function fetchSystemTotals() {
  let conn;
  try {
    conn = await getConnection();

    const result = await conn.execute(
      `BEGIN :cursor := get_system_totals; END;`,
      { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } }
    );

    const rs = result.outBinds.cursor;
    const rows = await rs.getRows(); // only one row expected
    await rs.close();

    const [ambulance, booking, driver] = rows[0];

    return {
      ambulance,
      booking,
      driver,
    };
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error("DB close error:", err);
      }
    }
  }
}

// CREATE OR REPLACE FUNCTION get_system_totals
//   RETURN SYS_REFCURSOR
// AS
//   result_cursor SYS_REFCURSOR;
// BEGIN
//   OPEN result_cursor FOR
//     SELECT
//       (SELECT COUNT(*) FROM Ambulance) AS total_ambulances,
//       (SELECT COUNT(*) FROM Booking)   AS total_bookings,
//       (SELECT COUNT(*) FROM Driver)    AS total_drivers
//     FROM dual;

//   RETURN result_cursor;
// END;
// /

module.exports = {
  registerUser,
  loginUser,
  createBooking,
  loginAdmin,
  fetchSystemTotals,
};

// async function loginUser(username, password) {
//   const conn = await getConnection();
//   try {
//     const result = await conn.execute(
//       `BEGIN login_user(:p_username, :p_password, :p_user_id); END;`,
//       {
//         p_username: username, // IN parameter
//         p_password: password, // IN parameter
//         p_user_id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }, // OUT parameter
//       }
//     );

//     if (result.outBinds.p_user_id) {
//       return { USER_ID: result.outBinds.p_user_id };
//     } else {
//       return null; // invalid credentials
//     }
//   } finally {
//     await conn.close();
//   }
// }
