import MarketplaceCards from "../components/MarketplacCards/MarketplaceCards";
import MarketplaceNavbar from "../components/MarketplaceNavbar";
import {  createBrowserRouter,  RouterProvider,} from "react-router";

function MainPages() {
  return (
    <div>
    <MarketplaceNavbar />
    <MarketplaceCards />
    </div>
  );
}
export default MainPages;