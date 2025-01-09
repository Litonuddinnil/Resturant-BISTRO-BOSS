import React from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import imageBanner from "../../../assets/menu/banner3.jpg";
import imageDessert from "../../../assets/home/chef-service.jpg";
import imagePizza from "../../../assets/menu/pizza-bg.jpg";
import imageSoup from "../../../assets/menu/soup-bg.jpg";
import imageSalad from "../../../assets/menu/salad-bg.jpg"; 
import useMenu from "../../../hooks/useMenu";
import MenuCategory from "../MenuCategory/MenuCategory"; 
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
 
const Menu = () => {
  const [menu] = useMenu();
  
  const OfferedMenu = menu.filter(
    (offeredItems) => offeredItems.category === "offered"
  );
  const DessertMenu = menu.filter(
    (desertItems) => desertItems.category === "dessert"
  );
  const PizzaMenu = menu.filter(
    (PizzaItems) => PizzaItems.category === "pizza"
  );
  const SoupMenu = menu.filter((SoupItems) => SoupItems.category === "soup");
  const SaladMenu = menu.filter(
    (SaladItems) => SaladItems.category === "salad"
  );
  return (
    <div>
      <Helmet>
        <title>Bistro Boss Restaurant | Menu Page</title>
      </Helmet>
      <Cover
        image={imageBanner}
        heading={"Our menu"}
        subheading={"Would you like to try a dish?"}
      ></Cover> 
      <SectionTitle
        heading={"Don't miss"}
        subheading={"TODAY'S OFFER"}
      ></SectionTitle>
      <div className="max-w-screen-xl mx-auto">
        
        <MenuCategory item={OfferedMenu}></MenuCategory> 
      </div> 
      <div className="max-w-screen-xl mx-auto">
      <MenuCategory  image={imageDessert}
        heading={"Dessert"}
        subheading={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} item={DessertMenu}></MenuCategory>   
      </div> 
      <div className="max-w-screen-xl mx-auto"> 
        <MenuCategory  image={imagePizza}
        heading={"pizza"}
        subheading={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }  item={PizzaMenu}></MenuCategory> 
      </div>
     
      <div className="max-w-screen-xl mx-auto"> 
        <MenuCategory  image={imageSalad}
        heading={"salad"}
        subheading={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        } item={SaladMenu}></MenuCategory> 
      </div>
      
      <div className="max-w-screen-xl mx-auto">
      <MenuCategory  image={imageSoup}
        heading={"soup"}
        subheading={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }  item={SoupMenu}></MenuCategory>  
      </div>
    </div>
  );
};

export default Menu;
