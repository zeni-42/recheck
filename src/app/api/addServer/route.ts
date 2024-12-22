import { DBConnect } from "@/lib/dbconnect";
import { ResponseHelper } from "@/lib/responseHelper";
import { Servers } from "@/models/Server.models";
import { User } from "@/models/User.models";

export async function POST(req: Request) {
    await DBConnect();
    try {
        const {serverName, serverAddress, defaultTimer, userDetails} = await req.json()

        if(!serverName || !serverAddress || !defaultTimer || !userDetails){
            return ResponseHelper.error("All fields are required", 400)
        }

        const existingServer = await Servers.findOne({
            createdBy: userDetails._id,
            serverAddress
        })
        if (existingServer) {
            return ResponseHelper.error("Server already exist", 420)
        }

        const server = await Servers.create({
            serverName,
            serverAddress,
            defaultTimer,
            createdBy: userDetails
        })
        if (!server) {
            return ResponseHelper.error("Server creation failed", 415)
        }

        const user = await User.updateOne(
            {
                _id: userDetails._id
            },
            {
                $push:{
                    servers: server
                }
            }
        )
        if (!user) {
            return ResponseHelper.error("User updation failed", 414)
        }

        const serverDetails = await Servers.findById(server._id).select(
            "-createdAt -updatedAt"
        )

        return ResponseHelper.success(serverDetails, "Server created successfully", 200)

    } catch (error) {
        console.log(`Somthing went wrong in addServer Route | ${error}`);
        ResponseHelper.error(`Internal server error`, 500, error)
    }
}