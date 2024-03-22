import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Level0 from "./pages/level0.jsx";
import Level1 from "./pages/level1.jsx";
import Level2 from "./pages/level2.jsx";
import Level3 from "./pages/level3.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/level-1" element={<Level1 />} />
          {/* <Route path='/level-2' element={<Level2 />} />
							<Route path='/level-3' element={<Level3 />} />
							<Route path='/level-4' element={<Level4 />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
