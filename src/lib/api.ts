/**
 * API service for Emerging Markets Bloom
 */
import { API_CONFIG, getApiUrl } from './config';

interface SubscriberData {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

interface SubscriberResponse {
  statusCode: number;
  message: {
    id: number;
    fname: string;
    lname: string;
    email: string;
    password: string;
  }
}

/**
 * Add a new subscriber to the newsletter
 * @param data Subscriber data
 * @returns Promise with the API response
 */
export const addSubscriber = async (data: SubscriberData): Promise<SubscriberResponse> => {
  try {
    // Get the API endpoint URL from configuration
    const apiUrl = getApiUrl(API_CONFIG.endpoints.addSubscriber);
    
    console.log('Sending subscriber data:', data);
    console.log('Using API URL:', apiUrl);
    
    // Using fetch API with the configured URL
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: API_CONFIG.headers,
      // Backend expects a flat JSON object: { fname, lname, email, password }
      body: JSON.stringify({
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
      })
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to add subscriber:', error);
    throw error;
  }
};
