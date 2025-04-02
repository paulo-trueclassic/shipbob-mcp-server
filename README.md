# ShipBob API MCP Server

    A comprehensive Model Context Protocol (MCP) server for interacting with ShipBob's e-commerce fulfillment API.

    ## Features

    This MCP server provides tools and resources for all major ShipBob API functionalities:

    - **Products**: Manage your product catalog
    - **Orders**: Create and manage orders
    - **Inventory**: Track and adjust inventory levels
    - **Fulfillment**: Manage shipments and fulfillment processes
    - **Webhooks**: Configure notifications for ShipBob events
    - **Returns**: Process and manage return requests
    - **Locations**: Access information about fulfillment centers
    - **Channels**: Manage sales channels
    - **Reporting**: Generate and retrieve reports

    ## Getting Started

    ### Prerequisites

    - Node.js 16 or higher
    - ShipBob API key (obtain from your ShipBob dashboard)

    ### Installation

    1. Clone this repository
    2. Install dependencies:
       ```
       npm install
       ```
    3. Create a `.env` file with your ShipBob API key:
       ```
       SHIPBOB_API_KEY=your_api_key_here
       ```

    ### Running the Server

    Start the server:
    ```
    npm run dev
    ```

    ### Testing with MCP Inspector

    Test the server using the MCP Inspector:
    ```
    npm run inspect
    ```

    This will open a web interface where you can:
    - Browse available tools and resources
    - Test tools with custom inputs
    - View server logs and responses

    ## Available Tools

    ### Product Management
    - `list_products`: List products in your ShipBob inventory
    - `get_product`: Get details of a specific product
    - `create_product`: Create a new product
    - `update_product`: Update an existing product

    ### Order Management
    - `list_orders`: List orders in your ShipBob account
    - `get_order`: Get details of a specific order
    - `create_order`: Create a new order
    - `cancel_order`: Cancel an existing order

    ### Inventory Management
    - `get_inventory`: Get inventory information across all fulfillment centers
    - `get_product_inventory`: Get inventory for a specific product
    - `get_inventory_levels`: Get current inventory levels for all products
    - `adjust_inventory`: Make inventory adjustments

    ### Fulfillment
    - `list_shipments`: List shipments in your account
    - `get_shipment`: Get details of a specific shipment
    - `create_shipment`: Create a new shipment

    ### Webhooks
    - `list_webhooks`: List all configured webhooks
    - `create_webhook`: Create a new webhook
    - `delete_webhook`: Delete an existing webhook

    ### Returns
    - `list_returns`: List returns in your account
    - `get_return`: Get details of a specific return
    - `create_return`: Create a new return

    ### Locations
    - `list_fulfillment_centers`: List all fulfillment centers
    - `get_fulfillment_center`: Get details of a specific fulfillment center

    ### Channels
    - `list_channels`: List all sales channels
    - `get_channel`: Get details of a specific sales channel

    ### Reporting
    - `get_inventory_report`: Get inventory report
    - `get_orders_report`: Get orders report
    - `get_shipping_report`: Get shipping report

    ## Available Resources

    - `shipbob://docs/{section}`: Access documentation about ShipBob API
      - Available sections: overview, authentication, products, orders, inventory, fulfillment, webhooks, returns, locations, channels, reporting

    ## License

    MIT
