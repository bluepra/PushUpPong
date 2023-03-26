import {React, useEffect} from 'react';

function HomePage(props) {
    useEffect(()=>{console.log('Home page')}, [])
    return (
        <div>
            <p>Home Page</p>
        </div>
    );
}

export default HomePage;