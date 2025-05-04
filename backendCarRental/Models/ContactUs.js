import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters"],
    maxlength: [50, "First name cannot exceed 50 characters"]
  },
  lastName: { 
    type: String, 
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters"],
    maxlength: [50, "Last name cannot exceed 50 characters"]
  },
  email: { 
    type: String, 
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  queryType: {
    type: String,
    enum: {
      values: ["General Enquiry", "Support Request"],
      message: "Query type must be either 'General Enquiry' or 'Support Request'"
    },
    required: [true, "Query type is required"]
  },
  message: { 
    type: String, 
    required: [true, "Message is required"],
    trim: true,
    minlength: [10, "Message must be at least 10 characters"],
    maxlength: [1000, "Message cannot exceed 1000 characters"]
  },
  consent: { 
    type: Boolean, 
    required: [true, "Consent is required"],
    validate: {
      validator: function(value) {
        return value === true;
      },
      message: "You must consent to our terms"
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  status: {
    type: String,
    enum: ["New", "In Progress", "Resolved"],
    default: "New"
  }
});

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;