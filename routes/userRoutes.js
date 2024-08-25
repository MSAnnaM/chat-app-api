import express from 'express';
import passport from 'passport';
import ensureAuthenticated from '../midellwares/auth.js';
import { getUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/');
});

router.get('/api/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    
    req.session.destroy((err) => {
      if (err) {
        return next(err);
        }
        
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

router.get('/api/user', ensureAuthenticated, getUser )

export default router;