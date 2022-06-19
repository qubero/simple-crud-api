import type { IncomingMessage, ServerResponse } from 'http';
import * as User from '../models/userModel';
import { Message } from '../router/message';
import { getJSONDataFromRequestStream, sendResponse } from '../router/utils';
import { HeadersPreset, HttpStatusCode } from '../utils';


const getUsers = async (_: IncomingMessage, res: ServerResponse) => {
  const users = await User.findAll();
  sendResponse(res, HttpStatusCode.OK, HeadersPreset.JSON, users);
};

const getUserByid = async (_: IncomingMessage, res: ServerResponse, id: string) => {
  const user = await User.findById(id);

  if (!user) {
    sendResponse(res, HttpStatusCode.NOT_FOUND, HeadersPreset.ProblemJSON, Message.InvalidId);
  } else {
    sendResponse(res, HttpStatusCode.OK, HeadersPreset.JSON, user);
  }
};

const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  const body: any = await getJSONDataFromRequestStream(req);
  const { username, age, hobbies, ...rest } = body;

  const user = {
    username,
    age,
    hobbies,
  };

  if (checkUserFields(user, true) && !Object.keys(rest).length) {
    const newUser = await User.create(user);
    sendResponse(res, HttpStatusCode.CREATED, HeadersPreset.JSON, newUser);
  } else {
    sendResponse(res, HttpStatusCode.BAD_REQUEST, HeadersPreset.ProblemJSON, Message.RequiredFields);
  }
};

const removeUserById = async (_: IncomingMessage, res: ServerResponse, id: string) => {
  const user = await User.findById(id);
  if (!user) {
    sendResponse(res, HttpStatusCode.NOT_FOUND, HeadersPreset.ProblemJSON, Message.UserNotFound);
  } else {
    await User.removeById(id);
    sendResponse(res, HttpStatusCode.DELETED, HeadersPreset.JSON);
  }
};

const updateUserById = async (req: IncomingMessage, res: ServerResponse, id: string, isPut: boolean = false) => {
  const user = await User.findById(id);

  if (!user) {
    sendResponse(res, HttpStatusCode.NOT_FOUND, HeadersPreset.ProblemJSON, Message.NotFound);
  } else {
    const userData: any = await getJSONDataFromRequestStream(req);

    if (checkUserFields(userData, isPut)) {
      const updatedUser = await User.update(id, userData);
      sendResponse(res, HttpStatusCode.OK, HeadersPreset.JSON, updatedUser);
    } else {
      sendResponse(res, HttpStatusCode.BAD_REQUEST, HeadersPreset.ProblemJSON, Message.InvalidFields);
    }
  }
};

const checkUserFields = (candidateUser: any, isPut: boolean = false) => {
  const { id, username, age, hobbies, ...rest } = candidateUser;

  if (isPut) {
    return !Object.keys(rest).length
      && typeof username === 'string'
      && typeof age === 'number'
      && Array.isArray(hobbies)
      && hobbies.every((el) => typeof el === 'string');
  } else {
    if (rest.length) return false;
    if (username && typeof username !== 'string') return false;
    if (age && typeof age !== 'number') return false;
    if (Array.isArray(hobbies) && !(hobbies.every((el) => typeof el === 'string'))) return false;

    return true;
  }
};

export {
  getUsers,
  getUserByid,
  createUser,
  removeUserById,
  updateUserById,
}
