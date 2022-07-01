import request from 'supertest';
import { server } from '../src';
import { IUser } from '../src/models/userModel';
import { Message } from '../src/router/message';
import { userDataPartly, invalidUserDataWrongTypes, newUserData, userData } from './mockData';

/**
 * 1. Check Not Exist Route
 * 2. Check Not Allowed Method (COPY)
 * 3. Create Totally Wrong Data (POST)
 * 4. Create New All Good (POST)
 * 5. Check Not UUID (GET)
 * 6. Update Created Wrong Types (PATCH)
 * 7. Update Created Missing Fields (PATCH)
 */

 describe('Third scenario', function () {
  let userId: IUser['id'];

  afterAll(() => {
    server.close();
  });

  it('should return message "Not found"', async () => {
    const res = await request(server).get('/api/non-exist');

    expect(res.status).toEqual(404);
    expect(res.body).toEqual(Message.NotFound);
  });

  it('should return message "Method not allowed for this route"', async () => {
    const res = await request(server).copy('/api/users');

    expect(res.status).toEqual(405);
    expect(res.body).toEqual(Message.NoMethod);
  });

  it('should return message "Oops, an error occurred. Try again later."', async () => {
    const res = await request(server).post('/api/users');

    expect(res.status).toEqual(500);
    expect(res.body).toEqual(Message.InternalError);
  });

  it('should return newly created record of user with id', async () => {
    const res = await request(server).post('/api/users').send(userData);

    expect(res.status).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({ id: expect.any(String), ...userData })
    );
    userId = res.body.id;
  });

  it('should check uuid of requested user', async () => {
    const res = await request(server).get('/api/users/' + userId?.slice(1));

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(Message.InvalidId);
  });

  it('should return message "Request contains invalid fields (missing fields or extra fields or problems with types)"', async () => {
    const res = await request(server).patch('/api/users/' + userId).send(invalidUserDataWrongTypes);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(Message.InvalidFields);
  });

  it('should update partly user', async () => {
    const res = await request(server).patch('/api/users/' + userId).send(userDataPartly);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({ id: userId, ...userDataPartly })
    );
  });
});
