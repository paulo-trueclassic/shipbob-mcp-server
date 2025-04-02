import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { shipbobClient } from './api-client.js';
    import { 
      productTools, 
      orderTools, 
      inventoryTools, 
      fulfillmentTools, 
      webhookTools,
      returnTools,
      locationTools,
      channelTools,
      reportingTools
    } from './tools/index.js';

    // Create an MCP server for ShipBob API
    const server = new McpServer({
      name: "ShipBob API",
      version: "1.0.0",
      description: "MCP Server for interacting with ShipBob's e-commerce fulfillment API"
    });

    // Register all tools
    const registerTools = (toolsArray) => {
      toolsArray.forEach(tool => {
        server.tool(
          tool.name,
          tool.schema,
          tool.handler,
          { description: tool.description }
        );
      });
    };

    // Register resources
    server.resource(
      "shipbob-docs",
      new ResourceTemplate("shipbob://docs/{section}", { list: undefined }),
      async (uri, { section }) => {
        const docsContent = await shipbobClient.getDocumentation(section);
        return {
          contents: [{
            uri: uri.href,
            text: docsContent
          }]
        };
      }
    );

    // Register all tool groups
    registerTools(productTools);
    registerTools(orderTools);
    registerTools(inventoryTools);
    registerTools(fulfillmentTools);
    registerTools(webhookTools);
    registerTools(returnTools);
    registerTools(locationTools);
    registerTools(channelTools);
    registerTools(reportingTools);

    export { server };
