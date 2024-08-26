import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../db/models/userModel.js";

passport.serializeUser((user, done) => {


  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById(_id).then((user) => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: "/auth/google/callback",
      callbackURL: 'https://chat-app-api-production-8dc6.up.railway.app/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        const newProfile = profile._json;
        console.log('google', newProfile);
        

        const user = await new User({
          googleId: newProfile.sub,
          name: newProfile.name,
          email: newProfile.email,
        }).save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);


