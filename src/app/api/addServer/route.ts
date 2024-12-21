import { DBConnect } from "@/lib/dbconnect";
import { ResponseHelper } from "@/lib/responseHelper";
import { Servers } from "@/models/Server.models";

export async function POST(req: Request) {
    await DBConnect();
    try {
        const {serverName, serverAddress, defaultTimer, userDetails} = await req.json()
        console.log([serverName, serverAddress, defaultTimer, userDetails]);

        if(!serverName || !serverAddress || !defaultTimer || !userDetails){
            return ResponseHelper.error("All fields are required", 400)
        }

        const existingServer = await Servers.findOne(
            {
                serverName,
                serverAddress,
                userDetails
            }
        )
        if (existingServer) {
            return ResponseHelper.error("This server already exist", 400)
        }

    } catch (error) {
        console.log(`Somthing went wrong in addServer Route | ${error}`);
        ResponseHelper.error(`Internal server error`, 500, error)
    }
}