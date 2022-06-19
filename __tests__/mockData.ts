export const userData = {
  username: 'SomeUserName',
  age: 12,
  hobbies: ['node', 'mode'],
};

export const newUserData = {
  username: 'AnotherUserName',
  age: 21,
  hobbies: ['stay', 'lay'],
};

export const invalidUserDataExtra = {
  username: 'AnotherUserName',
  age: 21,
  hobbies: ['stay', 'lay'],
  randomField: 'some-random-field',
};

export const invalidUserDataWrongTypes = {
  username: 'AnotherUserName',
  age: '21',
  hobbies: ['stay', 'lay']
};

export const invalidUserDataMissingFields = {
  username: 'AnotherUserName',
  age: 21,
};

export const userDataPartly = {
  username: 'AnotherUserName',
  age: 21,
  hobbies: ['node', 'mode'],
};
