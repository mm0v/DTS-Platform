"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ApplyFour() {
  const navigate = useNavigate() // useNavigate hook'u

  // Form məlumatlarını saxlayacaq state
  const [formData, setFormData] = useState({
    digitalTransformationLeader: "",
    hasStrategy: "",
    highLevelManagementSupport: "",
    financialNeeds: "",
    transformationBudget: "",
  })

  // Komponent yüklənəndə localStorage-dən məlumatları oxumaq
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formDataFour') || '{}')
    if (savedData) {
      setFormData(savedData)
    }
  }, [])

  // Form sahələrində dəyişiklik olduqda məlumatları localStorage-a yazmaq
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData(prevState => {
      const updatedData = { ...prevState, [name]: value }
      localStorage.setItem('formDataFour', JSON.stringify(updatedData)) // LocalStorage-a yazılır
      return updatedData
    })
  }

  // Geri butonuna basıldığında ApplyThree səhifəsinə keçid
  const handleGoBack = () => {
    navigate('/apply-three') // /apply-three sayfasına yönlendir
  }

  // Növbəti butonuna basıldığında ApplyFive səhifəsinə keçid
  const handleNext = () => {
    navigate('/apply-five') // /apply-five sayfasına yönlendir
  }

  return (
    <div className="min-h-screen w-full bg-black bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center py-10">
      {/* Progress Steps */}
      <div className="w-full max-w-4xl mb-8 px-4">
        <div className="relative w-full h-[1px] bg-blue-500">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${num <= 4 ? "bg-blue-500" : "bg-blue-900"}`}
              style={{ left: `${(num - 1) * 25}%` }}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <div className="text-center max-w-[100px]">Şirkət haqqında məlumat</div>
          <div className="text-center max-w-[100px]">Hüquqi və hüquqi quruluş</div>
          <div className="text-center max-w-[100px]">Rəqəmsal hazırlıq və transformasiya ehtiyacları</div>
          <div className="text-center max-w-[100px] text-blue-400">Liderlik və öhdəliklər</div>
          <div className="text-center max-w-[100px]">Tələb olunan sənədlər</div>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className="text-xs text-blue-400">1333 x 96</div>
        <h1 className="text-2xl md:text-3xl font-medium">Liderlik və öhdəliklər</h1>
      </div>

      <div className="w-full max-w-2xl space-y-4">
        {/* Digital Transformation Leader */}
        <div className="space-y-1">
          <label className="text-sm">Şirkətinizin rəqəmsal transformasiya lideri və ya komandası var mı?</label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="digitalTransformationLeader"
                value="Bəli"
                checked={formData.digitalTransformationLeader === "Bəli"}
                onChange={handleInputChange}
                className="text-blue-500"
              />
              <label className="text-sm">Bəli</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="digitalTransformationLeader"
                value="Xeyr"
                checked={formData.digitalTransformationLeader === "Xeyr"}
                onChange={handleInputChange}
                className="text-blue-500"
              />
              <label className="text-sm">Xeyr</label>
            </div>
          </div>
        </div>

        {/* Strategy and Roadmap */}
        <div className="space-y-1">
          <label className="text-sm">Şirkətiniz əvvəllər rəqəmsal transformasiya strategiyası və ya yol xəritəsi hazırlayıbmı?</label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="hasStrategy"
                value="Bəli"
                checked={formData.hasStrategy === "Bəli"}
                onChange={handleInputChange}
                className="text-blue-500"
              />
              <label className="text-sm">Bəli</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="hasStrategy"
                value="Xeyr"
                checked={formData.hasStrategy === "Xeyr"}
                onChange={handleInputChange}
                className="text-blue-500"
              />
              <label className="text-sm">Xeyr</label>
            </div>
          </div>
        </div>

        {/* High-Level Management Support */}
        <div className="space-y-1">
          <label className="text-sm">Yüksək səviyyəli rəhbərlər rəqəmsal transformasiya strategiyasının həyata keçirilməsinə sadiqdirmi?</label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="highLevelManagementSupport"
                value="Bəli"
                checked={formData.highLevelManagementSupport === "Bəli"}
                onChange={handleInputChange}
                className="text-blue-500"
              />
              <label className="text-sm">Bəli</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="highLevelManagementSupport"
                value="Xeyr"
                checked={formData.highLevelManagementSupport === "Xeyr"}
                onChange={handleInputChange}
                className="text-blue-500"
              />
              <label className="text-sm">Xeyr</label>
            </div>
          </div>
        </div>

        {/* Financial Needs */}
        <div className="space-y-1">
          <label className="text-sm">Şirkətinizin rəqəmsal halleri tətbiq etmək üçün maliyyə dəstəyinə ehtiyacı varmı?</label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="financialNeeds"
                value="Bəli"
                checked={formData.financialNeeds === "Bəli"}
                onChange={handleInputChange}
                className="text-blue-500"
              />
              <label className="text-sm">Bəli</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="financialNeeds"
                value="Xeyr"
                checked={formData.financialNeeds === "Xeyr"}
                onChange={handleInputChange}
                className="text-blue-500"
              />
              <label className="text-sm">Xeyr</label>
            </div>
          </div>
        </div>

        {/* Transformation Budget */}
        <div className="space-y-1">
          <label className="text-sm">Rəqəmsal transformasiya üçün tələb olunan texniki büdcə (əgər məlumdur)</label>
          <input
            type="number"
            name="transformationBudget"
            value={formData.transformationBudget}
            onChange={handleInputChange}
            className="w-full bg-transparent border border-gray-700 rounded p-2 focus:outline-none focus:border-blue-500"
            placeholder="AZN"
          />
        </div>

        {/* Geri və Növbəti Butonları */}
        <div className="flex justify-between mt-6">
          <button
            className="w-[48%] bg-gray-600 text-white py-3 rounded transition duration-200"
            onClick={handleGoBack} // Geri butonuna basıldığında ApplyThree sayfasına git
          >
            Geri
          </button>
          <button
            className="w-[48%] bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-200"
            onClick={handleNext} // Növbəti butonuna basıldığında ApplyFive sayfasına git
          >
            Növbəti
          </button>
        </div>
      </div>
    </div>
  )
}
