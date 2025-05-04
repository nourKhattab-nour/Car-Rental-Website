import Review from "../models/SubmitReview.js"

export const createReview = async (req, res) => {
  try {
    const { name, email, comment, rating } = req.body

    // Validation is already handled by middleware
    // Create new review
    const newReview = new Review({
      name,
      email,
      comment,
      rating,
    })

    await newReview.save()

    res.status(201).json({ 
      success: true,
      message: "Review submitted successfully!", 
      review: newReview 
    })
  } catch (error) {
    console.error("Review submission error:", error)
    
    // Check for specific error types
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: "Validation error", 
        errors: Object.values(error.errors).map(err => err.message)
      })
    }
    
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message 
    })
  }
}

export const getReviews = async (req, res) => {
  try {
    // Add optional pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Get total count for pagination info
    const total = await Review.countDocuments();
    
    // Get reviews with pagination
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: reviews
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    res.status(500).json({ 
      success: false,
      message: "Server error", 
      error: error.message 
    })
  }
}