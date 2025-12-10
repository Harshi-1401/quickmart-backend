import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/create-admin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin User",
      email: "admin@quickmart.com",
      password: hashedPassword,
      phone: "8122853115",
      address: "HQ",
      role: "admin"
    });

    await admin.save();
    res.send("Admin created successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
