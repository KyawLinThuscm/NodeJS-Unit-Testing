import { createProduct, findProduct } from "../services/product.service.js";

export async function createProductHandler(req,res) {
  const body = req.body;
  const product = await createProduct({ ...body });
  return res.send(product);
}

export async function getProductHandler(req, res) {
  const productId = req.params.productId;
  const product = await findProduct({ productId });
  if (!product) {
    return res.sendStatus(404);
  }
  return res.send(product);
}