import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string().
          valid('development', 'production', 'test', 'staging').default('development')
          .default('development'),
          DATABASE_PORT: Joi.number().default(5432),
          DATABASE_PASSWORD: Joi.string().required(),
          DATABASE_HOST: Joi.string().required(),
          DATABASE_NAME: Joi.string().required(),
          DATABASE_USER: Joi.string().required(),
          PROFILE_API_KEY: Joi.string().required(),
})
