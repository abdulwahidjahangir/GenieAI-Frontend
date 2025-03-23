import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [dietaryRestriction, setDietaryRestriction] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);

  const handleGenerateRecipe = async (e) => {
    e.preventDefault();

    if (!ingredients.trim()) {
      toast.error("Please enter ingredients!");
      return;
    }

    setLoading(true);
    setRecipe(null);
    toast.loading("Generating recipe...");

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_AI_API_URL}/generate-recipe`,
        {
          params: {
            ingredients: ingredients,
            cuisineType: cuisineType,
            dietaryRestriction: dietaryRestriction,
          },
        }
      );

      if (res.status !== 200) {
        toast.dismiss();
        toast.error("Error generating recipe. Please try again later.");
        return;
      }

      toast.dismiss();
      setRecipe(res.data); // Store the response text as it is
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
        onSubmit={handleGenerateRecipe}
        disabled={loading}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          className="py-2 px-4 bg-gray-300 text-[18px] rounded-md outline-0"
          placeholder="Enter ingredients (required)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          disabled={loading}
        />

        <input
          type="text"
          className="py-2 px-4 bg-gray-300 text-[18px] rounded-md outline-0"
          placeholder="Enter cuisine type (optional)"
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
          disabled={loading}
        />

        <input
          type="text"
          className="py-2 px-4 bg-gray-300 text-[18px] rounded-md outline-0"
          placeholder="Enter dietary restriction (optional)"
          value={dietaryRestriction}
          onChange={(e) => setDietaryRestriction(e.target.value)}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="py-2 px-6 rounded-md mt-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold shadow-lg transition-all duration-300 ease-in-out transform cursor-pointer hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Generate Recipe
        </button>
      </form>

      {loading && (
        <div className="mt-4 text-center text-lg text-gray-800">
          Generating your recipe...
        </div>
      )}

      {recipe && !loading && (
        <div
          className="mt-4 rounded-md relative"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {hover && (
            <Link
              href={`mailto:?subject=Recipe&body=${encodeURIComponent(recipe)}`}
              className="absolute top-0 right-0 bg-black text-white px-4 py-2 opacity-80 hover:opacity-100 z-10"
            >
              Copy Recipe
            </Link>
          )}
          <div className="container mx-auto p-4 border">
            <pre className="recipe-text whitespace-pre-wrap break-words overflow-auto">
              {recipe}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
