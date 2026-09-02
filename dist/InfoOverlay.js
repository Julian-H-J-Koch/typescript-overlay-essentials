import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './InfoOverlay.css';
// Der standard InfoOverlay Status, der zur Initialisierung genutzt werden kann
export const defaultInfoOverlayState = {
    headline: undefined,
    message: undefined,
    proceedButtonText: undefined,
    handler: undefined,
    handlerArgs: undefined,
    addCloseButton: false,
    style: undefined,
};
// Wobei alle Attribute grundsätzlich optional sind:
// - headline: ist die Überschrift und wird fett hinterlegt
// - message: ist die angezeigte Nachricht
// - proceedButtonText: ist der Text der auf dem Procceed Button stehen soll (ohne Angabe wird "OK" verwendet)
// - handler: Funktion, die optional beim Bestätigen ausgeführt werden kann (Struktur: handler(args))
// - handlerArgs: kann im handler als Argumente genutzt werden
// - addCloseButton: boolscher Wert, der angibt, ob ein x oben rechts als close-Button verfügbar sein soll (bricht die Aktion ohne handler ab, standardmäßig false)
// - style: ist der Style der Information-Box (Standardmäßig unverändert)
export function InfoOverlay({ state, setState }) {
    // Wird verwendet um das Infoverlay ein- und auszublenden
    const [showOverlay, setShowOverlay] = useState(false);
    // Sobald der State von außen aktualisiert wird triggert diese Funktion
    // Die setzt showOverlay auf true
    useEffect(() => {
        if ((state === null || state === void 0 ? void 0 : state.message) !== undefined || (state === null || state === void 0 ? void 0 : state.headline) !== undefined) {
            setShowOverlay(true);
        }
    }, [state]);
    const handleAction = () => {
        setShowOverlay(false);
        const tempState = {
            handler: state.handler,
            handlerArgs: state.handlerArgs
        };
        setState(defaultInfoOverlayState);
        if (typeof tempState.handler === 'function')
            tempState.handler(tempState.handlerArgs);
    };
    return showOverlay ?
        _jsx("div", { className: "information-overlay", children: _jsxs("div", { className: "information-box", style: (state === null || state === void 0 ? void 0 : state.style) !== undefined ? state.style : {}, role: "dialog", "aria-modal": "true", "aria-labelledby": (state === null || state === void 0 ? void 0 : state.headline) !== undefined ? "information-headline" : undefined, "aria-label": (state === null || state === void 0 ? void 0 : state.headline) !== undefined ? undefined : "Information", "aria-describedby": "information-message", onKeyDown: (event) => { if (event.key === "Escape")
                    handleAction(); }, children: [state.addCloseButton ?
                        _jsx("span", { className: "closeButton", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", tabIndex: 0, className: "close-icon", onClick: () => setShowOverlay(false), onKeyDown: (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault(); // Verhindert Scroll bei Space
                                        setShowOverlay(false);
                                    }
                                }, role: "button", "aria-label": "Dialog schlie\u00DFen", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) }) :
                        _jsx(_Fragment, {}), _jsx("div", { className: "headline", id: "information-headline", style: { whiteSpace: "pre-line" }, children: _jsx("strong", { children: (state === null || state === void 0 ? void 0 : state.headline) !== undefined ? state.headline : "" }) }), _jsx("div", { id: "information-message", style: { whiteSpace: "pre-line", wordBreak: "break-word" }, children: (state === null || state === void 0 ? void 0 : state.message) !== undefined ? state.message : "" }), _jsx("div", { className: "information-buttons", children: _jsx("button", { type: "button", autoFocus: true, onClick: () => handleAction(), onKeyDown: (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault(); // Verhindert Scroll bei Space
                                    handleAction();
                                }
                            }, className: "px-4 py-2 bg-blue-600 text-white rounded", id: "infoButton", children: (state === null || state === void 0 ? void 0 : state.proceedButtonText) !== undefined ? state.proceedButtonText : "OK" }) })] }) }) : _jsx(_Fragment, {});
}
