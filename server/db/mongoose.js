require("dotenv").config();

const { connect } = require("mongoose");

connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
