import ContextType from "../../../Modules/Context/ContextType";
import {GameId} from "../../../../Core/GameId";
import {CStore} from "../Common/CStore";
import FExtraLinks from "../Common/FExtraLinks";
import FDRMWarnings from "../Common/FDRMWarnings";
import FITADPrices from "../Common/FITADPrices";

export class CBundle extends CStore {
    constructor() {
        super(ContextType.BUNDLE, [
            FExtraLinks,
            FDRMWarnings,
            FITADPrices,
        ]);

        this.bundleid = GameId.getBundleid(window.location.host + window.location.pathname);
    }
}
