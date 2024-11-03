import { useState } from "react";
import { useLocation } from "../hook/useLocation";
import { fetchCoordinate } from "../utils/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export function LocationField() {
  const {
    location,
    updateLocation,
    toggleIsSearch,
    history,
    addHistory,
    removeHistory,
  } = useLocation();
  const [value, setValue] = useState(location);
  const [error, setError] = useState(false);

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    submitValue?: string
  ) => {
    e.preventDefault();
    const country = submitValue ? submitValue : value;
    const targetCountry = fetchCoordinate(country);
    if (targetCountry.length > 0) {
      updateLocation(country);
      setError(false);
      toggleIsSearch();
      if (!history.includes(country)) {
        addHistory(country);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className=" h-svh" id="container">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          className="p-2 rounded-lg shadow-sm w-full"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          className="p-2 rounded-lg shadow-sm bg-[#0866FD] text-white"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500 text-xs">Invalid country or city</p>}
      <div className="my-4">
        <p className="font-semibold ">Search History</p>
        <div className="bg-white rounded-lg px-4 py-2 my-2">
          <form className="flex-col">
            {history.length > 0 ? (
              history.map((value) => {
                const targetCountry = fetchCoordinate(value);
                return (
                  <div key={value} className="flex my-4">
                    <p className="mr-auto" id={value}>
                      {targetCountry[0].country}, {targetCountry[0].alpha2}
                    </p>
                    <button
                      className="bg-white w-[16px] h-[16px] p-0 mx-2"
                      onClick={(e) => handleSubmit(e, value)}
                    >
                      <SearchIcon fontSize="small" />
                    </button>
                    <button
                      className="bg-white p-0 w-[16px] h-[16px] mx-2"
                      onClick={() => removeHistory(value)}
                    >
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No history available</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
