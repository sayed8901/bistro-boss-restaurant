// helmet dynamic title
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/menu-bg.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover
        coverImage={menuImg}
        title={"Our Menu"}
        description={"Would you like to try a dish?"}
      ></Cover>
      {/* main cover */}
      <div className="mt-28 -mb-20">
        <SectionTitle
          subHeading={"don't miss"}
          heading={"Today's Offer"}
        ></SectionTitle>
      </div>
      {/* offered menu items */}
      <MenuCategory items={offered}></MenuCategory>

      {/* dessert menu items */}
      <MenuCategory
        items={desserts}
        coverImg={dessertImg}
        title={"desserts"}
        description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
      ></MenuCategory>
      {/* pizza menu items */}
      <MenuCategory
        items={pizza}
        coverImg={pizzaImg}
        title={"pizza"}
        description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
      ></MenuCategory>
      {/* salads menu items */}
      <MenuCategory
        items={salad}
        coverImg={saladImg}
        title={"salad"}
        description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
      ></MenuCategory>
      {/* soup menu items */}
      <MenuCategory
        items={soup}
        coverImg={soupImg}
        title={"soup"}
        description={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
