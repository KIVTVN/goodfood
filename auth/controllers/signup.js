const JWT = require('jsonwebtoken');
const axios = require('axios');

module.exports = async (req, res) => {
  //Verifying if the email is already taken
  const maybeUser = await axios.get(`http://users:3001/users/'${email}'`);

  maybeUser.length !== 0 &&
    res.status(403).json({
      status: 'Error',
      message: 'User already exist',
    });

  // register him with USERS API calls
  //TODO: make a better token
  const newUser = await axios.post('http://users:3001/users');

  const token = await JWT.sign({ email }, 'nfb32iur32ibfqfvi3vf932bg932g932', {
    expiresIn: 360000,
  });

  res.status(201).json({
    status: 'Success',
    message: 'User created and Token sent',
    token: token,
  });
};
