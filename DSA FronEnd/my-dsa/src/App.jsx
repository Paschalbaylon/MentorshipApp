// import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import MenteePage from "./Pages/MenteePage";
import MentorPage from "./Pages/MentorPage";
import AdminPage from "./Pages/AdminPage";
import AdminSessions from "./Pages/AdminSessions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import ManageUser from "./Pages/ManageUser";
import ProfilePage from "./Pages/ProfilePage";
import ConfigurePlatform from "./Pages/ConfigurePlatform";
import MenteeSessionPage from "./Pages/MenteeSessionPage";
import CreateMentorProfile from "./Pages/CreateMentorProfile";
import ReviewMenteeRequests from "./Pages/ReviewMenteeRequests";
import ReviewMentorRequests from "./Pages/ReviewMentorRequests";
import ConfigMentee from "./Pages/ConfigMentee";
import MentorSessions from "./Pages/MentorSessions";
import MenteeSessions from "./Pages/MenteeSessions";
import FeedBack from "./Pages/FeedBack";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/Login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              // <HomePage />
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/Login/Sign_Up"
            element={
              // <SignUpPage />
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            path="/Login/Sign_In"
            element={
              // <SignInPage />
              <PublicRoute>
                <SignInPage />
              </PublicRoute>
            }
          />
          <Route path="/mentee" element={<MenteePage />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/manage-user" element={<ManageUser />} />
          <Route path="admin/manage-session" element={<AdminSessions />} />
          <Route path="admin/profile" element={<ProfilePage />} />
          <Route path="mentee/profile" element={<ProfilePage />} />
          <Route path="mentor/profile" element={<ProfilePage />} />
          <Route
            path="mentee/send-mentor-request"
            element={<MenteeSessionPage />}
          />
          <Route
            path="/admin/configure-platform"
            element={<ConfigurePlatform />}
          />
          <Route
            path="mentor/create-mentor"
            element={<CreateMentorProfile />}
          />
          <Route
            path="mentee/Review-mentee-requests"
            element={<ReviewMenteeRequests />}
          />
          <Route
            path="mentee/configure-mentee-profile"
            element={<ConfigMentee />}
          />
          <Route
            path="mentor/Review-mentor-requests"
            element={<ReviewMentorRequests />}
          />
          <Route path="mentor/Schedule-Session" element={<MentorSessions />} />
          <Route path="mentee/Schedule-Session" element={<MenteeSessions />} />
          <Route path="mentor/Feedback" element={<FeedBack />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
