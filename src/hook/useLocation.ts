import useLocationStore from "../stores/location";

export function useLocation() {
  const location = useLocationStore((state) => state.location);
  const history = useLocationStore((state) => state.history);
  const isSearch = useLocationStore((state) => state.isSearch);
  const updateLocation = useLocationStore((state) => state.updateLocation);
  const toggleIsSearch = useLocationStore((state) => state.toggleIsSearch);
  const addHistory = useLocationStore((state) => state.addHistory);
  const removeHistory = useLocationStore((state) => state.removeHistory);

  return {
    location,
    history,
    isSearch,
    updateLocation,
    toggleIsSearch,
    addHistory,
    removeHistory,
  };
}
