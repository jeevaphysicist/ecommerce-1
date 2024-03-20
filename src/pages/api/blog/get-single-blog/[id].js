import { ConnectToDB } from "utils/database";
import Blog from "models/blogs";
export default async function handler(req, res ) {

    try {
        await ConnectToDB();
        let result = await Blog.findOne({_id:req.query.id})
            // console.log("result", result);
        // Perform any necessary logic here
        const responseData = { message: "GET  api get successfully", data:result };
        
        // Send the response
        res.status(200).json(responseData);
    } catch (error) {
        // console.error("Error handling GET request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}