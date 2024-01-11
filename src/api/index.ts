import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import todos from './todos/todos.route';
import auth from './auth/auth.route';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});
router.use('/app', auth);
router.use('/todos', todos);

export default router;
