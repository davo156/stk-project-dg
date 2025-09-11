import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../entities/user.entity";

type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const AppContext = createContext<UserContextType | undefined>(undefined);

type ContextProviderProps = {
    children: ReactNode;
};

export const AppProvider = ({ children }: ContextProviderProps ) => {
  const [user, setUser] = useState<User | null>(null);

  // const loginUser = useCallback(() => {
  //   setUser({ 
  //     name: 'David Gutierrez', 
  //     username: 'username', 
  //     email: 'davido.gutierrez@softtek.com', 
  //     image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' 
  //   });
  // }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      { children }
    </AppContext.Provider>
  )
}

// TODO: Change to file
export const useUserContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('Context not found')
  }
  return context;
}