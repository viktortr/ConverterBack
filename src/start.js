import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./databaseConnecting.js";
import userRoutes from "./userRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;


// Подключение к базе данных
connectToDatabase();

// Middleware
const allMiddleware = [
  bodyParser.urlencoded({ extended: true }),
  cors(),
  cookieParser(),
  express.json({
    type: ["application/json", "text/plain"],
  }),
  
];

allMiddleware.forEach((elm) => app.use(elm));
// app.use(express.json());

// Роуты
app.use("/api", userRoutes);

// Старт сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});