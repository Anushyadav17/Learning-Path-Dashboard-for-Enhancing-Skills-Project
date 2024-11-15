import React, { useState } from 'react';
import { toast } from 'react-hot-toast';  // Import toast for notifications
import { apiConnector } from '../../../services/apiconnector';
import IconBtn from '../../comman/IconBtn'; // Assuming IconBtn is reusable

const AIchat = () => {
  const [response, setResponse] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a valid prompt');
      return;
    }

    setLoading(true);
    try {
      const res = await apiConnector("POST", "http://localhost:4000/api/v1/auth/classify", { prompt });
      console.log("AI Response:", res);

      // Set the response if successful
      if (res?.data?.response) {
        setResponse(res.data.response);
      } else {
        toast.error('No valid response from the AI');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Error generating content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="mb-8 text-3xl font-semibold text-black">Chat with an AI Instructor</h1>

      {/* Input Section */}
      <div className="flex flex-col bg-white rounded-md border-[1px] border-pure-greys-50 p-6 shadow-md mb-8">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here"
          rows="4"
          cols="50"
          className="resize-none p-4 text-sm rounded-md border-[1px] border-pure-greys-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4 flex justify-end">
          <IconBtn
            text={loading ? "Loading..." : "Generate Response"}
            onclick={handleSubmit}
            disabled={loading}
          />
        </div>
      </div>

      {/* AI Response Section */}
      {response && (
        <div className="flex flex-col bg-white rounded-md border-[1px] border-pure-greys-50 p-6 shadow-md mb-8">
          <h3 className="text-lg font-semibold text-black mb-4">Response from AI:</h3>
          <p className="text-sm font-medium text-richblack-500">{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIchat;
