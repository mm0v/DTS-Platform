import { useNavigate } from "react-router-dom";

export default function ApplyFive() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/apply-four");
  };

  return (
    <div className="min-h-screen bg-black bg-[url('/images/space-background.jpg')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center justify-center p-4">
      {/* Progress Bar */}
      <div className="w-full max-w-4xl mb-8 px-4">
        <div className="relative w-full h-[1px] bg-blue-500">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm ${num <= 5 ? "bg-blue-500" : "bg-blue-900"}`}
              style={{ left: `${(num - 1) * 25}%` }}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <div className="text-center max-w-[100px]">Şirkət haqqında məlumat</div>
          <div className="text-center max-w-[100px] text-blue-400">Mülkiyyət və hüquqi quruluş</div>
          <div className="text-center max-w-[100px]">Rəqəmsal hüquqi və transformasiya xidmətləri</div>
          <div className="text-center max-w-[100px]">Lisenzli və əhatəlidir</div>
          <div className="text-center max-w-[100px]">Tələb olunan sənədlər</div>
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-4xl bg-opacity-70 p-8 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 bg-purple-600 h-1"></div>
          <div className="text-center text-xl font-semibold">Tələb olunan sənədlər</div>
          <div className="flex-1 bg-purple-600 h-1"></div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-lg">Şirkətin dövlət reyestrindən çıxarış</label>
            <input type="file" className="w-full mt-2 py-2 px-4 bg-gray-800 text-white rounded-lg" />
            <p className="mt-2 text-sm text-gray-400">Yüklənən fayl 50 mb – dan çox ola bilməz.</p>
          </div>

          <div>
            <label className="block text-lg">Maliyyə hesabatları (son 2 il)</label>
            <input type="file" className="w-full mt-2 py-2 px-4 bg-gray-800 text-white rounded-lg" />
            <p className="mt-2 text-sm text-gray-400">Yüklənən fayl 50 mb – dan çox ola bilməz.</p>
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-blue-500" />
            <span className="ml-2 text-sm text-gray-400">
              Təqdim olunan məlumatların doğruluğunu təsdiq edirəm.
            </span>
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-blue-500" />
            <span className="ml-2 text-sm text-gray-400">
              Müraciətimlə əlaqədar 45İM tərəfindən əlaqə saxlanmasını qəbul edirəm.
            </span>
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="h-4 w-4 text-blue-500" />
            <span className="ml-2 text-sm text-gray-400">
              İstifadə şərtləri və gizlilik şərtləri ilə razıyam.
            </span>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="button"
              onClick={handleGoBack}
              className="bg-gray-700 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
            >
              Geri
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700"
            >
              Təsdiq et
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
