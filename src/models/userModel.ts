import { v4 as uuidv4 } from 'uuid';

export interface IUser {
  id?: string,
  username: string,
  age: number,
  hobbies: string[] | [],
}

let users: IUser[] = [];

const findAll = (): Promise<IUser[]> => {
  return Promise.resolve(users);
};

const findById = (id: IUser['id']): Promise<IUser | undefined> => {
  return Promise.resolve(
    users.find((user) => user.id === id)
  );
};

const create = (userData: IUser): Promise<IUser> => {
  return new Promise((resolve, _) => {
    const user = { id: uuidv4(), ...userData };
    users.push(user);
    resolve(user);
  });
};

const removeById = (id: IUser['id']): Promise<void> => {
  return new Promise((resolve, _) => {
    users = users.filter((user) => user.id !== id);
    resolve();
  });
};

const update = (id: IUser['id'], userData: IUser): Promise<IUser | void> => {
  return new Promise((resolve, reject) => {
    const userIdx = users.findIndex((user) => user.id === id);
    const { username, age, hobbies} = userData;

    if (userIdx > -1) {
      users[userIdx] = {
        id,
        username: username || users[userIdx].username,
        age: age || users[userIdx].age,
        hobbies: hobbies || users[userIdx].hobbies,
      };
      resolve(users[userIdx]);
    } else {
      reject();
    }
  });
};

export {
  findAll,
  findById,
  create,
  update,
  removeById,
}
