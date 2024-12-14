import { User } from "@/models/User.models"

export async function verifyTokenFromHeader(userId: any, token: string) {
    if (!userId || !token) {
        throw new Error("User ID and token are missing");
    }

    const user = await User.findOne({ _id: userId, token })
    if (!user) {
        throw new Error("User not found")
    }
    return true
}