import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn.jsx";
import SignUp from "./pages/AuthPages/SignUp.jsx";
import NotFound from "./pages/OtherPage/NotFound.js";
import UserProfiles from "./pages/UserProfiles.jsx";
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
