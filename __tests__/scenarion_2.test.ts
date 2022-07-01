import request from 'supertest';
import { server } from '../src';
import { IUser } from '../src/models/userModel';
import { Message } from '../src/router/message';
import { invalidUserDataMissingFields, invalidUserDataWrongTypes, newUserData, userData } from './mockData';

/**
 * 1. Create New Missing Fields (POST)
 * 2. Create New Extra Fields (POST)
 * 3. Create New Wrong Fields Types (POST)
 * 4. Create New All Good (POST)
 * 5. Update Created Missing Fields (PUT)
 * 6. Update Created Wrong Types (PUT)
 * 7. Update Created All Good (PUT)
 */

 describe('Second scenario', function () {
  let userId: IUser['id'];

  afterAll(() => {
    server.close();
  });

  it('should return message "Request does not contain required fields (missing fields or extra fields or problems with types)"', async () => {
    const res = await request(server).post('/api/users').send(invalidUserDataMissingFields);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(Message.RequiredFields);
  });

  it('should return message "Request does not contain required fields (missing fields or extra fields or problems with types)"', async () => {
    const res = await request(server).post('/api/users').send(invalidUserDataWrongTypes);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(Message.RequiredFields);
  });

  it('should return message "Request does not contain required fields (missing fields or extra fields or problems with types)"', async () => {
    const res = await request(server).post('/api/users').send(invalidUserDataWrongTypes);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(Message.RequiredFields);
  });

  it('should return newly created record of user with id', async () => {
    const res = await request(server).post('/api/users').send(userData);

    expect(res.status).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({ id: expect.any(String), ...userData })
    );
    userId = res.body.id;
  });

  it('should return message "Request contains invalid fields (missing fields or extra fields or problems with types)"', async () => {
    const res = await request(server).put('/api/users/' + userId).send(invalidUserDataMissingFields);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(Message.InvalidFields);
  });

  it('should return message "Request contains invalid fields (missing fields or extra fields or problems with types)"', async () => {
    const res = await request(server).put('/api/users/' + userId).send(invalidUserDataWrongTypes);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(Message.InvalidFields);
  });

  it('should return the same record of user updated with new data', async () => {
    const res = await request(server).put('/api/users/' + userId).send(newUserData);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({ id: userId, ...newUserData })
    );
  });
});
