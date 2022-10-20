import { Router } from "express";

const router = new Router();

router.get("/", (_req, res) => {
	res.json({ message: "Get All" });
});

router.post("/", (req, res) => {
	console.log(req)
	res.json({ message: "Created Successfully" });
});
export default router;