import { useState, useEffect } from "react";

function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  

  const loadReviews = async () => {
    const response = await fetch("http://127.0.0.1:8001/reviews");
    const data = await response.json();
    setReviews(data);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const clearReviews = async () => {
    await fetch("http://127.0.0.1:8001/reviews", {
      method: "DELETE",
    });

    setReviews([]);
    setReview("");
    setSelectedReview(null);
  };

  const reviewCode = async () => {
    setLoading(true);

    const response = await fetch(
      "http://127.0.0.1:8001/review",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
        }),
      }
    );

    const data = await response.json();

    setReview(data.review);

    await loadReviews();

    setLoading(false);
  };

  return (

    <div
  className={`min-h-screen w-full p-10 ${
    darkMode
      ? "bg-gray-900 text-white"
      : "bg-gray-100 text-black"
  }`}
>
      <div
  className={`max-w-4xl mx-auto p-6 rounded-xl shadow ${
    darkMode
      ? "bg-gray-800"
      : "bg-white"
  }`}
>
        <h1 className="text-3xl font-bold mb-6">
          AI Code Review Assistant
        </h1>
        <button
  onClick={() => setDarkMode(!darkMode)}
  className="mb-6 bg-purple-600 text-white px-4 py-2 rounded"
>
  {darkMode
      ? "☀️ Bring Back The Bugs"
      : "🌙 Hide From The Bugs"}
</button>
        <select
          className={`border p-3 rounded w-full mb-4 ${
  darkMode
    ? "bg-gray-700 text-white"
    : "bg-white text-black"
}`}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="go">Go</option>
        </select>

        <textarea
          rows="12"
          className="border p-3 rounded w-full mb-4"
          placeholder="Paste code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={reviewCode}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          disabled={loading}
        >
          {loading ? "⏳ Analyzing Code..." : "Review Code"}
        </button>

        <button
          onClick={clearReviews}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        >
          Delete All Reviews
        </button>

        {loading && (
          <div className="mt-4 flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
            <span>Analyzing code...</span>
          </div>
        )}

        {review && (
          <div className="mt-6 bg-gray-50 p-4 rounded">
            <h2 className="font-bold mb-2">AI Review</h2>

            <pre className="whitespace-pre-wrap">
              {review}
            </pre>
          </div>
        )}

        <div className="mt-8">
  <h2 className="text-xl font-bold mb-4">
    Review History
  </h2>

  {reviews.length === 0 && (
    <p className="text-gray-400">
      No reviews yet. Submit some code!
    </p>
  )}

  {reviews.map((item) => (
            <div
              key={item.id}
              className="border rounded p-3 mb-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedReview(item)}
            >
              <strong>{item.language}</strong>
              <p>Review #{item.id}</p>
            </div>
          ))}
        </div>

        {selectedReview && (
          <div className="mt-6 bg-blue-50 p-4 rounded">
            <h2 className="font-bold mb-2">
              Review #{selectedReview.id}
            </h2>

            <p>
              <strong>Language:</strong>{" "}
              {selectedReview.language}
            </p>

            <pre className="whitespace-pre-wrap mt-3">
              {selectedReview.review}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;