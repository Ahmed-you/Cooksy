export const createTemplate = (template, vars) => {
  let copiedTemplate = template;
  for (const key in vars) {
    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      const element = vars[key];
      // Replace all instances of the placeholder with the actual value

      copiedTemplate = copiedTemplate.replaceAll(`{{${key}}}`, element);
    }
  }
  return copiedTemplate;
};
