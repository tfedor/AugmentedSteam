import ContextType from "../../../Modules/Context/ContextType";
import {CCommunityBase} from "../CCommunityBase";
import FHighlightMarketItems from "./FHighlightMarketItems";
import FMarketStats from "./FMarketStats";
import FHideActiveListings from "./FHideActiveListings";
import FMarketSort from "./FMarketSort";
import FPopularRefreshToggle from "./FPopularRefreshToggle";
import FMarketLowestPrice from "./FMarketLowestPrice";

export class CMarket extends CCommunityBase {

    constructor() {

        const features = [
            FHighlightMarketItems,
        ];

        // TODO This runs only on the homepage of the market, maybe this should be separated into two contexts?
        if (window.location.pathname.match(/^\/market\/$/)) {
            features.push(
                FMarketStats,
                FHideActiveListings,
                FMarketSort,
                FPopularRefreshToggle,
                FMarketLowestPrice,
            );
        }

        super(ContextType.MARKET, features);
    }
}
