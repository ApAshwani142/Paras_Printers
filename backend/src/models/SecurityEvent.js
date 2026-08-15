import mongoose from "mongoose";

const securityEventSchema =
  new mongoose.Schema(
    {
      eventType: {
        type: String,
        required: true,
        index: true,
      },

      severity: {
        type: String,
        enum: [
          "info",
          "low",
          "medium",
          "high",
          "critical",
        ],
        default: "info",
      },

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
        index: true,
      },

      ip: {
        type: String,
        default: null,
      },

      userAgent: {
        type: String,
        default: null,
      },

      requestId: {
        type: String,
        default: null,
        index: true,
      },

      metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "SecurityEvent",
  securityEventSchema
);