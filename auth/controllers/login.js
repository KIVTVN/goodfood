const JWT = require('jsonwebtoken');
const axios = require('axios');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  // Check if user with email exists

  const user = await axios.get(`http://users:3001/users/'${email}'`);

  user.length === 0 &&
    res.status(403).json({
      status: 'Error',
      message: `User doesn't exist`,
    });

  // Check if the password is valid
  bcrypt.compare(password, user.password, async (err, same) => {
    if (same) {
      // Send JSON WEB TOKEN
      const token = await JWT.sign(
        { email },
        'nfb32iur32ibfqfvi3vf932bg932g932',
        {
          expiresIn: 360000,
        },
      );
    }
    res.status(200).json({
      status: 'Success',
      message: 'User connected',
      token: token,
    });
  });
};
