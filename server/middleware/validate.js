import { ApiError } from '../utils/ApiError.js';

/**
 * Validates req[source] (default 'body') against a zod schema.
 * On success, replaces req[source] with the parsed (and defaulted/coerced) value.
 */
export const validate = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.') || source,
      message: issue.message,
    }));
    throw new ApiError(400, 'Validation failed', errors);
  }

  req[source] = result.data;
  next();
};
