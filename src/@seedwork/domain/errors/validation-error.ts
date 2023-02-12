import { FieldsErrors } from "../validators/validator-fields-interface"

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
    constructor(public error: FieldsErrors){
        super('ID must be a valid UUID')
        this.name = "EntityValidationError"
    }
}

