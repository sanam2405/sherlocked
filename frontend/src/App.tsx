import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Level1 from "./pages/level1";
import Level2 from "./pages/level2";
import Level3 from "./pages/level3";
import Level4 from "./pages/level4";
import ErrorPage from "./pages/ErrorPage";
import CongratulationsPage from "./pages/CongratulationsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/error-page" element={<ErrorPage />} />
          <Route path="/level-1" element={<Level1 />} />
          <Route path="/level-2" element={<Level2 />} />
          <Route path="/level-3" element={<Level3 />} />
          <Route path="/level-4" element={<Level4 />} />
          <Route path="/congratulations" element={<CongratulationsPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
