import Joi from 'joi';

import { errors } from '../../const';

const schema = Joi.object().keys({
  email: Joi.string().email().required().error(() => errors.VALID_EMAIL_SHOULD_BE_PROVIDED),
});

export default schema;
