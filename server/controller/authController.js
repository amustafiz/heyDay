const rightId = (req, res, next) => {
  const { id } = req.query;
  if (id >= 1 && id <= 10) {
    return next();
  }
  else {
    console.log('reached here for invalid user');
    return res.status(400).json('you have are not authorized to view this data')
  }
}

module.exports = { rightId };