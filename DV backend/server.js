const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes'); 
const userRoutes = require('./routes/userRoutes');
const datasetRoutes = require('./routes/datasetRoutes');
const graphRoutes = require('./routes/graphRoutes');
const session = require('express-session');
const passport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'akjgkjfgnkjnfdjndkjjhbvlfheiebdfviuebgdkjviubejebnvsleiurbviauvnkdjfvneru', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


app.get("/",(req,res)=>{
    res.send("Welcome to Backend")
})


app.use(passport.initialize());
app.use(passport.session());

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/dataset', datasetRoutes);
app.use('/graph', graphRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});