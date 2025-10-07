import { Link } from "react-router-dom";
import { AddIcon, FilterIcon, SortIcon } from "./SVG/Admin";
import Popover from "@mui/material/Popover";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useTableSettings } from "../pages/admin/Applies";

function AppliesTableControllers() {
  const [anchorElFilter, setAnchorElFilter] =
    useState<HTMLButtonElement | null>(null);
  const [anchorElSort, setAnchorElSort] = useState<HTMLButtonElement | null>(
    null
  );

  const { tableSettings, setTableSettings } = useTableSettings();

  const [region, setRegion] = useState<string[]>([]);
  const [sector, setSector] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("newest");

  const handleSubmit = () => {
    setTableSettings({
      ...tableSettings,
      region,
      sector,
      sort,
      status,
    });
    handleClose("filter");
    handleClose("sort");
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    name: "filter" | "sort"
  ) => {
    if (name === "filter") {
      setAnchorElFilter(event.currentTarget);
    } else {
      setAnchorElSort(event.currentTarget);
    }
  };

  const handleClose = (name: "filter" | "sort") => {
    if (name === "filter") {
      setAnchorElFilter(null);
    } else {
      setAnchorElSort(null);
    }
  };

  const openFilter = Boolean(anchorElFilter);
  const openSort = Boolean(anchorElSort);
  const idFilter = openFilter ? "filter-popover" : undefined;
  const idSort = openSort ? "filter-popover" : undefined;

  const PopoverStyle = {
    top: "10px",
    ".MuiPaper-root": {
      borderRadius: "12px",
    },
  };

  useEffect(() => {
    console.log("Region selected:", region);
    console.log("Sector selected:", sector);
    console.log("Sort:", sort);
  }, [region, sector, sort]);

  const StyledCheckbox = ({
    value,
    name,
    id,
    array,
    setFunction,
    label,
    string,
    radio,
  }: {
    value: string;
    name: string;
    id: string;
    array?: string[];
    string?: string;
    label?: string;
    radio?: boolean;
    setFunction: (prev: any) => void;
  }) => {
    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      setFunction: (prev: any) => void
    ) => {
      const { value, checked } = event.target;
      if (checked) {
        setFunction((prev: any) => (radio ? value : [...prev, value]));
      } else {
        setFunction((prev: any) =>
          radio ? value : prev.filter((item: any) => item !== value)
        );
      }
    };
    return (
      <label
        htmlFor={id}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <input
          type="checkbox"
          name={name}
          value={value}
          id={id}
          checked={array ? array.includes(value) : string === value}
          onChange={(e) => handleChange(e, setFunction)}
          className="hidden"
        />
        <span
          className={`w-4 h-4 flex items-center justify-center border ${
            (array ? array.includes(value) : string === value)
              ? "border-[#1A4381] bg-[#1A4381]"
              : "border-[#E0E0E0] bg-white "
          }  rounded`}
        >
          {(array ? array.includes(value) : string === value) && (
            <Check color="white" />
          )}
        </span>
        <span className="text-sm font-normal font-ibm-plex-sans text-[#848484]">
          {label ? label : value}
        </span>
      </label>
    );
  };
  return (
    <>
      <input
        className="text-[#949494] transition hover:not-focus:bg-[#e6e5e5] w-full max-w-[500px] text-[14px] border border-[#d1d1d1] leading-5 px-4 py-2 rounded-[12px]"
        type="text"
        placeholder="Axtar"
        value={tableSettings.searchQuery}
        onChange={(e) =>
          setTableSettings({ ...tableSettings, searchQuery: e.target.value })
        }
      />
      <div className="flex gap-3 font-plus-jakarta">
        <button
          onClick={(event) => handleClick(event, "filter")}
          className="flex items-center gap-1.5 pl-3 px-2 py-2 border text-[#666666CC] rounded-xl text-[12px] leading-4 font-[700]  border-[#d1d1d1] transition hover:bg-[#cacaca] relative cursor-pointer "
        >
          Filter
          <FilterIcon />
          {(tableSettings.region.length > 0 ||
            tableSettings.sector.length > 0) && (
            <span className="w-3 h-3 rounded-full bg-[#1A4381] absolute -top-1 -right-1" />
          )}
        </button>
        <Popover
          id={idFilter}
          open={openFilter}
          anchorEl={anchorElFilter}
          onClose={() => handleClose("filter")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={PopoverStyle}
        >
          <div className="p-4 w-[185px] box-border flex flex-col ">
            <div className="flex flex-col gap-7 mb-3">
              <div className="flex flex-col gap-3">
                <h1 className="text-[13px] font-[700] leading-4 text-[#666] font-plus-jakarta">
                  Region
                </h1>
                <StyledCheckbox
                  value={"Bakı"}
                  name={"region"}
                  id={"baki"}
                  array={region}
                  setFunction={setRegion}
                />
                <StyledCheckbox
                  value={"Gəncə"}
                  name={"region"}
                  id={"ganja"}
                  array={region}
                  setFunction={setRegion}
                />
                <StyledCheckbox
                  value={"Sumqayıt"}
                  name={"region"}
                  id={"sumqayit"}
                  array={region}
                  setFunction={setRegion}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-[13px] font-[700] leading-4 text-[#666] font-plus-jakarta">
                  Sektor
                </h1>
                <StyledCheckbox
                  value={"Qida və içkilər"}
                  name={"sector"}
                  id={"qida_ve_ichkiler"}
                  array={sector}
                  setFunction={setSector}
                />

                <StyledCheckbox
                  value={"Neft - qaz"}
                  name={"sector"}
                  id={"neft_qaz"}
                  array={sector}
                  setFunction={setSector}
                />
                <StyledCheckbox
                  value={"Kimya"}
                  name={"sector"}
                  id={"kimya"}
                  array={sector}
                  setFunction={setSector}
                />
                <StyledCheckbox
                  value={"Metallurgiya"}
                  name={"sector"}
                  id={"metallurgiya"}
                  array={sector}
                  setFunction={setSector}
                />
                <StyledCheckbox
                  value={"Maşın və avadanlıqların təmiri və quraşdırılması"}
                  name={"sector"}
                  label="Maşın"
                  id={"masin_avadanliq_temiri_qurasdirilmasi"}
                  array={sector}
                  setFunction={setSector}
                />
                <StyledCheckbox
                  value={"Kauçuk və plastik məhsullar"}
                  name={"sector"}
                  label="Kauçuk və plastik"
                  id={"kaucuk_plastik_mehsullar"}
                  array={sector}
                  setFunction={setSector}
                />
                <StyledCheckbox
                  value={"Tekstil"}
                  name={"sector"}
                  id={"tekstil"}
                  array={sector}
                  setFunction={setSector}
                />
                <StyledCheckbox
                  value={"Elektrik avadanlıqları"}
                  name={"sector"}
                  id={"elektrik_avadanliqlari"}
                  array={sector}
                  setFunction={setSector}
                />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-[13px] font-[700] leading-4 text-[#666] font-plus-jakarta">
                  Status
                </h1>
                <StyledCheckbox
                  value={"Tamamlandı"}
                  name={"status"}
                  id={"done"}
                  array={status}
                  setFunction={setStatus}
                />

                <StyledCheckbox
                  value={"İcrada"}
                  name={"status"}
                  id={"process"}
                  array={status}
                  setFunction={setStatus}
                />
                <StyledCheckbox
                  value={"Tamamlanmadı"}
                  name={"status"}
                  id={"undone"}
                  array={status}
                  setFunction={setStatus}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={
                  tableSettings.region.sort().toString() ===
                    region.sort().toString() &&
                  tableSettings.sector.sort().toString() ===
                    sector.sort().toString() &&
                  tableSettings.status.sort().toString() ===
                    status.sort().toString()
                }
                className="cursor-pointer text-xs text-[#1A4381] disabled:cursor-not-allowed disabled:text-[#A0A0A0] font-[700] leading-4"
              >
                Seç
              </button>
            </div>
          </div>
        </Popover>
        <button
          onClick={(event) => handleClick(event, "sort")}
          className="flex items-center gap-1.5 pl-3 px-2 py-2 border text-[#666666CC] rounded-xl text-[12px] leading-4 font-[700]  border-[#d1d1d1] transition hover:bg-[#cacaca] cursor-pointer "
        >
          Sırala <SortIcon />
        </button>
        <Popover
          id={idSort}
          open={openSort}
          anchorEl={anchorElSort}
          onClose={() => handleClose("sort")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={PopoverStyle}
        >
          <div className="p-4 w-[185px] box-border flex flex-col ">
            <div className="flex flex-col gap-7 mb-3">
              <div className="flex flex-col gap-3">
                <StyledCheckbox
                  value={"newest"}
                  label={"Ən yeni"}
                  name={"sort"}
                  id={"newest"}
                  string={sort}
                  setFunction={setSort}
                  radio={true}
                />
                <StyledCheckbox
                  value={"oldest"}
                  label={"Ən köhnə"}
                  name={"sort"}
                  id={"oldest"}
                  string={sort}
                  setFunction={setSort}
                  radio={true}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                disabled={sort === tableSettings.sort}
                onClick={handleSubmit}
                className="cursor-pointer text-xs text-[#1A4381] disabled:cursor-not-allowed disabled:text-[#A0A0A0] font-[700] leading-4"
              >
                Seç
              </button>
            </div>
          </div>
        </Popover>
        <Link to={"/admin/add_company"}>
          <button className="flex items-center gap-1.5 pl-3 px-2 py-2 border text-[#fff] bg-[#1A4381] rounded-xl text-[12px] leading-4 font-[700]  border-[#1A4381] transition hover:bg-[#112b52] cursor-pointer whitespace-nowrap ">
            Əlavə Et <AddIcon />
          </button>
        </Link>
      </div>
    </>
  );
}

export default AppliesTableControllers;
