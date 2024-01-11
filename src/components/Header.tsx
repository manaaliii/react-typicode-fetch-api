import React, {useContext} from 'react';
import {UserContext} from "../contexts/userContext.tsx";

interface HeaderProps {
    title: string;
}
const Header:React.FC<HeaderProps> = ({title}) =>{
    console.log('hy ')
    const user = useContext(UserContext);
    console.log(user)
    return (<>

            {title ? (<h2>Your {title} Page is here !!!</h2> )
               :
               (<h2>Welcome {user} ! </h2>) }
        </>
    )

}

export default Header;