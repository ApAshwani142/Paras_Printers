const { z } = require("zod");

const quoteSchema = z.object({
  companyName: z.string().min(2),
  contactPerson: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  productType: z.string().min(1),
  quantity: z.number().min(100),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  customNotes: z.string().optional(),
});

const submitQuote = async (req, res) => {
  try {
    const validated = quoteSchema.parse(req.body);
    console.log("New B2B Quote Submission Received:", validated);

    return res.status(201).json({
      success: true,
      message: "Quote request received successfully. Our team will contact you shortly.",
      data: validated,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.errors ? err.errors[0].message : "Invalid quote request data",
    });
  }
};

module.exports = { submitQuote };
