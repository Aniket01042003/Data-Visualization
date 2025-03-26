const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const dotenv = require("dotenv");
const AuthService = require('../services/authService')

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/auth/google/callback"

        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id 
                    });
                    await user.save();
                }

                // Generate a JWT for Google users
                const token = AuthService.generateToken(user);
                return done(null, { ...user.toObject(), token });
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Serialize user (store JWT instead of session ID)
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    try {
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
