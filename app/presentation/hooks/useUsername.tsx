import { useState } from "react";

export const useUsername = () => {

  const [username, setUsername] = useState<string>();

  const onChangeUsername = (text: string) => {
    const filteredText = text.replace(/\s/g, '');
    setUsername(filteredText);
  }
  
  return {
    username,
    onChangeUsername
  }
}