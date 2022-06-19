import request from 'supertest';
import { server } from '../src';
import { IUser } from '../src/models/userModel';
import { Message } from '../src/router/message';
import { newUserData, userData } from './mockData';

/**
 * 1. Read All
 * 2. Create New
 * 3. Read Created
 * 4. Update Created
 * 5. Delete Updated
 * 6. Read Deleted
 */

 describe('First scenario', function () {
  let userId: IUser['id'];

  afterAll(() => {
    server.close();
  });

  it('should return empty array of users', async () => {
    await request(server).get('/api/users').expect(200, []);
  });

  it('should return newly created record of user with id', async () => {
    const res = await request(server).post('/api/users').send(userData);

    expect(res.status).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({ id: expect.any(String), ...userData })
    );
    userId = res.body.id;
  });

  it('should return record of user created in prev test by id', async () => {
    const res = await request(server).get('/api/users/' + userId);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({ id: userId, ...userData })
    );
  });

  it('should return the same record of user updated with new data', async () => {
    const res = await request(server).put('/api/users/' + userId).send(newUserData);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({ id: userId, ...newUserData })
    );
  });

  it('should delete record of user by id', async () => {
    await request(server).delete('/api/users/' + userId).expect(204, '');
  });

  it('should return message "User not found. Record with id === userId does not exist"', async () => {
    const res = await request(server).get('/api/users/' + userId);

    expect(res.status).toEqual(404);
    expect(res.body).toEqual(Message.UserNotFound);
  });
});
