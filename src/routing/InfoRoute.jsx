import { Route } from "react-router-dom";
import InfoPage from "../Pages/InfoPage/InfoPage";
import About from "../Pages/InfoPage/components/About/About";
import Activities from "../Pages/InfoPage/components/Activities/Activities";
import Publications from "../Pages/InfoPage/components/Publications/Publications";
import News from "../Pages/InfoPage/components/News/News";
import Exam from "../Pages/InfoPage/components/Exam/Exam";
import Contact from "../Pages/InfoPage/components/Contact/Contact";

const InfoPanelRoute = () => {
  return (
    <>
      <Route path="/info" element={<InfoPage/>} >
      <Route path="about" element={<About/>} />
      <Route path="activities" element={<Activities/>} />
      <Route path="publications" element={<Publications/>} />
      <Route path="news" element={<News/>} />
      <Route path="exam" element={<Exam/>} />
      <Route path="contact" element={<Contact/>} />
      </Route>
    </>
  );
};

export default InfoPanelRoute;
