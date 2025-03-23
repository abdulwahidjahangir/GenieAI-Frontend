import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast.error("Please enter a prompt!");
      return;
    }

    setLoading(true);
    setResponse("");
    toast.loading("Generating response...");

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_AI_API_URL}/ask-ai`,
        {
          params: { prompt },
        }
      );

      if (res.status !== 200) {
        throw new Error("Unexpected response from server");
      }

      toast.dismiss();
      setResponse(res.data);
      setPrompt("");
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong, please try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 p-4">
      <form onSubmit={handleSubmit} disabled={loading} className="flex gap-2">
        <input
          type="text"
          className="flex-grow py-2 px-4 bg-gray-300 text-[18px] rounded-md outline-0"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
      </form>
      {response && (
        <div className="mt-4 p-4 rounded-md bg-gradient-to-r from-blue-100 to-purple-200 shadow-md text-lg text-gray-800 font-semibold">
          {response}
        </div>
      )}
    </div>
  );
};

export default Chat;
