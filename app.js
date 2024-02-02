/*---------------------------------------------------------------------------------
*                                API whith express                                *
*_________________________________________________________________________________*/
const express = require('express');
const ProductManager = require('./productManager');
const productManager = new ProductManager();
/*---------------------------------------------------------------------------------
*                              Server configurations                              *
*_________________________________________________________________________________*/
const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
/*---------------------------------------------------------------------------------
*                                    Endpoints                                    *
*_________________________________________________________________________________*/
/*---------------------------------------------------------------------------------
*                                    GET (All)                                    *
*_________________________________________________________________________________*/
app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.send(products);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
/*---------------------------------------------------------------------------------
*                                    GET (ById)                                   *
*_________________________________________________________________________________*/
app.get('/product/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await productManager.getProductById(productId);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
/*---------------------------------------------------------------------------------
*                                 POST (New product)                              *
*_________________________________________________________________________________*/
app.post('/product', async (req, res) => {
    const newProduct = req.body;
    try {
        await productManager.addProduct(newProduct);
        res.send({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
/*---------------------------------------------------------------------------------
*                               PUT (Update product)                              *
*_________________________________________________________________________________*/
app.put('/product/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    const modifiedProduct = req.body;
    try {
        await productManager.updateProduct(productId, modifiedProduct);
        res.send({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
/*---------------------------------------------------------------------------------
*                             DELETE (Remove Product)                             *
*_________________________________________________________________________________*/
app.delete('/product/:id', async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        await productManager.removeProduct(productId);
        res.send({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
/*---------------------------------------------------------------------------------
*                                     LISTENER                                    *
*_________________________________________________________________________________*/
app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}`);
});