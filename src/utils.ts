import { validate, version } from 'uuid';

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  DELETED = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
}

export const HeadersPreset = {
  JSON: {
    'Content-Type': 'application/json'
  },
  ProblemJSON: {
    'Content-Type': 'application/problem+json'
  },
}

export const validateUUID = (userId: string): boolean => {
  const uuidVersion = 4;
  return (
    validate(userId) && version(userId) === uuidVersion
  );
}
