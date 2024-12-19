import { ResponseHelper } from "@/lib/responseHelper";
import { User } from "@/models/User.models";

export async function POST(req: Request){
    try {
        const { userId } = await req.json();
        if (!userId) {
            return ResponseHelper.error("UserId is required", 404)
        }
    
        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }
    
        const userDetails = await User.findById(userId).select(
            "-password -verificationCode -token"
        )
        return ResponseHelper.success(userDetails, "User details", 200)
    } catch (error) {
        console.log(`Somthinng wen wrong in userDetails route | ${error}`);
    }
}