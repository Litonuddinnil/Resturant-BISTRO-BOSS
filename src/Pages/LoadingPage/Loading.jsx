import React from 'react';
import loadingImg from '../../assets/others/loader2.gif'
const Loading = () => {
    return (
        <div className='min-h-screen w-full bg-white items-center flex justify-center'>
            <img src={loadingImg} alt="" />
        </div>
    );
};

export default Loading;