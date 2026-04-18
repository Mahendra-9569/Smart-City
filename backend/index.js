import express from "express";
import { connectDB } from "./config/database.js"; 
import authRoute from "./routes/Auth.js";
import issueRoute from "./routes/Issue.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { cloudinaryConnect } from "./config/cloudinary.js";
import fileUpload from "express-fileupload";
import http from "http";
import { Server } from "socket.io";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mongoose from "mongoose";
import Issue from "./models/issue.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
connectDB();
cloudinaryConnect();

const PORT = process.env.PORT || 4000;
const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/issues", issueRoute);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", async ({ message, userId }) => {
    let botResponse = "I'm here to assist you with smart city concerns!";

    
    const pendingIssues = await Issue.find({ user: userId, status: { $ne: "Resolved" } }).sort({ date: -1 });

    if (message.toLowerCase().includes("report issue")) {
      botResponse = "Sure! Please provide the issue category (e.g., Road Damage, Water Leakage, Power Outage, Street Light Problem, Traffic Signal Issue, Public Transport Delay).";
    } 
    else if (message.toLowerCase().includes("check status")) {
      if (pendingIssues.length > 0) {
        botResponse = `You have **${pendingIssues.length} pending issue(s)**:\n\n` +
          pendingIssues.map(issue => `- **${issue.category}** (Status: **${issue.status}**)`).join("\n");
      } else {
        botResponse = "You have no pending issues at the moment.";
      }
    } 
    else if (message.toLowerCase().includes("nearest hospital")) {
      botResponse = "The nearest hospital is **City Care Hospital** at **123 Main St**.";
    } 
    else if (message.toLowerCase().includes("garbage collection schedule")) {
      botResponse = "Garbage collection in your area happens every **Monday and Thursday at 7 AM**.";
    } 
    else {
      try {
        // Personalized Gemini prompt
        const prompt = `
        You are a chatbot for a Smart City service, assisting users with issues like road damage, water leakage, power outages, and public services.
        The user has reported the following pending issues: 
        ${pendingIssues.length > 0 
          ? pendingIssues.map(issue => `- ${issue.category} (Status: ${issue.status})`).join("\n") 
          : "No pending issues"}.
        
        Answer in a **helpful, professional, and concise manner**.
        
        User Query: "${message}"
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
        botResponse = result.response.text();
      } catch (error) {
        console.error("Gemini API Error:", error);
        botResponse = "Sorry, I'm having trouble processing your request.";
      }
    }

    socket.emit("receiveMessage", { reply: botResponse });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("SERVER RUNNING");
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
