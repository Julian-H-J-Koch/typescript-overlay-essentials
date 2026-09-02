import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './LoadingOverlay.css';
// Der standard LoadingOverlay Status, der zur Initialisierung genutzt werden kann
export const defaultLoadingOverlayState = {
    isActive: false,
    message: undefined,
    color: undefined,
    showSuccess: undefined,
    style: undefined,
};
// Wobei alle Attribute grundsätzlich optional sind:
// - isActive: gibt an ob das Overlay gerade aktiv sein soll oder nicht
// - message: ist die angezeigte Nachricht
// - color: ist dir Farbe des Loading icons (ohne Angabe HSD rot)
// - showSuccess: zeigt bei "true" ein grünes Häkchen an und bei "false" ein rot hinterlegtes X. Bei "undefined" wird die normale Ladeanimation gezeigt.
// - style: ist der Style des LoadingOverlays (Standardmäßig unverändert)
export function LoadingOverlay({ state, setState }) {
    var _a, _b, _c, _d;
    // Wird verwendet um das LoadingOverlay ein- und auszublenden
    const [showOverlay, setShowOverlay] = useState(false);
    // Sobald der State von außen aktualisiert wird triggert diese Funktion
    // Die setzt showOverlay auf true
    useEffect(() => {
        if (state === null || state === void 0 ? void 0 : state.isActive) {
            setShowOverlay(true);
        }
        else {
            setState(defaultLoadingOverlayState);
            setShowOverlay(false);
        }
    }, [state, setState]);
    return showOverlay ? (_jsx("div", { className: "loading-overlay", role: "status", "aria-live": "polite", "aria-atomic": "true", "aria-busy": (_a = state === null || state === void 0 ? void 0 : state.isActive) !== null && _a !== void 0 ? _a : false, children: _jsxs("div", { className: "loading-box", style: (state === null || state === void 0 ? void 0 : state.style) !== undefined ? state.style : {}, children: [_jsx("div", { className: "spinner " + (state.showSuccess === undefined ? "is-loading" : (state.showSuccess ? "is-success" : "is-error")), style: {
                        "--spinner-color": (_b = state.color) !== null && _b !== void 0 ? _b : "#e60028",
                        "--success-bg": (_c = state.color) !== null && _c !== void 0 ? _c : "#42ab34",
                        "--error-bg": (_d = state.color) !== null && _d !== void 0 ? _d : "#e60028",
                    }, "aria-hidden": "true" }), state.message && _jsx("div", { className: "loading-message", children: state.message })] }) })) : _jsx(_Fragment, {});
}
