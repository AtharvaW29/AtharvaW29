import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";

const App = () => (
  <HelmetProvider>
    <Index />
  </HelmetProvider>
);

export default App;
