import { DBConnect } from "@/lib/dbconnect";
import { ResponseHelper } from "@/lib/responseHelper";
import { verifyTokenFromHeader } from "@/lib/verifyToken";
import { User } from "@/models/User.models";
import { headers } from "next/headers";

export async function POST(req: Request) {
    await DBConnect();

    try {
        const { userId, otp } = await req.json()

        const user = await User.findById(userId)
        if (!user) {
            return ResponseHelper.error("User not found", 404)
        }

        const token = (await headers()).get('token')
        await verifyTokenFromHeader(user?._id, token!)

        if (!userId || !otp) {
            return ResponseHelper.error("All fields are required", 400)
        }

        if (user.verificationCode !== otp) {
            return ResponseHelper.error("Invalid verification code", 450)
        }

        return ResponseHelper.success({}, "Otp is verified", 200)

    } catch (error) {
        console.log(`Somthing went wrong in verifyotp route | ${error}`);
        return ResponseHelper.error("Internal server error", 500)
    }
}