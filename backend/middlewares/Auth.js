import jwt from "jsonwebtoken";
const Auth = async (req, res, next) => {
    try {

        let token = req.header("Authorization");
        if (token?.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        } else {
            return res.status(401).json({ message: "Token not found. Unauthorized Access" });
        }



        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
            next();
        } catch (error) {
            console.error("JWT Verification Error:", error);
            return res.status(401).json({ message: "Unauthorized Access" });
        }

    }
    catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Unauthorized Access" });
    }
}

export default Auth;