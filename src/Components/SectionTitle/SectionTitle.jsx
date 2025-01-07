import React from 'react';

const SectionTitle = ({heading,subheading}) => {
    return (
        <div className='my-8 md:w-1/3 mx-auto text-center'>
            <h3 className='text-yellow-500 text-lg font-bold  pb-2'>--- {heading} ---</h3> 
            <p className='text-4xl uppercase py-4   border-y-4'>{subheading}</p>
        </div>
    );
};

export default SectionTitle;