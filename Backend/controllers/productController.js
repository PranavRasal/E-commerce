import Product from "../modules/product.module";
import cloudinary from "../utils/cloudinary.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const image = req.file.path; // Assuming you're using multer for file uploads

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(image);

    // Create new product
    const product = new Product({
      name,
      description,
      price,
      imageUrl: result.secure_url,
      category,
      stock
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get product by ID
export const getProductById = async (req , res) =>{
    try{
        const product = await Product.findById(req.params.id) ;
        if(!product){
            return res.status(404).json({message : "Product not found"});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}