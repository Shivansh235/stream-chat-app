import { Routes, Route, Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import CallPage from "./pages/CallPage";
import NotificationPage from "./pages/NotificationPage";
import Onboardingpage from "./pages/Onboardingpage";
import Chatpage from "./pages/Chatpage";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import { useThemeStore } from "./Store/useThemeStore.js";
import { Layout } from "lucide-react";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const {theme} = useThemeStore();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading === true) {
    return <PageLoader />;
  }

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout  showSidebar={true}>
              <Homepage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/Onboarding"} />
            )
          }
        />

        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUp />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat"
          element={isAuthenticated ? <Chatpage /> : <Navigate to="/login" />}
        />
        <Route
          path="/notification"
          element={
            isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <Onboardingpage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
