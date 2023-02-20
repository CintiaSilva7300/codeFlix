export default class EntityValidationError extends Error {
  constructor(message: string) {
    super(message || "ID must be a valid UUID");
    this.name = "InvalidUuidError";
  }
}