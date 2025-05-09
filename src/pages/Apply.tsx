// Apply.tsx
import { Routes, Route, useNavigate } from 'react-router-dom';
import ApplyOne from './ApplyOne';
import ApplyTwo from './ApplyTwo';
import ApplyThree from './ApplyThree';
import ApplyFour from './ApplyFour';

// Diğer adımlar için import yapın

const Apply = () => {
  return (
    <div>
    
      <Routes>
        <Route path="/" element={<ApplyOne />} />
        <Route path="/apply-two" element={<ApplyTwo />} />
        <Route path="/apply-three" element={<ApplyThree />} />
        <Route path="/apply-four" element={<ApplyFour />} />
        {/* <Route path="/" element={<ApplyFive />} />
        <Route path="/" element={<ApplySix />} />
        <Route path="/" element={<ApplySeven />} />
        <Route path="/" element={<ApplyEight />} /> */ }
        {/* Diğer adımlar */}
      </Routes>
    </div>
  );
};

export default Apply;
