import { z } from 'zod';
    import { shipbobClient } from '../api-client.js';

    export const productTools = [
      {
        name: "list_products",
        description: "List products in your ShipBob inventory",
        schema: {
          page: z.number().optional().describe("Page number for pagination"),
          limit: z.number().optional().describe("Number of products per page"),
          search: z.string().optional().describe("Search term to filter products")
        },
        handler: async ({ page, limit, search }) => {
          try {
            const params = { page, limit, search };
            const products = await shipbobClient.getProducts(params);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(products, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error listing products: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_product",
        description: "Get details of a specific product by ID",
        schema: {
          productId: z.string().describe("The ID of the product to retrieve")
        },
        handler: async ({ productId }) => {
          try {
            const product = await shipbobClient.getProduct(productId);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(product, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving product: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "create_product",
        description: "Create a new product in ShipBob",
        schema: {
          name: z.string().describe("Product name"),
          sku: z.string().describe("Stock keeping unit (unique identifier)"),
          barcode: z.string().optional().describe("Product barcode/UPC"),
          description: z.string().optional().describe("Product description"),
          weight: z.number().optional().describe("Weight in ounces"),
          length: z.number().optional().describe("Length in inches"),
          width: z.number().optional().describe("Width in inches"),
          height: z.number().optional().describe("Height in inches"),
          value: z.number().optional().describe("Declared value of the product")
        },
        handler: async (productData) => {
          try {
            const newProduct = await shipbobClient.createProduct(productData);
            return {
              content: [{ 
                type: "text", 
                text: `Product created successfully: ${JSON.stringify(newProduct, null, 2)}`
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error creating product: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "update_product",
        description: "Update an existing product in ShipBob",
        schema: {
          productId: z.string().describe("The ID of the product to update"),
          name: z.string().optional().describe("Product name"),
          sku: z.string().optional().describe("Stock keeping unit"),
          barcode: z.string().optional().describe("Product barcode/UPC"),
          description: z.string().optional().describe("Product description"),
          weight: z.number().optional().describe("Weight in ounces"),
          length: z.number().optional().describe("Length in inches"),
          width: z.number().optional().describe("Width in inches"),
          height: z.number().optional().describe("Height in inches"),
          value: z.number().optional().describe("Declared value of the product")
        },
        handler: async ({ productId, ...productData }) => {
          try {
            const updatedProduct = await shipbobClient.updateProduct(productId, productData);
            return {
              content: [{ 
                type: "text", 
                text: `Product updated successfully: ${JSON.stringify(updatedProduct, null, 2)}`
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error updating product: ${error.message}` }],
              isError: true
            };
          }
        }
      }
    ];
