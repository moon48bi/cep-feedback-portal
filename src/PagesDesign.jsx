 import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SubmissionPage from './pages/SubmissionPage';
import DisplayPage from './pages/DisplayPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubmissionPage />} />
        <Route path="/feedback" element={<DisplayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
