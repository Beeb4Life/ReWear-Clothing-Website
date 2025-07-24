// server.js
import express from "express";
import cors from "cors"; // ✅ Add this
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors()); // ✅ Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file?.filename;

    if (!name || !price || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const product = { name, price, image };

    const filePath = path.join(__dirname, "products.json");
    let products = [];

    if (fs.existsSync(filePath)) {
      products = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }

    products.push(product);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    res.status(200).json({ message: "Product uploaded successfully!" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/products", (req, res) => {
  const filePath = path.join(__dirname, "products.json");
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.status(200).json(data);
  } else {
    res.status(200).json([]);
  }
});

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
