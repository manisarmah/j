import React from "react";
import { Route, Routes } from "react-router-dom";
import MonitoringPanel from "./pages/MonitoringPanel";
import Overview from "./pages/Overview";
import Flagging from "./pages/Flagging";
import Onboarding from "./pages/Onboarding";
import SourceOfIncome from "./pages/SourceOfIncome";
import UAR from "./pages/UAR";

function App() {
  return (
    <>
      <Routes>
        <Route path="/monitoring" element={<MonitoringPanel />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/flagging" element={<Flagging />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/sourceofincome" element={<SourceOfIncome />} />
        <Route path="/uar" element={<UAR />} />
      </Routes>
    </>
  );
}

export default App;
