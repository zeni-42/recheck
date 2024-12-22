import { DBConnect } from "@/lib/dbconnect";
import { ResponseHelper } from "@/lib/responseHelper";
import { User } from "@/models/User.models";

export async function POST(req: Request){
    await DBConnect();

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
            "-password -verificationCode -token -createdAt -updatedAt"
        )
        return ResponseHelper.success(userDetails, "User details", 200)
    } catch (error) {
        console.log(`Somthing went wrong in userDetails route | ${error}`);
        return ResponseHelper.error("Inetrnal server Error", 500, error)
    }
}