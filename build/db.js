// import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

// const uri= process.env.DB_URI;

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("✅ Connected to Mongodb");
  } catch (error) {
    console.error(error);
  }
}
connect();