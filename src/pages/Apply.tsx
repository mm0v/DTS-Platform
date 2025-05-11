// Apply.tsx
import { Routes, Route } from 'react-router-dom';
import ApplyOne from './ApplyOne';
import ApplyTwo from './ApplyTwo';
import ApplyThree from './ApplyThree';
import ApplyFour from './ApplyFour';
import ApplyFive from './ApplyFive';

// Diğer adımlar için import yapın

const Apply = () => {
  return (
    <div>
    
      <Routes>
        <Route path="/" element={<ApplyOne />} />
        <Route path="/apply-two" element={<ApplyTwo />} />
        <Route path="/apply-three" element={<ApplyThree />} />
        <Route path="/apply-four" element={<ApplyFour />} />
        <Route path="/apply-five" element={<ApplyFive />} /> 
        {/* Diğer adımlar */}
      </Routes>
    </div>
  );
};

export default Apply;
