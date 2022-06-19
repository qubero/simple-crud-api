import type { IncomingMessage, ServerResponse } from 'http';
import { HttpStatusCode } from '../utils';

export const getJSONDataFromRequestStream = <T>(req: IncomingMessage): Promise<T> => {
  return new Promise((resolve, reject) => {
    const chunks: any = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const obj = JSON.parse(Buffer.concat(chunks).toString());
        resolve(obj);
      } catch (err) {
        reject();
      }
    });
  });
};

export const sendResponse = (res: ServerResponse, code: HttpStatusCode, head?: any, body?: any) => {
  res.writeHead(code, head);

  if (body) {
    res.end(JSON.stringify(body));
  } else {
    res.end();
  }
};
