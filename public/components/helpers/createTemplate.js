
// create a html template buy giving the HTML Text + any vars u want to add in 
export const createTemplate = (template, vars) => {
  let copiedTemplate = template;
  for (const key in vars) {
    if (Object.prototype.hasOwnProperty.call(vars, key)) {
      const element = vars[key];
      copiedTemplate = copiedTemplate.replaceAll(`{{${key}}}`, element);
    }
  }
  return copiedTemplate;
};
