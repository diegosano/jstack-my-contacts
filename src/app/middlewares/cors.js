module.exports = (_request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PATCH, PUT',
  );
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Max-Age', '10');

  next();
};
