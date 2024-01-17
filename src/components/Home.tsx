import React from 'react';
import Header from './Header.tsx';

interface HomeProps {
    header: string;
}

const Home: React.FC<HomeProps> = ({header}) => {
    return (
        <>
            <Header title={header}/>
        </>
    )
}

export default Home;