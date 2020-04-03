import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes";
import cors from "cors";
import http from "http";
import { setupWebsockt } from "./websocket";

const app = express();
const server = new http.Server(app);
setupWebsockt(server);

mongoose.connect(
  "mongodb+srv://leonardocpn:rd1macsenhamongo@cluster0-aoexk.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3321);
