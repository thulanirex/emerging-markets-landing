/**
 * Application configuration
 * Handles environment-specific settings
 */

// API configuration
export const API_CONFIG = {
  // Base URL for the API
  baseUrl: import.meta.env.PROD 
    ? 'https://api.emergingmarkets.online' 
    : '',
  
  // API endpoints
  endpoints: {
    addSubscriber: '/EMC/v2/addSubscriber',
  },
  
  // API headers
  headers: {
    'X-Custom-Header': 'vader',
    'Content-Type': 'application/json'
  }
};

/**
 * Get the full URL for an API endpoint
 * @param endpoint The endpoint path from API_CONFIG.endpoints
 * @returns The complete URL for the endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseUrl}${endpoint}`;
};
