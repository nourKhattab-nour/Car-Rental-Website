import Payment from "../Models/Payment.js";

export const createPayment = async (req, res) => {
  try {
    const { userId, booking, paymentDetails, method } = req.body;

    if (!userId || !booking || !method) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPayment = new Payment({
      user: userId,
      carName: booking.carName || "N/A",
      carCategory: booking.carCategory || "N/A",
      carImage: booking.carImage || "", // Add this line
      amount: booking.totalPrice || 0,
      method,
      status: "Completed",
      details: paymentDetails,
    });

    await newPayment.save();
    res.status(201).json({ message: "Payment recorded", payment: newPayment });
  } catch (error) {
    console.error("💥 Payment Error:", error);
    res.status(500).json({ error: "Failed to record payment" });
  }
};

export const getPaymentsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const payments = await Payment.find({ user: userId });
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
};
