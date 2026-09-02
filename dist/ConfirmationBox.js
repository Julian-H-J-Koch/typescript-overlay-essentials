import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useRef } from 'react';
import './ConfirmationBox.css';
// Der standard ComfirmationBox Status, der zur Initialisierung genutzt werden kann
export const defaultConfirmationState = {
    headline: undefined,
    message: undefined,
    message1: undefined,
    message2: undefined,
    cancelButtonText: undefined,
    proceedButtonText: undefined,
    handlerOk: undefined,
    handlerCancel: undefined,
    handlerArgs: undefined,
    addCloseButton: false,
    activateConfirm: undefined,
    proceedButtonStyle: undefined,
    cancelButtonStyle: undefined,
    style: undefined,
};
// Wobei alle Attribute grundsätzlich optional sind:
// - headline: Eine fett hinterlegte Überschrift (optional)
// - message1: ist die angezeigte Nachricht
// - message2: ist optional und wird fett hinterlegt (z.B. ein wichtiger Hinweis oder ähnliches)
// - message: ist optional und wird nur angezeigt, wenn message1 nicht gesetzt ist (damit message oder message1 genutzt werden kann)
// - cancelButtonText: ist der Text der auf dem Cancel Button stehen soll (ohne Angabe wird "Abbrechen" verwendet)
// - proceedButtonText: ist der Text der auf dem Proceed Button stehen soll (ohne Angabe wird "OK" verwendet)
// - handlerOk: ist die Funktion die bei Bestätigung der Box ausgeführt wird (nutzt handlerargs, erwartet also nur 1 Argument!)
// - handlerCancel: ist die Funktion die bei Ablehnung der Box ausgeführt wird (nutzt handlerargs, erwartet also nur 1 Argument!)
// - addCloseButton: boolscher Wert, der angibt, ob ein x oben rechts als close-Button verfügbar sein soll (bricht die Aktion ohne handler ab, standardmäßig false)
// - handlerArgs: kann im handler als weitere Argumente genutzt werden
// - activateConfirm: ist ein Boolean, der angibt ob die ConfirmationBox angezeigt werden soll oder nicht (wenn false, wird direkt handlerOk aufgerufen) (Standardmäßig true wenn nicht anders angegeben)
// - proceedButtonStyle: ist der Style des Bestätigungsbuttons (Standardmäßig unverändert)
// - cancelButtonStyle: ist der Style des Abbrechenbuttons (Standardmäßig unverändert)
// - style: ist der Style der Confirmation-Box (Standardmäßig unverändert)
export function ConfirmationBox({ state, setState }) {
    var _a, _b, _c;
    // Wird verwendet um die Confirmation Boxen ein- und auszublenden
    const [showConfirm, setShowConfirm] = useState(false);
    const confirmButtonRef = useRef(null);
    // Sobald der State von außen aktualisiert wird triggert diese Funktion
    // Die setzt showConfirm auf true (oder ruft die übergebene Funktion auf wenn confirmationBoxen disabled sind)
    useEffect(() => {
        var _a;
        if (state === null || state === void 0 ? void 0 : state.handlerOk) {
            if ((_a = state.activateConfirm) !== null && _a !== void 0 ? _a : true) {
                setShowConfirm(true);
                setTimeout(() => { var _a; (_a = confirmButtonRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, 0);
            }
            else {
                // Wenn activateConfirm explizit false ist, dann wird die übergebene Funktion direkt ausgeführt ohne ConfirmationBox
                if (typeof state.handlerOk === 'function')
                    state.handlerOk(state.handlerArgs);
            }
        }
    }, [state]);
    const handleAction = (handler) => {
        setShowConfirm(false);
        const tempState = {
            handler: handler,
            handlerArgs: state.handlerArgs
        };
        setState(defaultConfirmationState);
        if (typeof tempState.handler === 'function')
            tempState.handler(tempState.handlerArgs);
    };
    return showConfirm ?
        _jsx("div", { className: "confirmation-overlay", children: _jsxs("div", { className: "confirmation-box", style: (state === null || state === void 0 ? void 0 : state.style) !== undefined ? state.style : {}, role: "alertdialog", "aria-modal": "true", "aria-labelledby": (state === null || state === void 0 ? void 0 : state.headline) !== undefined ? "confirmation-headline" : undefined, "aria-label": (state === null || state === void 0 ? void 0 : state.headline) !== undefined ? undefined : "Bestätigung", "aria-describedby": "confirmation-message", onKeyDown: (event) => {
                    if (event.key === "Escape")
                        handleAction(state.handlerCancel);
                }, children: [state.addCloseButton ?
                        _jsx("span", { className: "closeButton", children: _jsx("button", { type: "button", className: "close-icon", onClick: () => handleAction(undefined), "aria-label": "Dialog schlie\u00DFen", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) }) }) :
                        _jsx(_Fragment, {}), (state === null || state === void 0 ? void 0 : state.headline) !== undefined ? _jsx("div", { className: "headline", id: "confirmation-headline", style: { whiteSpace: "pre-line", wordBreak: "break-word" }, children: _jsx("strong", { children: state === null || state === void 0 ? void 0 : state.headline }) }) : _jsx(_Fragment, {}), _jsx("div", { id: "confirmation-message", style: { whiteSpace: "pre-line", wordBreak: "break-word" }, children: (_b = (_a = state.message1) !== null && _a !== void 0 ? _a : state.message) !== null && _b !== void 0 ? _b : "" }), _jsx("div", { style: { whiteSpace: "pre-line", wordBreak: "break-word" }, children: _jsx("strong", { children: (_c = state.message2) !== null && _c !== void 0 ? _c : "" }) }), _jsxs("div", { className: "confirmation-buttons", children: [_jsx("button", { onClick: () => handleAction(state.handlerCancel), type: "button", className: "px-4 py-2 bg-gray-300 rounded", style: (state === null || state === void 0 ? void 0 : state.cancelButtonStyle) !== undefined ? state.cancelButtonStyle : {}, children: state.cancelButtonText ? state.cancelButtonText : "Abbrechen" }), _jsx("button", { onClick: () => handleAction(state.handlerOk), ref: confirmButtonRef, type: "button", className: "px-4 py-2 bg-blue-600 text-white rounded", style: (state === null || state === void 0 ? void 0 : state.proceedButtonStyle) !== undefined ? state.proceedButtonStyle : {}, children: state.proceedButtonText ? state.proceedButtonText : "OK" })] })] }) }) : _jsx(_Fragment, {});
}
