import React, { useState } from "react";
import bannerCover from "../../../assets/shop/banner2.jpg";
import Cover from "../../Shared/Cover/Cover";
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../../hooks/useMenu";
import FoodCart from "../../../Components/FoodCart/FoodCart";
import { useParams } from "react-router-dom";
import FoodCartCarousel from "../../../Components/FoodCart/FoodCartCarousel";

const Order = () => {
  const categories = ["salad", "pizza", "soup", "desserts", "drinks"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();

  const DrinksMenu = menu.filter(
    (drinksItems) => drinksItems.category === "drinks"
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
        <title>Bistro Boss Restaurant | Order Page</title>
      </Helmet>
      <Cover
        image={bannerCover}
        heading={"Our Order Food"}
        subheading={
          "Would you like to try a dish with order food? Please pay first."
        }
      />
      <div className="my-8">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          {/* Tab List */}
          <TabList className="flex justify-center gap-6 border-b border-gray-300 pb-2">
            {["Salad", "Pizza", "Soup", "Dessert", "Drinks"].map((tab, idx) => (
              <Tab
                key={idx}
                className={`cursor-pointer px-4 py-2 text-sm font-semibold uppercase transition-colors duration-300 ${
                  tabIndex === idx
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-gray-500 hover:text-yellow-500"
                }`}
              >
                {tab}
              </Tab>
            ))}
          </TabList>

          {/* Tab Panels */}
          <div className="max-w-screen-xl mx-auto">
            <TabPanel>
              <FoodCartCarousel items={SaladMenu} />
            </TabPanel>
            <TabPanel>
              <FoodCartCarousel items={PizzaMenu} />
            </TabPanel>
            <TabPanel>
              <FoodCartCarousel items={SoupMenu} />
            </TabPanel>
            <TabPanel>
              <FoodCartCarousel items={DessertMenu} />
            </TabPanel>
            <TabPanel>
              <FoodCartCarousel items={DrinksMenu} />
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Order;
