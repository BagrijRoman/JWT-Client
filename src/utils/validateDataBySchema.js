import { errors } from '../const';

const validateDataBySchema = (data, schema) => {
  const result = schema.validate(data);

  if (result.error) {
    const { message, context: { key } } =  result.error.details[0];

    return { error: {
      type: errors.VALIDATION_ERROR,
      details: { key, message },
    }};
  }

  return { error: false };
};

export default validateDataBySchema;
