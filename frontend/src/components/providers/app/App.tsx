import QueryProvider from "@providers/query-provider/QueryProvider";
import Header from "@ui/header/Header";
import Welcome from "@ui/welcome/Welcome";

const App = () => {
  return (
    <QueryProvider>
      <Header />
      <Welcome />
    </QueryProvider>
  );
};

export default App;
