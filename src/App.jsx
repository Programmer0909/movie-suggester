import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
import Show from "./pages/Show";
import MainLayout from "./components/MainLayout";
import React from "react";
import { GlobalTheme } from "./theme";

function App() {
  return (
      <GlobalTheme>
        <HashRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/starred" element={<Starred />} />
              <Route path="*" element={<div> Not found</div>} />
            </Route>
            <Route path="/show/:showId" element={<Show />} />
          </Routes>
        </HashRouter>
      </GlobalTheme>
  );
}

export default App;
