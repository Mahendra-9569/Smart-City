
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "data missing"
            })
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        user.password = undefined;

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };

        return res.cookie("token", token, options).status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token,
            user: user

        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Signup = async (req, res) => {
    try {
        const {  email, password, name } = req.body;


        if ( !email || !password || !name ) {
            return res.status(404).json({
                success: false,
                message: "data missing"
            })
        }

        const userExists = await User.findOne({ email: email });
    
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        

        // password should be greater than 6 and have alteast 1 symbol and 1 uppercase
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long and have at least 1 number, 1 symbol and 1 uppercase letter"
            })
        }


        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            email: email,
            password: hashPassword,
            name: name,
            
        });

        return res.status(200).json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const Logout = async (req, res) => {
    try {
        return res.status(200).clearCookie("token").json({
            success: true,
            message: "User logged out successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}



