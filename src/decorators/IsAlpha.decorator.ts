import validator from 'validator';
import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsAlpha(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsAlpha',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (
            value === undefined ||
            !validator.isAlpha(validator.blacklist(value, ' ')) ||
            validator.trim(value).replace(/\s+/g, ' ') !== value
          ) {
            return false;
          }
          return true;
        },
        defaultMessage(validationArguments: ValidationArguments) {
          return (
            (validationArguments.object as any)[
              `${validationArguments.property}_error`
            ] || `${propertyName} only a-z,A-Z`
          );
        },
      },
    });
  };
}
