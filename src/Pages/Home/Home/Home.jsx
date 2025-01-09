import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import Cover from '../../Shared/Cover/Cover';
import { Helmet } from 'react-helmet-async';
import imagInfo from "../../../assets/home/chef-service.jpg";
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss Restaurant | Home Page</title>
            </Helmet>
            <Banner></Banner>
            <div className='max-w-screen-xl mx-auto'>   <Category></Category> </div>
            <div className='max-w-screen-xl mx-auto'>  
            <Cover image={imagInfo} heading={"Bistro Boss"} subheading={"Welcome to Bistro Boss.Step into a world where culinary excellence meets casual elegance. Bistro Boss is your ultimate destination for a dining experience that blends bold flavors, fresh ingredients, and a touch of sophistication."}></Cover>
            <PopularMenu></PopularMenu> </div>
            <Featured></Featured> 
            <div className='max-w-screen-xl mx-auto'>  
            <Testimonials></Testimonials> </div>
           
        </div>
    );
};

export default Home;