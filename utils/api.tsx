export const retrieveACP = async (uid: string): Promise<any> => {
  try {
    const response = await fetch(`/api/retrieve-acp?uid=${uid}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving ACP:', error);
    throw error;
  }
};

export const getProofFromBackend = async (hashUid: string): Promise<any> => {
  try {
    const response = await fetch('/api/proof', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hashUid }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving proof:', error);
    throw error;
  }
};

export const someOtherApiFunction = async (): Promise<any> => {
  try {
    const response = await fetch('/api/some-endpoint', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error;
  }
};
