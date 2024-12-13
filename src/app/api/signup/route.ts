import { DBConnect } from "@/lib/dbconnect";
import { ResponseHelper } from "@/lib/responseHelper"
import { User } from "@/models/User.models"
import bcrypt from "bcryptjs";

export async function POST(req: Request){
    try {
        await DBConnect();
        const { fullName, email, password } = await req.json()
        
        if (!fullName || !email || !password) {
            return ResponseHelper.error("All fields are required", 400)
        }
    
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return ResponseHelper.error("Email is already taken", 400)
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(Math.random() * 10000);
        const verificationcodeExpiry = new Date(Date.now() + 3600000);
    
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            verificationCode,
            verificationcodeExpiry,
        })
    
        const createdUser = await User.findById(user._id).select(
            "-password -token -verificationCode -verificationcodeExpiry"
        )
    
        return ResponseHelper.success(createdUser, "User registered successfully", 200);
    } catch (error) {
        console.log(`Somthing went wrong in signup route | ${error}`);
        return ResponseHelper.error("Internal server error", 500)
    }
}