import express from 'express';
const router = express.Router();

router.get('/', (res) => res.status(200).json({
  message: 'Hello There!'
}));

router.get('/ping', (res) => res.status(200).json({
  dateTime: new Date().toISOString(),
  status: 'ok',
  app_name: env.APP_NAME,
  environment: env.NODE_ENV,
}));

export { router };