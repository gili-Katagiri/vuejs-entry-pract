const delay = require('mocker-api/lib/delay');

const proxy = {
  'GET /api/profile': (req, res) => {
    return res.status(200).json({
      userId: '66006b29-727e-4ed8-a3c8-95d4438f66d4',
      userName: 'naminami',
      nickname: '波平',
      themeColor: '#4caf50',
      hasAvatar: false,
      mailAddress: 'namihei@example.com',
    });
  },
  'PATCH /api/profile': (req, res) => {
    if (req.body.userName === 'fune') {
      return res.status(422).json({
        title: 'このユーザ名は既に使われています',
      });
    }
    return res.status(200).json();
  },
};

module.exports = delay(proxy, 1000);
