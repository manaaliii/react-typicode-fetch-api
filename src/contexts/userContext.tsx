import React, {createContext} from 'react';

export const UserContext = createContext<string|null>(null);
export const UserDispatchContext = createContext<unknown>(p=>{});