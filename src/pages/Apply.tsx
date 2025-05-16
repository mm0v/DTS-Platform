import { Routes, Route } from "react-router-dom"
import ApplyOne from "./ApplyOne"
import ApplyTwo from "./ApplyTwo"
import ApplyThree from "./ApplyThree"
import ApplyFour from "./ApplyFour"
import ApplyFive from "./ApplyFive"
import { FormProvider } from "../context/FormContext"

const Apply = () => {
  return (
    <FormProvider>
      <Routes>
        <Route index element={<ApplyOne />} />
        <Route path="two" element={<ApplyTwo />} />
        <Route path="three" element={<ApplyThree />} />
        <Route path="four" element={<ApplyFour />} />
        <Route path="five" element={<ApplyFive />} />
      </Routes>
    </FormProvider>
  )
}

export default Apply
