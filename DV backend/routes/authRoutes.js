const express = require("express");
const { signup, login } = require("../controllers/authController");
const passport = require("../config/passport");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);


router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = req.user.token; 
    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);


// Logout route
// router.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.status(200).json({ message: "Logged out successfully" });
//   });
// });
module.exports = router;
