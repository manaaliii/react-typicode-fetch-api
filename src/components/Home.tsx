import React from 'react';
import Header from './Header.tsx';

interface HomeProps {
    item: string;
}

const Home: React.FC<HomeProps> = ({item}) => {
    return (
        <>
            <Header title={item}/>
        </>
    )
}

export default Home;