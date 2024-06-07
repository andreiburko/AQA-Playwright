export const createRandomEmail = function() {
  let userName = "";
  for (let i = 0; i < 20; i++) {
    const randomNumber = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
    userName += String.fromCharCode(randomNumber);
  }
  return `${userName}@gmail.com`;
};