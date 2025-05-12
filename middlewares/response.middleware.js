const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err) {
    const status = res.err.status || 400;
    res.status(status).json({ error: true, message: res.err.message });
  } else {
    res.status(200).json(res.data);
  }
  next();
};

export { responseMiddleware };


