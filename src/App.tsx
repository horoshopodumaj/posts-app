import "./App.css";
import PostDetails from "./pages/Post/PostDetails";
import Posts from "./pages/Posts/Posts";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      {/* Любой другой путь редиректим на главную */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
