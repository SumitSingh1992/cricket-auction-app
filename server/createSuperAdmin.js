require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./src/models/Admin");

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    name: "Super Admin",
    email: "admin@gmail.com",
    password: hashedPassword,
    role: "SUPER_ADMIN",
  });

  console.log("SUPER ADMIN CREATED");

  process.exit();
};

createAdmin();
