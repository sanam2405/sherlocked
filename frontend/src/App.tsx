import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Level1 from "./pages/level1";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
           <Route path="/error-page" element={<ErrorPage />} />
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
