/** Shape of the signed JWT payload. */
export interface JwtPayload {
  /** Subject — the user id */
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

/** Shape attached to `request.user` after JwtStrategy.validate(). */
export interface AuthenticatedUser {
  userId: string;
  email: string;
}
