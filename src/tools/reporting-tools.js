import { z } from 'zod';
    import { shipbobClient } from '../api-client.js';

    export const reportingTools = [
      {
        name: "get_inventory_report",
        description: "Get inventory report from ShipBob",
        schema: {
          startDate: z.string().describe("Start date for the report (YYYY-MM-DD)"),
          endDate: z.string().describe("End date for the report (YYYY-MM-DD)"),
          fulfillmentCenterId: z.string().optional().describe("Filter by fulfillment center ID")
        },
        handler: async ({ startDate, endDate, fulfillmentCenterId }) => {
          try {
            const params = { startDate, endDate, fulfillmentCenterId };
            const report = await shipbobClient.getInventoryReport(params);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(report, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving inventory report: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_orders_report",
        description: "Get orders report from ShipBob",
        schema: {
          startDate: z.string().describe("Start date for the report (YYYY-MM-DD)"),
          endDate: z.string().describe("End date for the report (YYYY-MM-DD)"),
          channelId: z.string().optional().describe("Filter by sales channel ID")
        },
        handler: async ({ startDate, endDate, channelId }) => {
          try {
            const params = { startDate, endDate, channelId };
            const report = await shipbobClient.getOrdersReport(params);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(report, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving orders report: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_shipping_report",
        description: "Get shipping report from ShipBob",
        schema: {
          startDate: z.string().describe("Start date for the report (YYYY-MM-DD)"),
          endDate: z.string().describe("End date for the report (YYYY-MM-DD)"),
          fulfillmentCenterId: z.string().optional().describe("Filter by fulfillment center ID")
        },
        handler: async ({ startDate, endDate, fulfillmentCenterId }) => {
          try {
            const params = { startDate, endDate, fulfillmentCenterId };
            const report = await shipbobClient.getShippingReport(params);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(report, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving shipping report: ${error.message}` }],
              isError: true
            };
          }
        }
      }
    ];
