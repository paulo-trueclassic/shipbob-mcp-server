import { z } from 'zod';
    import { shipbobClient } from '../api-client.js';

    export const locationTools = [
      {
        name: "list_fulfillment_centers",
        description: "List all fulfillment centers in ShipBob network",
        schema: {},
        handler: async () => {
          try {
            const centers = await shipbobClient.getFulfillmentCenters();
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(centers, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error listing fulfillment centers: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_fulfillment_center",
        description: "Get details of a specific fulfillment center by ID",
        schema: {
          centerId: z.string().describe("The ID of the fulfillment center to retrieve")
        },
        handler: async ({ centerId }) => {
          try {
            const center = await shipbobClient.getFulfillmentCenter(centerId);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(center, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving fulfillment center: ${error.message}` }],
              isError: true
            };
          }
        }
      }
    ];
