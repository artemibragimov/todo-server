export class ApiError extends Error {
  status;

  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static UnauthorizedAccessError() {
    return new ApiError(401, 'User is not authorized');
  }

  static UnauthorizedRefreshError() {
    return new ApiError(403, 'User is not authorized');
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }
}
