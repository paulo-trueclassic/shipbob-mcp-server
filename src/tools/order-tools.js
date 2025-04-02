import { z } from 'zod';
    import { shipbobClient } from '../api-client.js';

    export const orderTools = [
      {
        name: "list_orders",
        description: "List orders in your ShipBob account",
        schema: {
          page: z.number().optional().describe("Page number for pagination"),
          limit: z.number().optional().describe("Number of orders per page"),
          status: z.string().optional().describe("Filter by order status"),
          startDate: z.string().optional().describe("Start date for filtering (YYYY-MM-DD)"),
          endDate: z.string().optional().describe("End date for filtering (YYYY-MM-DD)")
        },
        handler: async ({ page, limit, status, startDate, endDate }) => {
          try {
            const params = { page, limit, status, startDate, endDate };
            const orders = await shipbobClient.getOrders(params);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(orders, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error listing orders: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_order",
        description: "Get details of a specific order by ID",
        schema: {
          orderId: z.string().describe("The ID of the order to retrieve")
        },
        handler: async ({ orderId }) => {
          try {
            const order = await shipbobClient.getOrder(orderId);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(order, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving order: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "create_order",
        description: "Create a new order in ShipBob",
        schema: {
          referenceId: z.string().describe("Your reference ID for the order"),
          recipient: z.object({
            name: z.string().describe("Recipient's full name"),
            address1: z.string().describe("Address line 1"),
            address2: z.string().optional().describe("Address line 2"),
            city: z.string().describe("City"),
            state: z.string().describe("State/Province"),
            zipCode: z.string().describe("Zip/Postal code"),
            country: z.string().describe("Country code (e.g., US)"),
            phone: z.string().optional().describe("Phone number"),
            email: z.string().optional().describe("Email address")
          }).describe("Shipping address information"),
          items: z.array(
            z.object({
              productId: z.string().describe("ShipBob product ID"),
              quantity: z.number().describe("Quantity of the product")
            })
          ).describe("Order items"),
          shippingMethod: z.string().optional().describe("Preferred shipping method"),
          orderNote: z.string().optional().describe("Note for the order")
        },
        handler: async (orderData) => {
          try {
            const newOrder = await shipbobClient.createOrder(orderData);
            return {
              content: [{ 
                type: "text", 
                text: `Order created successfully: ${JSON.stringify(newOrder, null, 2)}`
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error creating order: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "cancel_order",
        description: "Cancel an existing order in ShipBob",
        schema: {
          orderId: z.string().describe("The ID of the order to cancel"),
          reason: z.string().optional().describe("Reason for cancellation")
        },
        handler: async ({ orderId, reason }) => {
          try {
            const cancelData = { reason };
            const result = await shipbobClient.cancelOrder(orderId, cancelData);
            return {
              content: [{ 
                type: "text", 
                text: `Order cancelled successfully: ${JSON.stringify(result, null, 2)}`
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error cancelling order: ${error.message}` }],
              isError: true
            };
          }
        }
      }
    ];
