import Contact from "../models/ContactUs.js";

export const submitContactForm = async (req, res) => {
  const { firstName, lastName, email, queryType, message, consent } = req.body;

  // Validation is already handled by middleware
  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      queryType,
      message,
      consent,
    });

    await newContact.save();
    
    res.status(201).json({ 
      success: true,
      message: "Form submitted and saved successfully." 
    });
  } catch (err) {
    console.error("Error saving contact form:", err);
    
    // Check for specific error types
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: "Validation error", 
        errors: Object.values(err.errors).map(error => error.message)
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: "Server error. Please try again later.",
      error: err.message
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    // Add optional pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    // Add optional filtering
    const filter = {};
    if (req.query.queryType) {
      filter.queryType = req.query.queryType;
    }
    
    // Get total count for pagination info
    const total = await Contact.countDocuments(filter);
    
    // Get contacts with pagination and filtering
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: contacts
    });
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ 
      success: false,
      message: "Unable to fetch contact requests.",
      error: err.message
    });
  }
};