import "./App.css";
import ScreenHome from "./ScreenHome";
import ScreenArticlesBySource from "./ScreenArticlesBySource";
import ScreenSource from "./ScreenSource";
import ScreenMyArticles from "./ScreenMyArticles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageError from "./pageError";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<ScreenHome />} />
        <Route path="/screensource" exact element={<ScreenSource />} />
        <Route
          path="/screenarticlesbysource/:sourceid"
          element={<ScreenArticlesBySource />}
          exact
        />
        <Route path="/screenmyarticles" exact element={<ScreenMyArticles />} />
        <Route path="*" element={<PageError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
