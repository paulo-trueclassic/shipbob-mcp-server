import { z } from 'zod';
    import { shipbobClient } from '../api-client.js';

    export const channelTools = [
      {
        name: "list_channels",
        description: "List all sales channels in your ShipBob account",
        schema: {},
        handler: async () => {
          try {
            const channels = await shipbobClient.getChannels();
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(channels, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error listing channels: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_channel",
        description: "Get details of a specific sales channel by ID",
        schema: {
          channelId: z.string().describe("The ID of the channel to retrieve")
        },
        handler: async ({ channelId }) => {
          try {
            const channel = await shipbobClient.getChannel(channelId);
            return {
              content: [{ 
                type: "text", 
                text: JSON.stringify(channel, null, 2)
              }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error retrieving channel: ${error.message}` }],
              isError: true
            };
          }
        }
      }
    ];
