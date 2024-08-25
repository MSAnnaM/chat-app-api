import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../db/models/userModel.js'; // Модель користувача

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
          
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
        }
        const newProfile = profile._json
        
        const user = await new User({ googleId: newProfile.sub, name: newProfile.name, email: newProfile.email }).save();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
    console.log('serialize:', user);
    
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});