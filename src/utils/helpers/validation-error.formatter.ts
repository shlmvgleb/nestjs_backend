import { ValidationError } from 'class-validator';

export function errorFormatter(errors: ValidationError[], errMessage?: any, parentField?:string) {
  const message = errMessage || [];

  errors.forEach(error => {
    if (!error?.constraints && error?.children.length) {
      errorFormatter(error.children, message);
    } else {
      message.push(`${error?.property} - ${Object.values(error?.constraints).join(', ')}`);
    }
  });

  return message;
}
