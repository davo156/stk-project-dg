export const loginCase = async (username: string, password: string): Promise<boolean> => {
  // Simulate an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!username || !password) return resolve(false);
      const isValid = username.length > 0 && password.length > 0;
      resolve(isValid);
    }, 1000);
  });
    
}