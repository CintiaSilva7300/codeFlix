import { EntityValidationError } from "../errors/validation-error";
import ClassValidatorFields from "../validators/class-validator-fields";
import { FieldsErrors } from "../validators/validator-fields-interface";
import { objectContaining } from "expect";

type Expected =
  | { validator: ClassValidatorFields<any>; data: any }
  | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;
        return assertContainsErrorMessage(error.error, received)
        
      }
    } else {
      const { validator, data } = expected;
      const validated = validator.validate(data);

      if (validated) {
        return isValid();
    }
    return assertContainsErrorMessage(validator.errors, received)
    }
  },
});

function isValid() {
  return { pass: true, message: () => "" };
}

function assertContainsErrorMessage(expected: FieldsErrors, received: FieldsErrors) {
  const isMatch = objectContaining(received).asymmetricMatch(expected);
  return isMatch
    ? { pass: true, message: () => "" }
    : {
        pass: false,
        message: () =>
          `THe validation errors not contains ${JSON.stringify(
            received
          )}. Current: ${JSON.stringify(expected)}`, 
      };
}
