const Header = ({ activeTab, handleTabChange }) => {

    return (
        <div className="flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Genie AI</h1>
            <p className="text-gray-600 max-w-md">
                Your AI-powered assistant—generate recipes, answer questions, and create stunning images.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
                {["image-generator", "ASK", "recipe-generator"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        disabled={activeTab === tab}
                        className={`px-6 py-2 font-semibold rounded-xl transition-all duration-300 shadow-md
                        ${activeTab === tab ? "bg-orange-500 text-white shadow-lg" :
                                "bg-gray-200 text-gray-700 hover:bg-orange-400 hover:text-white"}`}
                    >
                        {tab.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Header;
