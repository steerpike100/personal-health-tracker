import express from "express"; // ✅ Correct!
import type { Request, Response } from "express"; // ✅ Import types separately
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express(); // No need to specify Application type

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, World!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
