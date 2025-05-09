import { useNavigate } from "react-router-dom";

const ApplyThree = () => {
  const navigate = useNavigate();

  // Handler for the 'Back' button
  const handleGoBack = () => {
    navigate("/apply-two"); // Navigate to apply-two
  };

  // Handler for the 'Next' button
  const handleGoNext = () => {
    navigate("/apply-four"); // Navigate to apply-four
  };

  return (
    <div className="min-h-screen bg-black bg-[url('/images/space-background.jpg')] bg-cover bg-center text-white flex flex-col items-center justify-center py-10">
       <div className="w-full max-w-4xl mb-8 px-4">
        <div className="relative w-full h-[1px] bg-blue-500">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${num <= 3 ? "bg-blue-500" : "bg-blue-900"}`}
              style={{ left: `${(num - 1) * 25}%` }}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <div className="text-center max-w-[100px]">Şirkət haqqında məlumat</div>
          <div className="text-center max-w-[100px] ">Mülkiyyət və hüquqi quruluş</div>
          <div className="text-center max-w-[100px] text-blue-400">Rəqəmsal hüquqi və transformasiya xidmətləri</div>
          <div className="text-center max-w-[100px]">Lisenzli və əhatəlidir</div>
          <div className="text-center max-w-[100px]">Tələb olunan sənədlər</div>
        </div>
      </div>

      <div className="w-full max-w-4xl mb-8 px-6">
        <div className="text-center text-3xl font-semibold mb-6">
          Rəqəmsal hazırlıq və transformasiya ehtiyacları
        </div>
        <form className="space-y-6">
          {/* Dropdown for Current Digitalization Level */}
          <div className="flex justify-between items-center space-x-4">
            <label className="w-1/3">Mövcud rəqəmsallaşma səviyyəsi:</label>
            <select className="w-2/3 p-2 bg-gray-800 text-white rounded">
              <option value="">Seçin</option>
              {/* Add options here */}
            </select>
          </div>

          {/* Dropdown for Existing Digital Tools */}
          <div className="flex justify-between items-center space-x-4">
            <label className="w-1/3">Mövcud rəqəmsal alətlər</label>
            <select className="w-2/3 p-2 bg-gray-800 text-white rounded">
              <option value="">Seçin</option>
              {/* Add options here */}
            </select>
          </div>

          {/* Key Challenges in Digital Transformation */}
          <div className="space-y-2">
            <p className="text-xl">Rəqəmsal transformasiyada əsas çətinliklər:</p>
            <div className="space-y-1">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-500" />
                <span className="ml-2">Büdcə çatışmazlığı</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-500" />
                <span className="ml-2">Texniki təcrübənin (ekspert) çatışmazlığı</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-500" />
                <span className="ml-2">Təlimə ehtiyac</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-500" />
                <span className="ml-2">Rəqəmsal strategiyanın çatışmazlığı</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-500" />
                <span className="ml-2">İnfrastruktur məhdudiyyətləri</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-500" />
                <span className="ml-2">Digər</span>
              </label>
            </div>
          </div>

          {/* Main Digital Transformation Goals */}
          <div className="space-y-2">
            <p className="text-xl">Şirkətinizin əsas rəqəmsal transformasiya məqsədləri nədir? (Qısa olaraq qeyd edin)</p>
            <textarea
              className="w-full p-4 bg-gray-800 text-white rounded"
              rows={4}
              placeholder="Minimum 3 simvol, maksimum 500 simvol daxil edə bilərsiniz."
            />
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-between space-x-4 mt-8">
          <button
            onClick={handleGoBack}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Geri
          </button>
          <button
            onClick={handleGoNext}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Növbəti
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyThree;
