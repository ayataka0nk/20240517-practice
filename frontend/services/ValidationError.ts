export class ValidationError<T> extends Error {
  public readonly errors: T
  constructor(errors: T) {
    super('Validation error')
    this.name = 'ValidationError'
    this.errors = errors
  }
}
