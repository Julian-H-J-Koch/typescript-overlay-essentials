// Restricts input for the given textbox to the given inputFilter function.
export function setInputFilter(inputFilter, errMsg, textbox) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        if (textbox) {
            textbox.addEventListener(event, function (e) {
                var _a, _b, _c, _d;
                const target = e.currentTarget;
                if (inputFilter(target.value)) {
                    // Accepted value.
                    if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                        target.classList.remove("input-error");
                        target.setCustomValidity("");
                        target.removeAttribute("aria-invalid");
                    }
                    target.dataset.oldValue = target.value;
                    target.dataset.oldSelectionStart = (_b = (_a = target.selectionStart) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
                    target.dataset.oldSelectionEnd = (_d = (_c = target.selectionEnd) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : "";
                }
                else if (target.dataset.oldValue !== undefined) {
                    // Rejected value: restore the previous one.
                    target.classList.add("input-error");
                    target.setCustomValidity(errMsg);
                    target.reportValidity();
                    target.setAttribute("aria-invalid", "true");
                    target.value = target.dataset.oldValue;
                    const start = target.dataset.oldSelectionStart ? parseInt(target.dataset.oldSelectionStart) : 0;
                    const end = target.dataset.oldSelectionEnd ? parseInt(target.dataset.oldSelectionEnd) : start;
                    target.setSelectionRange(start, end);
                }
                else {
                    // Rejected value: nothing to restore.
                    target.value = "";
                }
            });
        }
    });
}
