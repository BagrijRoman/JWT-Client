import Joi from 'joi';

import { errors } from '../../const';

const schema = Joi.object().keys({
  email: Joi.string().email().required().error(() => errors.VALID_EMAIL_SHOULD_BE_PROVIDED),
  password: Joi.string().min(6).max(20).required().error(() => errors.PASSWORD_SHOULD_BE_FROM_SIX_TO_TWENTY_SYMBOLS),
});

export default schema;
