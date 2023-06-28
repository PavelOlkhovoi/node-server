export default class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors
    }

    static UnauthorizedUser(){
        return new ApiError(401, 'The user is not logged in')
    }

    static BadRequest(messge, errors = []){
        return new ApiError(400, messge, errors)
    }
}