const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        console.log(token);
        if (!token)
            return res
                .status(401)
                .json({ msg: "Authorization denied." });


        const verified = jwt.verify(token, process.env.JWT_TOKEN);

        if (!verified)
            return res
                .status(401)
                .json({ msg: "Verification failed, Authorization denied." });

        req.user = verified.id;
        next();

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });

    }
};

module.exports = auth;
