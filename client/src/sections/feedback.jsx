import { useState } from "react";

const FeedbackForm = () => {
  const [reason, setReason] = useState("");
  
  const handleSubmit = () => {
    if ( !reason) {
        alert("Please fill in feedback before submitting.");
        return;
      }
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mayankmonu9182j@gmail.com&su=UserFeedback&body=Email:mayankmonu9182j@gmail.com%0D%0AFeedback: ${encodeURIComponent(reason)}`;

    window.open(gmailComposeUrl, "_blank");
    setReason("");


  };

  return (
    <div className="flex justify-center items-center py-10 bg-[#f3f5f6]">
      <div 
       
        className="bg-blue-100   shadow-lg shadow-slate-500 rounded-2xl p-10 w-[40%]"
      >
        <h2 className="text-xl font-bold text-center">Share Your Thoughts</h2>
        <p className="text-base text-gray-500 text-center mb-6">
          How has your experience been? We would love to hear your feedback!
        </p>
        <textarea
          className="w-full p-3 border rounded-lg mb-6"
          placeholder="Mention a reason for your feedback"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-5 py-3 rounded-lg" onClick={handleSubmit}>
            Submit
          </button>
          <button className="bg-gray-300 text-black px-5 py-3 rounded-lg" onClick={() => setReason("")}> 
            Cancel
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default FeedbackForm;
