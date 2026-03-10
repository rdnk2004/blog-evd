import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

import { ContentProvider } from './context/ContentContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminPanel from './components/admin/AdminPanel';

import Home from './pages/Home';
import Poetry from './pages/Poetry';
import SpiritualExperiences from './pages/SpiritualExperiences';
import Stories from './pages/Stories';
import Gallery from './pages/Gallery';
import About from './pages/About';
import GuestReflections from './pages/GuestReflections';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poetry" element={<Poetry />} />
          <Route path="/spiritual" element={<SpiritualExperiences />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/reflections" element={<GuestReflections />} />
          {/* Catch-all redirect to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      {/* Floating admin edit button — always visible */}
      <AdminPanel />
    </>
  );
}

function App() {
  return (
    <div className="app-root">
      <BrowserRouter>
        <ContentProvider>
          <AppLayout />
        </ContentProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
