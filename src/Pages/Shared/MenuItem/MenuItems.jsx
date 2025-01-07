import React from 'react';

const MenuItems = ({item}) => {
    const {name,recipe,image,price} =  item;
    return (
        <div className='flex my-8'>
            <img className='rounded-b-full rounded-tr-full w-[118px] h-[104px] mr-4' src={image} alt="" />
            <div>
                <h1 className='uppercase text-xl text-[#151515]'>{name}-----------</h1>
                <p className='text-sm text-[#737373]'>{recipe}</p>
            </div>
            
                <p className='text-yellow-500'>${price}</p> 
        </div>
    );
};

export default MenuItems;