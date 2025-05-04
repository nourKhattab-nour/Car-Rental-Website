import Payment from "../Models/Payment.js";

export const createPayment = async (req, res) => {
  try {
    const { userId, booking, paymentDetails, method } = req.body;

    // Validation is already handled by middleware
    // Create new payment record
    const newPayment = new Payment({
      user: userId,
      carName: booking.carName || "N/A",
      carCategory: booking.carCategory || "N/A",
      carImage: booking.carImage || "",
      amount: booking.totalPrice || 0,
      method,
      status: "Completed",
      details: paymentDetails,
    });

    await newPayment.save();
    
    res.status(201).json({ 
      success: true,
      message: "Payment recorded successfully", 
      payment: newPayment 
    });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to record payment", 
      error: error.message 
    });
  }
};

export const getPaymentsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Validation is already handled by middleware
    const payments = await Payment.find({ user: userId })
      .sort({ createdAt: -1 }); // Sort by newest first
    
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch payments", 
      error: error.message 
    });
  }
};