export const errorHandler = (
  err,
  req,
  res,
  next
) => {
  console.error( "Backend Error:", err);

  const status = err.statusCode || 500;

  const message =
    process.env.NODE_ENV === "production"
      ? status === 500
        ? "Internal Server Error"
        : err.message || "Request failed."
      : err.message ||
        "Internal Server Error";

  res.status(status).json({
    success: false,
    message,
  });
};