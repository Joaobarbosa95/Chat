require("dotenv").config();

const { connect } = require("mongoose");

function connectToDatabase() {
  connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  }).catch((e) => {
    console.log("Offline database");

    // On failure, try every minute reconnect to database
    setTimeout(() => {
      connectToDatabase();
    }, 60000);
  });
}

connectToDatabase();
