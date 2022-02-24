module.exports = (username, arr) => {
  let index = null;
  arr.find((user, i) => {
    if (user.username === username) {
      index = i;
      return;
    }
  });

  arr.splice(index, 1);
};
