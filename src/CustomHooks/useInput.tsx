import {useState} from 'react';

const useInput = (input?:string):[string, (value:string)=>void] =>{
    const [value, setValue] = useState<string>(input || '');
    const handleValue = (value:string) => {
        setValue(value);
    }
    return [value, handleValue]
}

export {useInput};