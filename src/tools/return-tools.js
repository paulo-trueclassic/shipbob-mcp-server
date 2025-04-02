import { z } from 'zod';
    import { shipbobClient } from '../api-client.js';

    export const returnTools = [
      {
        name: "list_returns",
        description: "List returns in your ShipBob account",
        schema: {
          page: z.number().optional().describe("Page number for pagination"),
          limit: z.number().optional().describe("Number of returns per page"),
          status: z.string().optional().describe("Filter by return status"),
          startDate: z.string().optional().describe("Start date for filtering (YYYY-MM-DD)"),
          endDate: z.string().optional().describe("End date for filtering (YYYY-MM-DD)")
        },
        handler: async ({ page, limit, status, startDate, endDate }) => {
          try {
            const params = { page, limit, status, startDate, endDate };
            const returns = await shipbobClient.getReturns(params);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(returns, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error listing returns: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_return",
        description: "Get details of a specific return by ID",
        schema: {
          returnId: z.string().describe("The ID of the return to retrieve")
        },
        handler: async ({ returnId }) => {
          try {
            const returnData = await shipbobClient.getReturn(returnId);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(returnData, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving return: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "create_return",
        description: "Create a new return in ShipBob",
        schema: {
          orderId: z.string().describe("The ID of the order to create a return for"),
          items: z.array(
            z.object({
              orderItemId: z.string().describe("Order item ID to return"),
              quantity: z.number().describe("Quantity to return"),
              reason: z.string().optional().describe("Reason for return")
            })
          ).describe("Items to return"),
          returnAddress: z.object({
            name: z.string().describe("Return address name"),
            address1: z.string().describe("Address line 1"),
            address2: z.string().optional().describe("Address line 2"),
            city: z.string().describe("City"),
            state: z.string().describe("State/Province"),
            zipCode: z.string().describe("Zip/Postal code"),
            country: z.string().describe("Country code (e.g., US)")
          }).optional().describe("Return address information")
        },
        handler: async (returnData) => {
          try {
            const newReturn = await shipbobClient.createReturn(returnData);
            return {
              content: [{ 
                type: "text", 
                text: `Return created successfully: ${JSON.stringify(newReturn, null, 2)}`
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error creating return: ${error.message}` }],
              isError: true
            };
          }
        }
      }
    ];
