export class ValidationError<T> extends Error {
  public readonly errors?: T
  constructor({ message, errors }: { message?: string; errors?: T }) {
    super(message)
    this.name = 'ValidationError'
    this.errors = errors
  }
}
