import type { IncomingMessage, ServerResponse } from 'http';
import { getUsers, getUserByid, createUser, removeUserById, updateUserById } from '../controllers/userController';
import { HeadersPreset, HttpStatusCode, validateUUID } from '../utils';
import { Message } from './message';
import { sendResponse } from './utils';

const Routes = {
  users: /^\/api\/users$/,
  userById: /\/api\/users\/[a-f-\d]+/,
};

const handleGet = async (req: IncomingMessage, res: ServerResponse) => {
  const URL = req.url || '';

  if (URL.match(Routes.users)) {
    await getUsers(req, res);
    return;
  }

  if (URL.match(Routes.userById)) {
    const userId = URL.split('/').pop() || '';

    if (validateUUID(userId)) {
      await getUserByid(req, res, userId);
    } else {
      sendResponse(res, HttpStatusCode.BAD_REQUEST, HeadersPreset.ProblemJSON, Message.InvalidId);
    }
    return;
  }

  handleNotFound(req, res);
};

const handlePost = async (req: IncomingMessage, res: ServerResponse) => {
  const URL = req.url || '';

  if (URL.match(Routes.users)) {
    await createUser(req, res);
    return;
  }

  handleNotFound(req, res);
};

const handlePut = async (req: IncomingMessage, res: ServerResponse) => {
  const URL = req.url || '';

  if (URL.match(Routes.userById)) {
    const userId = URL.split('/').pop() || '';

    if (validateUUID(userId)) {
      await updateUserById(req, res, userId, true);
    } else {
      sendResponse(res, HttpStatusCode.BAD_REQUEST, HeadersPreset.ProblemJSON, Message.InvalidId);
    }
    return;
  }

  handleNotFound(req, res);
};

const handlePatch = async (req: IncomingMessage, res: ServerResponse) => {
  const URL = req.url || '';

  if (URL.match(Routes.userById)) {
    const userId = URL.split('/').pop() || '';

    if (validateUUID(userId)) {
      await updateUserById(req, res, userId);
    } else {
      sendResponse(res, HttpStatusCode.BAD_REQUEST, HeadersPreset.ProblemJSON, Message.InvalidId);
    }
    return;
  }

  handleNotFound(req, res);
};

const handleDelete = async (req: IncomingMessage, res: ServerResponse) => {
  const URL = req.url || '';

  if (URL.match(Routes.userById)) {
    const userId = URL.split('/').pop() || '';

    if (validateUUID(userId)) {
      await removeUserById(req, res, userId);
    } else {
      sendResponse(res, HttpStatusCode.BAD_REQUEST, HeadersPreset.ProblemJSON, Message.InvalidId);
    }
    return;
  }

  handleNotFound(req, res);
};

const handleNoMethod = (_: IncomingMessage, res: ServerResponse) => {
  sendResponse(res, HttpStatusCode.METHOD_NOT_ALLOWED, HeadersPreset.ProblemJSON, Message.NoMethod);
};

const handleNotFound = (_: IncomingMessage, res: ServerResponse) => {
  sendResponse(res, HttpStatusCode.NOT_FOUND, HeadersPreset.ProblemJSON, Message.NotFound);
};

const handleInternalServerError = (_: IncomingMessage, res: ServerResponse) => {
  sendResponse(res, HttpStatusCode.INTERNAL_SERVER_ERROR, HeadersPreset.ProblemJSON, Message.InternalError);
};

export default {
  handleGet,
  handlePost,
  handlePut,
  handlePatch,
  handleDelete,
  handleNoMethod,
  handleNotFound,
  handleInternalServerError,
}
