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

//remove product by ID
export const deleteProduct = async (req , res) =>{
    try{
        const product = await Product.findById(req.params.id) ;
        if(!product){
            return res.status(404).json({message : "Product not found"});
        }
        await product.remove();
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
        const { name, description, price, category, stock } = req.body;
        const image = req.file ? req.file.path : product.imageUrl; // Use existing image if no new image is uploaded
        if(image !== product.imageUrl){
            // Upload new image to Cloudinary
            const result = await cloudinary.uploader.upload(image);
            image = result.secure_url;
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, description, price, category, stock, imageUrl: image }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
