export class ApiError extends Error {
  status;

  constructor(status, data) {
    super();
    this.status = status;
    this.data = data;
  }

  static UnauthorizedAccessError() {
    return new ApiError(401, 'User is not authorized');
  }

  static UnauthorizedRefreshError() {
    return new ApiError(403, 'User is not authorized');
  }

  static BadRequest(data) {
    return new ApiError(400, data);
  }
}
