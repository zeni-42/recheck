import { DBConnect } from "@/lib/dbconnect";
import { ResponseHelper } from "@/lib/responseHelper";
import { Servers } from "@/models/Server.models";

export async function POST(req: Request) {
    await DBConnect();
    try {
        const { serverId } = await req.json()
        if (!serverId) {
            return ResponseHelper.error("Server Id is required for server details")
        }

        const server = await Servers.findById(serverId)
        if (!server) {
            return ResponseHelper.error("server not found", 404)
        }

        const serverDetails = await Servers.findById(serverId).select(
            "-createdAt -updatedAt -createdBy"
        )
        return ResponseHelper.success(serverDetails, "Server details", 200)
    } catch (error) {
        console.log(`Somthing went wrong in serverDetails route | ${error}`);
        return ResponseHelper.error("inetrnal server error", 500)
    }
}