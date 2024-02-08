// Setting the JWT token in localStorage
// localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhQGcuY29tIiwidXNlcklkIjoxLCJwZXJtaXNzaW9ucyI6W3siYXV0aG9yaXR5IjoiQURNSU4ifV19.GLlxylEzb4RYmIyMYyjGiCSZ8qDSueoSRRA5_N97Fis');

const fetchWithAuth = async (url) => {
    try {
      const token = localStorage.getItem('Authorization');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };

export const getBannedPosts = async (token) => {
    const response = await fetchWithAuth('http://localhost:10010/posts/banned');
    if(response && response.data) {
      return response.data;
    } else {
      return [];
    }
  };
  
  export const getUnbannedPosts = async (token) => {
    const response = await fetchWithAuth('http://localhost:10010/posts/published');
    if(response && response.data) {
      return response.data;
    } else {
      return [];
    }
  };
  
export const getDeletedPosts = async () => {
    const response = await fetchWithAuth('http://localhost:10010/posts/deleted');
    if(response && response.data) {
      return response.data;
    } else {
      return [];
    }
  };
  
  