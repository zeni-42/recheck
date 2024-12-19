import { DBConnect } from "@/lib/dbconnect"
import { ResponseHelper } from "@/lib/responseHelper";
import { User } from "@/models/User.models";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request){
    await DBConnect();

    try {
        const { email, password } = await req.json()
        if (!email || !password) {
            return ResponseHelper.error("All field are required", 400)
        }

        const user = await User.findOne({ email })
        if (!user) {
            return ResponseHelper.error("User with email not found  ", 404)
        }

        
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return ResponseHelper.error("Invalid credentials", 401)
        }

        if (!process.env.TOKEN_SECRET) {
            throw new Error("TOKEN_SECRET is not defined in the environment variables");
        }

        const generateToken = jwt.sign(
            {
                userId: user._id, email 
            }, 
            process.env.TOKEN_SECRET,
            {
                expiresIn: process.env.TOKEN_EXPIRY
            }
        )

        user.token = generateToken;
        await user.save();

        const loggedInUser = await User.findById(user._id).select(
            "-password -token -verificationCode -verificationcodeExpiry"
        )

        return ResponseHelper.success(loggedInUser, "User logged in successfully", 200)

    } catch (error) {
        console.log(`Somthing went wrong in login route | ${error}`);
        return ResponseHelper.error("Internal server error", 500)
    }
}