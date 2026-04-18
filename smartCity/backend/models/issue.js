import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true   
  },
  category: {
    type: String,
    enum: ["Road Damage", "Water Leakage", "Power Outage", "Garbage Collection", "Other"], 
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  attachment: {
    type: String, 
  },
  date: {
    type: Date,
    default: Date.now, 
  },
  status: {
    type: String,
    enum: ["Pending","In Progress", "Resolved"],
    default: "Pending",
  },
  location: {
    latitude: { type: Number, required: true }, 
    longitude: { type: Number, required: true },
  },
}, { timestamps: true }); 

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
