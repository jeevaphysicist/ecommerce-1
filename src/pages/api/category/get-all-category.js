import { ConnectToDB } from "@utils/database";
import Category from "@models/category";
import ProductModel from "@models/products";



const GetAllCategory = async (req,res) => {
    try {
        await ConnectToDB();
        let pipeline= [
            {
                $group: {
                    _id: "$productCategoryID",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "categories", // Name of the collection to perform the lookup
                    localField: "_id",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            {
                $unwind: "$categoryDetails" // Unwind the array created by the $lookup stage
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                    categoryName: "$categoryDetails.name" // Retrieve the name field from categoryDetails
                }
            },
            {
                $sort: {
                    categoryName: 1 // Sort by category name
                }
            }
        ];
        
        
        let result = await ProductModel.aggregate(pipeline);         
        const responseData = { message: "GET  all Category successfully", data:result };
        
        // Send the response
        res.status(200).json(responseData);
    } catch (error) {
        // console.error("Error handling GET request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default GetAllCategory ;
