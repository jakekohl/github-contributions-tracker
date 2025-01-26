import { addUser } from '../lib/user.js';

const { express } = 'express';
const { router } = express.Router();


router.route('/users')
  .get((req, res) => { // list all users
    res.status(200).json({
      message: 'Not Implemented'
    });
  })
  .post((req, res) => { // add a new user
    const { body } = req;
    const addUserResult = addUser(body);
    if (addUserResult) {
      res.status(200).json({
        message: 'User added successfully'
      });
    } else {
      res.status(500).json({
        message: 'Error adding user'
      });
    };
  });

router.route('/users/:username')
  .get((req, res) => { // get a single user by username or id
    res.status(200).json({
      message: 'Not Implemented'
    });
  })
  .put((req, res) => { // update a single user by username or id
    res.status(200).json({
      message: 'Not Implemented'
    });
  });

router.route('/users/:username/contributions')
  .get((req, res) => { // get a single user's contributions by username or id
    res.status(200).json({
      message: 'Not Implemented'
    });
  })
  .post((req, res) => { // perform an initial load of a single user's contributions from GitHub
    res.status(200).json({
      message: 'Not Implemented'
    });
  })
  .put((req, res) => { // perform an incremental load of a single user's contributions from GitHub by date (optional)
    res.status(200).json({
      message: 'Not Implemented'
    });
  });

export { router };