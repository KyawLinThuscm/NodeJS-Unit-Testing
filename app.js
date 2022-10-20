import express from "express";
import path from "path";

import router from "./api.js";

const app = express();

app.use(express.json());

app.use('/api', router);

export default app;