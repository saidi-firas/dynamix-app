import ShopSection from "../components/homeComponents/ShopSection";
import ContactInfo from "../components/homeComponents/ContactInfo";
import CalltoActionSection from "../components/homeComponents/CalltoActionSection";
import Banner from "../components/Banner";
import Cat from "../components/Cat";
import Slider from "../components/slider/Slider";
import MostRated from "../components/homeComponents/MostRated/MostRated";
import Footer from "../components/Footer";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
const HomeScreen = () => {
  window.scrollTo(0, 0);
  const match = useRouteMatch();
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;

  return (
    <div>
      {!keyword ? (
        <>
          <Slider />
          <Cat />
          <MostRated />
          <Banner />
          <ShopSection
            keyword={keyword}
            pagenumber={pagenumber}
            match={match}
          />
          <CalltoActionSection />
          <ContactInfo />
          <Footer />
        </>
      ) : (
        <>
          <ShopSection
            keyword={keyword}
            pagenumber={pagenumber}
            match={match}
          />
          <ContactInfo />
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
