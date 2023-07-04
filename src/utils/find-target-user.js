// fnding user via a unique email
export const findTargetUser =  (email, schema) => {
  const targetUser =  schema.findOne({ email: email });
  return targetUser;
};
