const setRdays = (date) => {
  const now = new Date();
  const travelDate = new Date(date);
  const timeDifference = travelDate.getTime() - now.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24));
};

module.exports = { setRdays };
