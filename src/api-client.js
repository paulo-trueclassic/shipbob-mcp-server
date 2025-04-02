import axios from 'axios';

    class ShipBobClient {
      constructor() {
        this.baseUrl = 'https://api.shipbob.com/1.0';
        this.apiKey = process.env.SHIPBOB_API_KEY;
        this.client = axios.create({
          baseURL: this.baseUrl,
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        });
      }

      async request(method, endpoint, data = null, params = null) {
        try {
          const response = await this.client({
            method,
            url: endpoint,
            data,
            params
          });
          return response.data;
        } catch (error) {
          console.error(`ShipBob API Error: ${error.message}`);
          if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Data: ${JSON.stringify(error.response.data)}`);
          }
          throw error;
        }
      }

      // Documentation helper
      async getDocumentation(section) {
        const docs = {
          'overview': 'ShipBob API provides e-commerce fulfillment services including inventory management, order processing, and shipping. The API allows integration with various platforms to automate fulfillment workflows.',
          'authentication': 'ShipBob API uses OAuth 2.0 for authentication. You need to obtain an API key from your ShipBob dashboard.',
          'products': 'The Products API allows you to manage your product catalog in ShipBob, including creating, updating, and retrieving product information.',
          'orders': 'The Orders API enables you to create and manage orders, including shipping and tracking information.',
          'inventory': 'The Inventory API provides access to real-time inventory levels across all fulfillment centers.',
          'fulfillment': 'The Fulfillment API allows you to manage the fulfillment process, including creating and tracking shipments.',
          'webhooks': 'ShipBob supports webhooks for real-time notifications about various events like order status changes.',
          'returns': 'The Returns API allows you to manage return requests and process returned items.',
          'locations': 'The Locations API provides information about ShipBob fulfillment centers and their capabilities.',
          'channels': 'The Channels API allows you to manage sales channels integrated with ShipBob.',
          'reporting': 'The Reporting API provides access to various reports about your ShipBob account.'
        };
        
        return docs[section.toLowerCase()] || 'Documentation section not found. Available sections: overview, authentication, products, orders, inventory, fulfillment, webhooks, returns, locations, channels, reporting';
      }

      // Products API
      async getProducts(params) {
        return this.request('GET', '/products', null, params);
      }

      async getProduct(id) {
        return this.request('GET', `/products/${id}`);
      }

      async createProduct(productData) {
        return this.request('POST', '/products', productData);
      }

      async updateProduct(id, productData) {
        return this.request('PUT', `/products/${id}`, productData);
      }

      // Orders API
      async getOrders(params) {
        return this.request('GET', '/orders', null, params);
      }

      async getOrder(id) {
        return this.request('GET', `/orders/${id}`);
      }

      async createOrder(orderData) {
        return this.request('POST', '/orders', orderData);
      }

      async cancelOrder(id, cancelData) {
        return this.request('POST', `/orders/${id}/cancel`, cancelData);
      }

      // Inventory API
      async getInventory(params) {
        return this.request('GET', '/inventory', null, params);
      }

      async getInventoryByProduct(productId) {
        return this.request('GET', `/inventory/products/${productId}`);
      }

      async getInventoryLevels(params) {
        return this.request('GET', '/inventory/levels', null, params);
      }

      async adjustInventory(adjustmentData) {
        return this.request('POST', '/inventory/adjustments', adjustmentData);
      }

      // Fulfillment API
      async getShipments(params) {
        return this.request('GET', '/shipments', null, params);
      }

      async getShipment(id) {
        return this.request('GET', `/shipments/${id}`);
      }

      async createShipment(shipmentData) {
        return this.request('POST', '/shipments', shipmentData);
      }

      // Webhooks API
      async getWebhooks() {
        return this.request('GET', '/webhooks');
      }

      async createWebhook(webhookData) {
        return this.request('POST', '/webhooks', webhookData);
      }

      async deleteWebhook(id) {
        return this.request('DELETE', `/webhooks/${id}`);
      }

      // Returns API
      async getReturns(params) {
        return this.request('GET', '/returns', null, params);
      }

      async getReturn(id) {
        return this.request('GET', `/returns/${id}`);
      }

      async createReturn(returnData) {
        return this.request('POST', '/returns', returnData);
      }

      // Locations API
      async getFulfillmentCenters() {
        return this.request('GET', '/fulfillment_centers');
      }

      async getFulfillmentCenter(id) {
        return this.request('GET', `/fulfillment_centers/${id}`);
      }

      // Channels API
      async getChannels() {
        return this.request('GET', '/channels');
      }

      async getChannel(id) {
        return this.request('GET', `/channels/${id}`);
      }

      // Reporting API
      async getInventoryReport(params) {
        return this.request('GET', '/reports/inventory', null, params);
      }

      async getOrdersReport(params) {
        return this.request('GET', '/reports/orders', null, params);
      }

      async getShippingReport(params) {
        return this.request('GET', '/reports/shipping', null, params);
      }
    }

    export const shipbobClient = new ShipBobClient();
