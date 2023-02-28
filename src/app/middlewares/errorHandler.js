module.exports = (error, _request, response, _next) => {
  console.error(error);
  response.sendStatus(500);
};
