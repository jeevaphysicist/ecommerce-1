import { ConnectToDB } from "@utils/database";
import Blog from "@models/blogs";



const GetAllBlog = async (req,res) => {
    try {
        await ConnectToDB();
        let result = await Blog.find({},'title coverimage createdAt')
            .sort([["createdAt", -1]])            
        const responseData = { message: "GET  api get successfully", data:result };
        
        // Send the response
        res.status(200).json(responseData);
    } catch (error) {
        // console.error("Error handling GET request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default GetAllBlog ;
