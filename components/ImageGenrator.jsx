import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleGenerateImage = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      toast.error("Please enter a prompt!");
      return;
    }

    setLoading(true);
    setImageUrl("");
    toast.loading("Generating image...");

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_AI_API_URL}/generate-image`,
        {
          params: { prompt: prompt },
        }
      );

      if (res.status !== 200) {
        toast.dismiss();
        toast.error("Error generating image. Please try again later.");
        return;
      }

      toast.dismiss();
      setImageUrl(res.data[0]);
      setPrompt("");
    } catch (error) {
      toast.dismiss();
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong, please try again later!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 p-4">
      <form
        onSubmit={handleGenerateImage}
        disabled={loading}
        className="flex gap-2"
      >
        <input
          type="text"
          className="flex-grow py-2 px-4 bg-gray-300 text-[18px] rounded-md outline-0"
          placeholder="Enter prompt for image generation..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />
      </form>

      {loading && (
        <div className="mt-4 text-center text-lg text-gray-800">
          Generating your image...
        </div>
      )}

      {imageUrl && !loading && (
        <div
          className="mt-4 rounded-md relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover && (
            <Link
              href={imageUrl}
              download
              className="absolute top-0 left-0 bg-black text-white px-4 py-2 opacity-80 hover:opacity-100 z-10"
            >
              Download
            </Link>
          )}
          <img
            src={imageUrl}
            alt="Generated Image"
            className="rounded-md w-[400px] h-[400px] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
