import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
import Show from "./pages/Show";
import MainLayout from "./components/MainLayout";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalTheme } from "./theme";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalTheme>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/starred" element={<Starred />} />
              <Route path="*" element={<div> Not found</div>} />
            </Route>
            <Route path="/show/:showId" element={<Show />} />
          </Routes>
        </BrowserRouter>
      </GlobalTheme>
    </QueryClientProvider>
  );
}

export default App;
