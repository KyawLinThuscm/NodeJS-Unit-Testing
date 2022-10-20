import { createProductHandler, getProductHandler } from './controllers/product.controller.js';

function routes(app) {
    app.post(
        "/api/products",
        createProductHandler
    );

    app.get(
        "/api/products/:productId",
        getProductHandler
    );
}

export default routes;