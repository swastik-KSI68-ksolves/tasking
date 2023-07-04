import Joi from "joi";

// Auth Validators
export const validateOnRegister = (user) => {
  const schema = Joi.object({
    full_name: Joi.string().min(5).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(8)
      .max(16)
      .required()
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  return schema.validate(user);
};

export const validateOnLogin = (user) => {
  const schema = Joi.object({
    password: Joi.string().min(8).max(16).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  return schema.validate(user);
};

// Task Validators
export const validateCreateTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(30).required(),
    description: Joi.string().min(15).max(40).required(),
    due_date: Joi.date().greater("now").required(),
    completed: Joi.boolean(), //TODO should not have string in completed
    priority: Joi.string().valid("low", "medium", "high"),
    created_at: Joi.date(),
  });

  return schema.validate(task);
};

export const validateUpdateTask = (task) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(30).required(),
    description: Joi.string().min(15).max(40).required(),
    due_date: Joi.date().greater("now").required(),
    completed: Joi.boolean(),
    priority: Joi.string().valid("low", "medium", "high"),
    created_at: Joi.date(),
  });

  return schema.validate(task);
};

