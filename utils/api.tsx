export const retrieveACP = async (uid: string): Promise<any> => {
    const response = await fetch(`/api/retrieve-acp?uid=${uid}`);
    const data = await response.json();
    return data;
  };
  