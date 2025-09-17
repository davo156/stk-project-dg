import { useUserContext } from '@/app/core/context/auth.provider';
import { loginCase } from '@/app/core/use-cases/auth/login-case';
import { useState } from 'react';
import { useLoginStore, useSecureStore } from './useLoginStore';


export const useLogin = ( username: string, password: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const token = useLoginStore( state => state.token );
  //const loginStore = useLoginStore( state => state.setToken );

  const { data, onSave, onGet } = useSecureStore();

  const { setUser } = useUserContext();
  
  const onLoginSubmit = async() => {
    setIsLoading(true);
    const isLogged = await loginCase(username, password);
    setHasError(!isLogged);
    //loginStore( isLogged ? 'fake-token' : '' );
    onSaveUserData()

    await onSave('token', isLogged ? 'fake-token' : '')
    await onSave('username', isLogged ? username : '')
    setIsLoading(false);
  }

  const onSaveUserData = async() => {
    let name = await onGet('username')

    if ( name === undefined || name === null ) {
      name = 'NA'
    }

    setUser({ 
      name: 'David Gutierrez', 
      username: name, 
      email: 'davido.gutierrez@softtek.com', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' 
    });
  }

  return {
    isLoading,
    token,
    data,
    hasError,
    onLoginSubmit,
    onGet,
    onSaveUserData
  }
}

// { name: 'David Gutierrez', username: username, email: 'davido.gutierrez@softtek.com', image: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png' }