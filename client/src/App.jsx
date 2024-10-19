import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [error, setError] = useState("");

  async function handleVideoInfo(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://fbdownbackend.vercel.app/videoInfo",
        {
          videoUrl,
        }
      );

      setVideoInfo(response.data);
      setError("");
    } catch (error) {
      console.error(error);
      setVideoInfo(null);
      setError("Failed to get video information.");
    }
  }

  return (
    <>
      <div className="fdown-container">
        <div>
          <h1>Facebook video downloader</h1>
          <form className="input-container">
            <input
              className="text-field"
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <button
              className="submit-btn"
              type="submit"
              onClick={handleVideoInfo}
            >
              Get Info
            </button>
          </form>
        </div>
        {error && <p className="error">{error}</p>}
        {videoInfo && (
          <div className="result-container">
            <img
              style={{ height: "144px", width: "256px" }}
              src={videoInfo.Thumbnail}
              alt="video thumbnail"
            />
            <div className="video-info">
              <h2 className="video-title">Video Title: {videoInfo.title}</h2>
              <div className="video-fmt-list">
                <p>duration: {videoInfo.duration}</p>
                <a className="download-btn" href={videoInfo.SD}>
                  Standard Video
                </a>
                <a className="download-btn" href={videoInfo.HD}>
                  High Resolution Video Link
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
