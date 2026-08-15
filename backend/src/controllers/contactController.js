const { z } = require("zod");

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(3),
  message: z.string().min(10),
});

const submitContact = async (req, res) => {
  try {
    const validated = contactSchema.parse(req.body);
    console.log("New Contact Inquiry Received:", validated);

    return res.status(201).json({
      success: true,
      message: "Contact inquiry received successfully.",
      data: validated,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.errors ? err.errors[0].message : "Invalid contact data",
    });
  }
};

module.exports = { submitContact };
