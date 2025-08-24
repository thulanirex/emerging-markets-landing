/**
 * API service for Emerging Markets Bloom
 */

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
/**
 * Add a new subscriber to the newsletter
 * @param data Subscriber data
 * @returns Promise with the API response
 */
export const addSubscriber = async (data: SubscriberData): Promise<SubscriberResponse> => {
  try {
    // Use Vite's built-in proxy server to avoid CORS issues
    // This will be proxied to http://192.241.137.126:8841/EMC/addSubscriber
    const proxyUrl = '/EMC/v2/addSubscriber';
    
    console.log('Sending subscriber data (flat):', data);
    
    // Using fetch API with the Vite proxy
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'X-Custom-Header': 'vader',
        'Content-Type': 'application/json'
      },
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
