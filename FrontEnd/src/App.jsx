import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn.jsx";
import SignUp from "./pages/AuthPages/SignUp.jsx";
import NotFound from "./pages/OtherPage/NotFound.js";
import UserProfiles from "./pages/UserProfiles.js";
import Videos from "./pages/UiElements/Videos.js";
import Images from "./pages/UiElements/Images.js";
import Alerts from "./pages/UiElements/Alerts.js";
import Badges from "./pages/UiElements/Badges.js";
import Avatars from "./pages/UiElements/Avatars.js";
import Buttons from "./pages/UiElements/Buttons.js";
import Calendar from "./pages/Calendar.jsx";
import BasicTables from "./pages/Tables/BasicTables.js";
import FormElements from "./pages/Forms/FormElements.js";
import AppLayout from "./layout/AppLayout.jsx";
import { ScrollToTop } from "./components/common/ScrollToTop.js";
import Home from "./pages/Dashboard/Home.jsx";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />


            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            {/* <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} /> */}
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
