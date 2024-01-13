import React, {createContext} from 'react';

export const ResultsContext = createContext<object[]|null>(null);
export const ResultsDispatchContext = createContext<unknown>(p=>{});