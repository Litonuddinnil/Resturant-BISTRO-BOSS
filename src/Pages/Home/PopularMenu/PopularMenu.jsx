import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuItems from '../../Shared/MenuItem/MenuItems';

const PopularMenu = () => {
    const [menu,setMenu] = useState([]);
    useEffect(()=>{
        fetch("menu.json")
        .then(res =>res.json())
        .then(data =>{
            const PopulerItems = data.filter(items => items.category ==="popular");
            setMenu(PopulerItems);
        })
    },[]) 
    return (
        <div>
         <section>
            <SectionTitle heading={"Check it out"} subheading={"FROM OUR MENU"}></SectionTitle>
         </section>
         <section className='grid grid-cols-2 items-center gap-4'>
            {
                menu.map(item =>
                    <MenuItems item={item} key={item._id}></MenuItems>
                )
            }
         </section>
        </div>
    );
};

export default PopularMenu;