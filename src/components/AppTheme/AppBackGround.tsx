import TextureImage from 'assets/texture.jpg';
import React from 'react';

interface Props{
    children?: React.ReactNode;
}
 const AppBackGround = ({children}: Props) => {
    return ( 
        <React.Fragment>
            <div style={{ backgroundImage: `url(${TextureImage})` }} className="-mt-2 ring-4 ring-gray-300 bg-cover bg-center h-screen w-full flex  justify-center">
                <div className='w-[600px] h-[500px] bg-gray-100 rounded-lg shadow-md'
                    style={{ boxShadow: "-10px 0 10px -10px white, 5px 0 10px -5px white" }}
                >
                    {children}
                </div>
            </div>
        </React.Fragment>
    );
}
export default AppBackGround;