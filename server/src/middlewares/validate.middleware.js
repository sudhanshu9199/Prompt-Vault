const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    req.body = parsed.body ?? req.body;
    req.query = parsed.query ?? req.query;
    req.params = parsed.params ?? req.params;

    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: err.errors.map((err) => ({
          field: err.path[err.path.length - 1] ?? null,
          message: err.message,
        })),
      });
    }

    console.error('Validate Middleware:', err.message);
    return res.status(500).json({
        success: false,
        message: "Internal server error.",
    });
  }
};

module.exports = validate;
