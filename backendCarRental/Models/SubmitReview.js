import mongoose from "mongoose";

const SubmitReviewSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  comment: { 
    type: String, 
    required: [true, "Comment is required"],
    trim: true,
    minlength: [10, "Comment must be at least 10 characters"],
    maxlength: [1000, "Comment cannot exceed 1000 characters"]
  },
  rating: { 
    type: Number, 
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"]
  },
}, { 
  timestamps: true // Add createdAt and updatedAt fields
});

const Review = mongoose.model("SubmitReview", SubmitReviewSchema);
export default Review;