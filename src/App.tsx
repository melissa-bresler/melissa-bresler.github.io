import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
// import Contact from "./pages/Contact";
import AdventureExe from "./pages/games/AdventureExe";
import MemoryMeltdown from "./pages/games/MemoryMeltdown";
import KaaxsDawn from "./pages/games/KaaxsDawn";
import Biosynth from "./pages/games/Biosynth";
import { Box } from "@mui/material";

const App: React.FC = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }
  }, []);

  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Box sx={{ flex: 1, overflow: "auto", display: "flex" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/adventureExe" element={<AdventureExe />} />{" "}
            <Route path="/memory-meltdown" element={<MemoryMeltdown />} />{" "}
            <Route path="/kaaxs-dawn" element={<KaaxsDawn />} />{" "}
            <Route path="/biosynth" element={<Biosynth />} />{" "}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
