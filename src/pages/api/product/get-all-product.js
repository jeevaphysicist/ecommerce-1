import { ConnectToDB } from "utils/database";
import Product from "models/products";
export default async function handler(req, res) {
    try {
        await ConnectToDB();
        let result = await Product.find({})
            .sort([["productName", -1]])            
        const responseData = { message: "GET  api get successfully", data:result };
        
        // Send the response
        res.status(200).json(responseData);
    } catch (error) {
        // console.error("Error handling GET request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}