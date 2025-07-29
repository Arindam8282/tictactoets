import * as React from 'react';

const Header = () => {
    return ( 
        <React.Fragment>
            <h1 className='text-5xl font-chilanka font-bold w-full flex items-center justify-center mt-5'>
                <span className="text-red-600">TIC</span>
                <span className="text-green-700">TAC</span>
                <span className="text-blue-400">TOE</span>
            </h1>
        </React.Fragment> 
    );
}
 
export default Header;