import ProductModel from "../models/product.model.js";
  
export async function createProduct(input) {
    return ProductModel.create(input);
}

export async function findProduct(query) {
    return ProductModel.findOne(query);
}