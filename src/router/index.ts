import type { IncomingMessage, ServerResponse } from 'http';
import handlers from './handleRequests';

enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const router = async (request: IncomingMessage, response: ServerResponse) => {
  try {
    switch (request.method) {
      case RequestMethod.GET:
        await handlers.handleGet(request, response);
        break;
      case RequestMethod.POST:
        await handlers.handlePost(request, response);
        break;
      case RequestMethod.PUT:
        await handlers.handlePut(request, response);
        break;
      case RequestMethod.PATCH:
        await handlers.handlePatch(request, response);
        break;
      case RequestMethod.DELETE:
        await handlers.handleDelete(request, response);
        break;

      default:
        handlers.handleNoMethod(request, response);
    }
  } catch (err) {
    handlers.handleInternalServerError(request, response);
  }
};

export default router;
