import { currentUser, requireAuth } from '@yousico/common';
import { Router } from 'express';

const router = Router();

router.get('/v1/current-user', currentUser, requireAuth, async (req, res) => {
  res.send(req.currentUser);
});

export { router as currentUserRouter };
