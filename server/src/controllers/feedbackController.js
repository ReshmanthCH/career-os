import Feedback from "../models/Feedback.js";

// POST /api/v1/feedback
export const submitFeedback = async (req, res, next) => {
  try {
    const { category, rating, subject, message } = req.body;
    const userId = req.user._id;

    if (!subject || !subject.trim()) {
      return res.status(400).json({
        success: false,
        message: "Feedback subject is required.",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Feedback message is required.",
      });
    }

    const feedback = new Feedback({
      user: userId,
      category: category || "General Feedback",
      rating: Number(rating) || 5,
      subject: subject.trim(),
      message: message.trim(),
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: "Thank you! Your feedback has been submitted successfully to the Devryn team.",
      feedback,
    });
  } catch (error) {
    next(error);
  }
};
