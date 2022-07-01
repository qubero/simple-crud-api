export const Message = {
  NoMethod: { message: 'Method not allowed for this route' },
  NotFound: { message: 'Not found' },
  InvalidId: { message: 'Invalid user id (not uuid)' },
  UserNotFound: { message: 'User not found. Record with id === userId does not exist' },
  RequiredFields: { message: 'Request does not contain required fields (missing fields or extra fields or problems with types)' },
  InvalidFields: { message: 'Request contains invalid fields (missing fields or extra fields or problems with types)' },
  InternalError: { message: 'Oops, an error occurred. Try again later.' },
};
