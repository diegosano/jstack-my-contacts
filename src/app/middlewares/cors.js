const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3002',
];

module.exports = (request, response, next) => {
  const origin = request.header('origin');
  const isAllowed = ALLOWED_ORIGINS.includes(origin);

  if (isAllowed) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, DELETE, PATCH, PUT',
    );
    response.setHeader('Access-Control-Allow-Headers', '*');
    response.setHeader('Access-Control-Max-Age', '10');
  }

  next();
};
