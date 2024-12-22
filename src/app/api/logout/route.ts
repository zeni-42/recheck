    import { DBConnect } from "@/lib/dbconnect";
import { ResponseHelper } from "@/lib/responseHelper";
import { User } from "@/models/User.models";

export async function POST(req: Request) {
    await DBConnect();
    try {
        const { userId } = await req.json()
        if (!userId) {
            return ResponseHelper.error("Invalid userId", 400);
        }

        await User.updateOne(
            {
                _id: userId
            },{
                $unset: { token: "" }
            }
        )

        return ResponseHelper.success({}, "User loggedout successfully", 200)

    } catch (error) {
        console.log(`Somthing went wrong in logout route | ${error}`);
        return ResponseHelper.error("Internal server error", 500)
    }
}