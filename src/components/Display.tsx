import React, {useState} from 'react';
import Header from './Header.tsx'
// import DisplayTodos from './DisplayTodos.tsx';

interface HomeProps {
    item: string;
}
const Home:React.FC<HomeProps> = ({item}) => {

    return(
        <>
            <Header title={item} />
            helo there!
        </>
    )
}

export default Home;