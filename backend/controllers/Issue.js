import Issue from "../models/issue.js";
import  uploadImageToCloudinary  from "../utils/imageUploader.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


export const getIssues = async (req, res) => {
    try {
      const userId = req.user.id;
      const issues = await Issue.find({ user: userId });
  
      res.status(200).json({ 
        success: true, 
        data: issues, 
        message: issues.length ? "Issues retrieved successfully" : "No issues found" 
      });
  
    } catch (error) {
      console.error("Error fetching issues:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };


  export const getAllIssues = async (req, res) => {
    try {
        const issues = await Issue.find().populate("user"); 

        res.status(200).json({ 
            success: true, 
            data: issues, 
            message: issues.length ? "Issues retrieved successfully" : "No issues found" 
        });

    } catch (error) {
        console.error("Error fetching issues:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

  




export const createIssue = async (req, res) => {
  try {
    const { category, desc,latitude,longitude } = req.body;
   
    if (!category || !desc || !latitude || !longitude) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    
    const attachment = req.files?.attachment ;

    let attachmentImage;
    if(attachment){
         attachmentImage = await uploadImageToCloudinary(attachment, process.env.FOLDER_NAME ,1000,
          1000);
      
    }
    console.log("attachimage"+attachmentImage)
   const image =attachmentImage?.secure_url; 

   const location={
     longitude:longitude,
     latitude:latitude,
   }
    const newIssue = new Issue({
        user: req.user.id,
        category,
        desc,
        attachment: image,  
        location,
      });
      

    await newIssue.save();

    res.status(201).json({ success: true, message: "Issue reported successfully", data: newIssue });
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const updateIssueStatus = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Resolved","In Progress"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(
      issueId,
      { status },
      { new: true }
    );

    if (!updatedIssue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    res.status(200).json({ success: true, message: "Issue status updated", data: updatedIssue });
  } catch (error) {
    console.error("Error updating issue status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteIssue = async (req, res) => {
  try {
    const { issueId } = req.params;

    const deletedIssue = await Issue.findByIdAndDelete(issueId);

    if (!deletedIssue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    res.status(200).json({ success: true, message: "Issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const getAddress = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          "User-Agent": "smartmess-app",
        },
      }
    );

    return res.status(200).json({
      success: true,
      address: response.data.display_name,
      full: response.data
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Address not found"
    });
  }
};


