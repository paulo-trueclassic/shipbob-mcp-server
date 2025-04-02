import { z } from 'zod';
    import { shipbobClient } from '../api-client.js';

    export const fulfillmentTools = [
      {
        name: "list_shipments",
        description: "List shipments in your ShipBob account",
        schema: {
          page: z.number().optional().describe("Page number for pagination"),
          limit: z.number().optional().describe("Number of shipments per page"),
          orderId: z.string().optional().describe("Filter by order ID"),
          startDate: z.string().optional().describe("Start date for filtering (YYYY-MM-DD)"),
          endDate: z.string().optional().describe("End date for filtering (YYYY-MM-DD)")
        },
        handler: async ({ page, limit, orderId, startDate, endDate }) => {
          try {
            const params = { page, limit, orderId, startDate, endDate };
            const shipments = await shipbobClient.getShipments(params);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(shipments, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error listing shipments: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_shipment",
        description: "Get details of a specific shipment by ID",
        schema: {
          shipmentId: z.string().describe("The ID of the shipment to retrieve")
        },
        handler: async ({ shipmentId }) => {
          try {
            const shipment = await shipbobClient.getShipment(shipmentId);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(shipment, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving shipment: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "create_shipment",
        description: "Create a new shipment in ShipBob",
        schema: {
          orderId: z.string().describe("The ID of the order to create a shipment for"),
          fulfillmentCenterId: z.string().optional().describe("Preferred fulfillment center ID"),
          shippingMethod: z.string().describe("Shipping method to use"),
          items: z.array(
            z.object({
              orderItemId: z.string().describe("Order item ID to ship"),
              quantity: z.number().describe("Quantity to ship")
            })
          ).describe("Items to ship")
        },
        handler: async (shipmentData) => {
          try {
            const newShipment = await shipbobClient.createShipment(shipmentData);
            return {
              content: [{ 
                type: "text", 
                text: `Shipment created successfully: ${JSON.stringify(newShipment, null, 2)}`
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error creating shipment: ${error.message}` }],
              isError: true
            };
          }
        }
      }
    ];
