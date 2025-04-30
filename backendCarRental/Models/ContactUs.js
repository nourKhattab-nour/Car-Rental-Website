import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  queryType: {
    type: String,
    enum: ["General Enquiry", "Support Request"],
    required: true,
  },
  message: { type: String, required: true },
  consent: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
