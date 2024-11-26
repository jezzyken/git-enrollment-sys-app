const catchAsync = require('../utils/catchAsync');
const authService = require('../services/authService');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authService.login(email, password);

  res.status(200).json({
    status: 'success',
    data: {
      user,
      token,
    }
  });
});

module.exports = {
  login
};