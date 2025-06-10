import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

export function IsPastDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPastDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const date = new Date(value)
          const now = new Date()
          return date < now
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a date in the past`
        }
      }
    })
  }
}
