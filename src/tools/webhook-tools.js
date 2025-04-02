import { z } from 'zod';
    import { shipbobClient } from '../api-client.js';

    export const webhookTools = [
      {
        name: "list_webhooks",
        description: "List all webhooks configured in your ShipBob account",
        schema: {},
        handler: async () => {
          try {
            const webhooks = await shipbobClient.getWebhooks();
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(webhooks, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error listing webhooks: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "create_webhook",
        description: "Create a new webhook in ShipBob",
        schema: {
          url: z.string().url().describe("The URL to send webhook notifications to"),
          eventType: z.string().describe("Event type to subscribe to (e.g., 'order.created', 'shipment.created')"),
          isActive: z.boolean().optional().describe("Whether the webhook is active")
        },
        handler: async ({ url, eventType, isActive = true }) => {
          try {
            const webhookData = {
              url,
              eventType,
              isActive
            };
            const newWebhook = await shipbobClient.createWebhook(webhookData);
            return {
              content: [{ 
                type: "text", 
                text: `Webhook created successfully: ${JSON.stringify(newWebhook, null, 2)}`
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error creating webhook: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "delete_webhook",
        description: "Delete a webhook from your ShipBob account",
        schema: {
          webhookId: z.string().describe("The ID of the webhook to delete")
        },
        handler: async ({ webhookId }) => {
          try {
            await shipbobClient.deleteWebhook(webhookId);
            return {
              content: [{ 
                type: "text", 
                text: `Webhook deleted successfully`
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error deleting webhook: ${error.message}` }],
              isError: true
            };
          }
        }
      }
    ];
