const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
    const {username , email, password} = req.body;
    try{
        const user = new User({username, email, password});
        await user.save();
        res.status(201).json('User Registered');

    }
    catch(err){
        if(err.code === 11000){
          return  res.status(400).json({msg:"email allready exist"});
        }
        return res.status(420).send(err);
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Wrong password' });
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn:'1h'});
        // res.json({ token });

        res.json({
            token: token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email
            }
          });
    }
    catch(err){
        res.status(420).send(err.msg);
    }
}

module.exports ={
    login,
    register
}