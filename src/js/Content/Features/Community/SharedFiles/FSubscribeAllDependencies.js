import {HTML, Localization} from "../../../../modulesCore";
import {Feature, User} from "../../../modulesContent";
import Workshop from "../Workshop";

export default class FSubscribeAllDependencies extends Feature {

    checkPrerequisites() {
        return User.isSignedIn;
    }

    apply() {
        document.getElementById("SubscribeItemBtn").addEventListener("click", () => {

            const subBtn = HTML.element(
                `<div class="btn_blue_steamui btn_medium">
                    <span>${Localization.str.workshop.subscribe_all}</span>
                </div>`
            );

            let active = false;

            document.querySelector(".newmodal .btn_green_steamui").insertAdjacentElement("beforebegin", subBtn);

            const continueBtn = subBtn.nextElementSibling;

            subBtn.addEventListener("click", async() => {

                if (active) { return; }
                active = true;

                const items = document.querySelectorAll(".newmodal #RequiredItems > a");
                const loader = HTML.element("<div class='loader'></div>");
                let failed = false;

                function cancelFn(e) { e.stopImmediatePropagation(); }

                subBtn.classList.add("btn_disabled");
                continueBtn.classList.add("btn_disabled");

                // Prevent closing the dialog via the "Continue" button
                continueBtn.addEventListener("click", cancelFn, true);

                for (const item of items) {

                    // If the user has pressed the "Cancel" button
                    if (!subBtn.isConnected) { return; }

                    item.querySelector(".requiredItem").insertAdjacentElement("beforeend", loader);

                    const id = new URL(item.href).searchParams.get("id");
                    const div = item.firstElementChild;

                    if (div.querySelector(".requiredItemSubscribed") !== null) {
                        div.classList.add("es_required_item--success");
                        continue;
                    }

                    try {
                        await Workshop.changeSubscription(id, this.context.appid, "subscribe");
                        div.classList.add("es_required_item--success");
                    } catch (err) {
                        failed = true;
                        HTML.beforeEnd(div, `<p>${err.message}</p>`);
                        div.classList.add("es_required_item--error");
                    }
                }

                loader.remove();

                continueBtn.removeEventListener("click", cancelFn, true);
                continueBtn.classList.remove("btn_disabled");

                if (!failed) {
                    continueBtn.dispatchEvent(new Event("click"));
                }
            });
        });
    }
}
