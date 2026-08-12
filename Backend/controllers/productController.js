import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "Product image is required" });
        }
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

//remove product by ID
export const deleteProduct = async (req , res) =>{
    try{
        const product = await Product.findById(req.params.id) ;
        if(!product){
            return res.status(404).json({message : "Product not found"});
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message : "Product deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update product by ID
export const updateProduct = async (req , res) =>{
    try{
        const product = await Product.findById(req.params.id) ;
        if(!product){
            return res.status(404).json({message : "Product not found"});
        }
        const { name, description, price, category, stock, imageUrl } = req.body;
        let image = product.imageUrl;

        if(req.file){
            image = req.file.path;
            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(image);
            image = result.secure_url;
        } else if(imageUrl){
            image = imageUrl;
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { 
            name : name || product.name, 
            description : description || product.description,
            price : price || product.price,
            category : category || product.category, 
            stock : stock || product.stock,
            imageUrl : image || product.imageUrl },
             { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
