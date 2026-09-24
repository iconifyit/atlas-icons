const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    const response = { token, userId: user.profile };
    res.status(201);
    res.send(response);
});


router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User Already registered");

    user = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(`${user.email}, ${user._id}`);
})


module.exports = router;
