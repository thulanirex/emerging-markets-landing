/**
 * Test script for the Emerging Markets Bloom API
 * 
 * This file is for testing purposes only and can be deleted after verification
 */

import { addSubscriber } from './api';

// Test function to verify API connection
const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    
    const testData = {
      fname: 'Test',
      lname: 'User',
      email: 'test@example.com',
      password: ''
    };
    
    console.log('Sending test data:', testData);
    const response = await addSubscriber(testData);
    console.log('API response:', response);
    console.log('API connection successful!');
    return response;
  } catch (error) {
    console.error('API connection failed:', error);
    throw error;
  }
};

// Export for use in development
export { testApiConnection };
