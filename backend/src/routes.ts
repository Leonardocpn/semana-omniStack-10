import { Router } from "express";
import { storeDev, indexDev } from "./controllers/DevController";
import { indexSearch } from "./controllers/SearchController";
export const routes = Router();

routes.post("/devs", storeDev);
routes.get("/devs", indexDev);
routes.get("/search", indexSearch);
