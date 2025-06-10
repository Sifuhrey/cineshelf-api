//@ts-nocheck
import express from "express";
import CinemaController from "../controller/cinema_controller";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/cinemas", CinemaController.index);
router.get("/cinemas/:id", CinemaController.show);
router.post("/cinemas", upload.single("image"), CinemaController.store);
router.put("/cinemas/:id", upload.single("image"), CinemaController.update);
router.delete("/cinemas/:id", CinemaController.destroy);

export default router;