import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import DetailPage from "./Pages/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/:showId", //:showId è solo un placeholder che indica che dopo la / c'è qualcosa
    element: <DetailPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
