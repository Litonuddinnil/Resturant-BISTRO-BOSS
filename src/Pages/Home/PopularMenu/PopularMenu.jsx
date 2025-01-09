import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuItems from "../../Shared/MenuItem/MenuItems"; 

const PopularMenu = () => {
  const [menu] = useMenu();
  const  popularMenu = menu.filter((items) => items.category === "popular");
// console.log(popularMenu) 
  return (
    <div>
      <section>
        <SectionTitle
          heading={"Check it out"}
          subheading={"FROM OUR MENU"}
        ></SectionTitle>
      </section>
      <section className="grid grid-cols-2 items-center  gap-4">
        {popularMenu.map((item) => (
          <MenuItems item={item} key={item._id}></MenuItems>
        ))}
      </section>
      <div className="flex items-center justify-center">
        <Link to={"/menu"}><button className="btn btn-outline border-0 mb-6  border-b-4">
          View Full Menu.
        </button></Link>
      </div>
    </div>
  );
};

export default PopularMenu;
