import express from "express";
import fbDownloader from "fb-downloader-scrapper";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function formatDuration(ms) {
  const hrs = Math.floor(ms / 1000 / 3600);
  const mins = Math.floor(ms / 1000 / 60);
  const secs = Math.floor(ms / 1000);
  return `${hrs > 0 ? hrs + ":" : ""}${mins > 9 ? mins : "0" + mins}:${
    secs > 9 ? secs : "0" + secs
  }`;
}

app.get("/", (req, res) => {
  // res.send("Hello World");
  res.json({ message: "Welcom to my facebook video downloader app!" });
});

app.post("/videoInfo", async (req, res) => {
  const { videoUrl } = req.body;

  try {
    const videoInfo = await fbDownloader(videoUrl);
    console.log("Awaiting video info");
    const videoDetails = {
      title: videoInfo.title,
      // duration: videoInfo.duration_ms,
      duration: formatDuration(videoInfo.duration_ms),
      HD: videoInfo.hd,
      SD: videoInfo.sd,
      Thumbnail: videoInfo.thumbnail,
    };
    res.json(videoDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch video information" });
  }
});

app.get("/download/", (req, res) => {
  const videoUrl = "https://web.facebook.com/share/v/M2BDwFGf16nd763k/";

  fbDownloader(videoUrl).then((result) => {
    console.log(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
