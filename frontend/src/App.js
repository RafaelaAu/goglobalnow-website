import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { I18nProvider } from "./i18n";
import { initAnalytics, trackPageView } from "./lib/analytics";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Destinations from "./pages/Destinations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
}

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <div className="App font-body">
      <I18nProvider>
        <BrowserRouter>
          <RouteTracker />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </I18nProvider>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
