export class AuthenticationError extends Error {
  redirect?: string

  constructor(message: string, redirect?: string) {
    super(message)
    this.redirect = redirect
  }
}
