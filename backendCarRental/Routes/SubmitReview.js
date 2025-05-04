import express from "express";
import { createReview, getReviews } from "../Controllers/SubmitReview.js";
import { createReviewValidation } from "../middlewares/validation.js";

const router = express.Router();

// Apply validation middleware to the create review route
router.post("/SubmitReview", createReviewValidation, createReview);
router.get("/SubmitReview", getReviews);

export default router;