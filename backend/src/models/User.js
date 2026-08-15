import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      maxlength: 254,
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
      index: true,
    },

    /* Email verification */
    emailVerified: {
      type: Boolean,
      default: false,
    },

    /* Account status */
    isActive: {
      type: Boolean,
      default: true,
    },

    /* Login protection */
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },

    lockedUntil: {
      type: Date,
      default: null,
    },

    /* MFA */
    mfaEnabled: {
      type: Boolean,
      default: false,
    },

    mfaSecretEncrypted: {
      type: String,
      default: null,
      select: false,
    },

    mfaRecoveryCodes: {
      type: [
        {
          hash: String,
          usedAt: {
            type: Date,
            default: null,
          },
        },
      ],
      default: [],
      select: false,
    },

    /* Activity */
    lastLoginAt: {
      type: Date,
      default: null,
    },

    passwordChangedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);