import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLocation } from "./hook/useLocation";

import { LocationField } from "./components/LocationField";
import { FutureForecast } from "./components/FutureForecast";
import { CurrentForecast } from "./components/CurrentForecast";
import { Header } from "./components/Header";

const queryClient = new QueryClient();

function App() {
  const { isSearch } = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center">
        <Header />
        <div className="w-full flex flex-col items-center py-4">
          {!isSearch ? (
            <div className="flex flex-col items-center w-[100%] gap-4">
              <CurrentForecast />
              <FutureForecast />
            </div>
          ) : (
            <div>
              <LocationField />
            </div>
          )}
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
