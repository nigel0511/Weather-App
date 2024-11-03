import { useMemo } from "react";
import { useLocation } from "../hook/useLocation";
import { fetchCoordinate } from "../utils/utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";

export function Header() {
  const { location, toggleIsSearch } = useLocation();

  const targetCountry = useMemo(() => {
    return fetchCoordinate(location);
  }, [location]);

  return (
    <div className="flex mb-4 bg-white w-full justify-center p-2 sticky">
      <div className="flex" id="container">
        <p className="font-semibold mr-auto">
          <LocationOnIcon /> {targetCountry[0].country},{" "}
          {targetCountry[0].alpha2}
        </p>
        <button
          className="ml-atuo p-0 bg-white"
          onClick={() => toggleIsSearch()}
        >
          <SearchIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}
