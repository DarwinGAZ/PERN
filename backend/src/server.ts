import express from "express";
import cors from "cors";
import { routes } from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3333, () => {
    console.log("Servidor rodando em http://localhost:3333");
});
