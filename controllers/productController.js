const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { fileSizeFormatter } = require('../utils/fileUpload');
const cloudinary = require('cloudinary').v2;

/**
 * Creates a new product based on the provided request body and handles image upload to Cloudinary.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the product is successfully created.
 * @throws {Error} If there is an issue with creating the product or uploading the image, an error is thrown with a corresponding message.
 */
const  createProduct = asyncHandler ( async (req, res) => {
    
    const body = req.body;
    const { name, sku, category, quantity, description, price } = body;

    //Handle Image Upload
    let fileData = {};
    if(req.file){

        //Save Image to Cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Bonetto App',
                resource_type: 'image'
            });
        } catch (error) {
            res.status(500);
            throw new Error('Image could not be uploaded');
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        }
    }
 
    //Validations
    if (!name) {
        const error = new Error('Name required!');
        return res.status(404).json({ msg: error.message });
      }
      if (!sku) {
        const error = new Error('Reference required!');
        return res.status(404).json({ msg: error.message });
      }
  
      if (!category) {
        const error = new Error('Category required');
        return res.status(404).json({ msg: error.message });
      }
  
      if (!quantity) {
        const error = new Error('Quantity required');
        return res.status(404).json({ msg: error.message });
      }
  
      if (!price) {
        const error = new Error('Price required');
        return res.status(400).json({ msg: error.message });
  
      }

    //Create a new Product
    const product = await Product.create({
        user: req.user.id,
        name,
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    });

    res.status(201).json(product);
});

/**
 * Retrieves all products sorted by the creation date.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when all products are successfully retrieved.
 */
const getProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({}).sort('-createdAt');
    res.status(200).json(products);
});

/**
 * Retrieves a specific product based on the provided ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the specific product is successfully retrieved.
 * @throws {Error} If the product does not exist, an error is thrown with a corresponding message.
 */
const getProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    //If product doesn't exist
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.status(200).json(product);
});

/**
 * Deletes a specific product based on the provided ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the product is successfully deleted.
 * @throws {Error} If the product does not exist, an error is thrown with a corresponding message.
 */
const deleteProduct = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    //If product doesn't exist
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    await product.deleteOne();
    res.status(200).json({message: 'Product deleted.'});
});

/**
 * Updates a specific product based on the provided ID and handles image upload to Cloudinary.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A promise that resolves when the product is successfully updated.
 * @throws {Error} If there is an issue with updating the product or uploading the image, an error is thrown with a corresponding message.
 */
const updateProduct = asyncHandler( async (req, res) => {
    const {name, sku, category, quantity, price, description} = req.body;
    const {id} = req.params;

    const product = await Product.findById(req.params.id);

    //If product doesn't exists
    if(!product){
        res.status(404);
        throw new Error('Product not found');
    }

    //Handle Image Upload
    let fileData = {};
    if(req.file){

        //Save Image to Cloudinary
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: 'Pinvent App',
                resource_type: 'image'
            });
        } catch (error) {
            console.error(error);
            res.status(500);
            throw new Error('Image could not be uploaded');
        }

        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
        }
    }

    //Update Product
    const updateProduct = await Product.findByIdAndUpdate(
        {_id: id},
        {
            name,
            sku,
            category,
            quantity,
            price,
            description,
            image: Object.keys(fileData).length === 0 ? product.image : fileData,
        },
        {
            new: true,
            runValidators: true,
        }

    )
    res.status(200).json(updateProduct);
});

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
};