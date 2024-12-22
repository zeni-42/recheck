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

        const existingServer = await User.findOne(
            {
                _id: userDetails._id,
                servers: {
                    $elemMatch: {
                        serverName,
                        serverAddress
                    }
                }
            }
        )
        if (existingServer) {
            return ResponseHelper.error("This server alraedy exist", 420)
        }

        const server = await Servers.create({
            serverName,
            serverAddress,
            defaultTimer,
            createdBy: userDetails,
        })
        if (!server) {
            return ResponseHelper.error("Somthing went wrong while adding server", 470)
        }

        const updatedUser = await User.updateOne(
            {
                _id: userDetails._id
            },  
            {
                $push: {
                    servers: server._id
                }
            }
        )
        if (!updatedUser.modifiedCount) {
            return ResponseHelper.error("Failed to update the user", 460)
        }

        return ResponseHelper.success(server, "Server created successfully", 200)

    } catch (error) {
        console.log(`Somthing went wrong in addServer Route | ${error}`);
        ResponseHelper.error(`Internal server error`, 500, error)
    }
}