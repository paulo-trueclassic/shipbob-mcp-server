import { z } from 'zod';
    import { shipbobClient } from '../api-client.js';

    export const inventoryTools = [
      {
        name: "get_inventory",
        description: "Get inventory information across all fulfillment centers",
        schema: {
          page: z.number().optional().describe("Page number for pagination"),
          limit: z.number().optional().describe("Number of items per page"),
          fulfillmentCenterId: z.string().optional().describe("Filter by fulfillment center ID")
        },
        handler: async ({ page, limit, fulfillmentCenterId }) => {
          try {
            const params = { page, limit, fulfillmentCenterId };
            const inventory = await shipbobClient.getInventory(params);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(inventory, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving inventory: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_product_inventory",
        description: "Get inventory information for a specific product",
        schema: {
          productId: z.string().describe("The ID of the product to check inventory for")
        },
        handler: async ({ productId }) => {
          try {
            const inventory = await shipbobClient.getInventoryByProduct(productId);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(inventory, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving product inventory: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_inventory_levels",
        description: "Get current inventory levels for all products",
        schema: {
          page: z.number().optional().describe("Page number for pagination"),
          limit: z.number().optional().describe("Number of items per page")
        },
        handler: async ({ page, limit }) => {
          try {
            const params = { page, limit };
            const levels = await shipbobClient.getInventoryLevels(params);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(levels, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving inventory levels: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "adjust_inventory",
        description: "Make an inventory adjustment for a product",
        schema: {
          productId: z.string().describe("The ID of the product to adjust"),
          fulfillmentCenterId: z.string().describe("The ID of the fulfillment center"),
          quantity: z.number().describe("Quantity to adjust (positive for addition, negative for reduction)"),
          reason: z.string().describe("Reason for the adjustment")
        },
        handler: async ({ productId, fulfillmentCenterId, quantity, reason }) => {
          try {
            const adjustmentData = {
              productId,
              fulfillmentCenterId,
              quantity,
              reason
            };
            const result = await shipbobClient.adjustInventory(adjustmentData);
            return {
              content: [{ 
                type: "text", 
                text: `Inventory adjusted successfully: ${JSON.stringify(result, null, 2)}`
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error adjusting inventory: ${error.message}` }],
              isError: true
            };
          }
        }
      }
    ];
