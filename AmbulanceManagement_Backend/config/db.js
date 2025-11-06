const oracledb = require("oracledb");

// ✅ Enable Oracle Client
oracledb.initOracleClient({ libDir: "C:\\Oracel\\instantclient_19_28" });

const dbConfig = {
  user: "scott",
  password: "tiger",
  connectString: "localhost:1521/XE",
};

// ✅ Helper function to get connection
async function getConnection() {
  return await oracledb.getConnection(dbConfig);
}

module.exports = { oracledb, getConnection };
