import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './InfoOverlayWithInput.css';
// Um das InfoOverlayWithInput zu nutzen, muss der State die folgende Struktur haben:
export const defaultInfoOverlayWithInputState = {
    headline: undefined,
    message: undefined,
    preInput: undefined,
    placeholder: undefined,
    cancelButtonText: undefined,
    proceedButtonText: undefined,
    handlerOk: undefined,
    handlerCancel: undefined,
    handlerArgs: undefined,
    addCloseButton: false,
    proceedButtonStyle: undefined,
    cancelButtonStyle: undefined,
    style: undefined,
};
// Wobei alle Attribute grundsätzlich optional sind:
// - headline: ist die Überschrift und wird fett hinterlegt
// - message: ist die angezeigte Nachricht
// - preInput: Beinhaltet den Text der schon vorher im Inputfield stehen soll (ohne Angabe wird nichts angezeigt)
// - placeholder: Was bei leerem Inputfield als Platzhalter angezeigt wird (ohne Angabe wird nichts angezeigt)
// - cancelButtonText: ist der Text der auf dem Cancel Button stehen soll (ohne Angabe wird "Abbrechen" verwendet)
// - proceedButtonText: ist der Text der auf dem Proceed Button stehen soll (ohne Angabe wird "OK" verwendet)
// - handlerOk: ist die Funktion die bei Bestätigung des Inputs ausgeführt wird (Struktur: handlerOk(userInput, handlerArgs)
// - handlerCancel: ist die Funktion die bei Ablehnung des Inputs ausgeführt wird (Struktur: handlerCancel(handlerArgs)
// - handlerArgs: kann im handler als Argumente genutzt werden
// - addCloseButton: boolscher Wert, der angibt, ob ein x oben rechts als close-Button verfügbar sein soll (bricht die Aktion ohne handler ab, standardmäßig false)
// - proceedButtonStyle: ist der Style des Bestätigungsbuttons (Standardmäßig unverändert)
// - cancelButtonStyle: ist der Style des Abbrechenbuttons (Standardmäßig unverändert)
// - style: ist der Style des LoadingOverlaysWithInput (Standardmäßig unverändert)
// Output: Der Input vom User wird am Ende an den handlerOk übergeben (oder bei handlerCancel ignoriert)!
// Somit wird der handler so aufgerufen: handlerOk(UserInput, handlerArgs) oder handlerCancel(handlerArgs)
export function InfoOverlayWithInput({ state, setState }) {
    // Wird verwendet um das Infoverlay ein- und auszublenden
    const [showOverlay, setShowOverlay] = useState(false);
    // Wird verwendet um den Inhalt des InputFields aktuell zu halten
    const [input, setInput] = useState("");
    // Sobald der State von außen aktualisiert wird triggert diese Funktion
    // Die setzt showOverlay auf true
    useEffect(() => {
        if ((state === null || state === void 0 ? void 0 : state.message) != null || (state === null || state === void 0 ? void 0 : state.headline) != null) {
            setInput((state === null || state === void 0 ? void 0 : state.preInput) != null ? state.preInput : "");
            setShowOverlay(true);
        }
    }, [state]);
    // Sorgt dafür, dass die Eingabe beim tippen aktualisiert wird
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };
    // Sorgt dafür, dass auch bei Enter bestätigt wird
    const handleInputKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAction(state.handlerOk, true);
        }
    };
    const handleAction = (handler, useInput) => {
        setShowOverlay(false);
        var tempState = {
            handler: handler,
            handlerArgs: state.handlerArgs
        };
        setState(defaultInfoOverlayWithInputState);
        if (typeof tempState.handler === 'function' && useInput)
            tempState.handler(input, tempState.handlerArgs);
        else if (typeof tempState.handler === 'function')
            tempState.handler(tempState.handlerArgs);
    };
    return showOverlay ?
        _jsx("div", { className: "information-overlay-with-input", children: _jsxs("div", { className: "information-box-with-input", style: (state === null || state === void 0 ? void 0 : state.style) !== undefined ? state.style : {}, role: "dialog", "aria-modal": "true", "aria-labelledby": (state === null || state === void 0 ? void 0 : state.headline) != null ? "information-input-headline" : undefined, "aria-label": (state === null || state === void 0 ? void 0 : state.headline) != null ? undefined : "Information", "aria-describedby": "information-input-message", onKeyDown: (event) => { if (event.key === "Escape")
                    handleAction(state.handlerCancel, false); }, children: [state.addCloseButton ?
                        _jsx("span", { className: "closeButton", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", tabIndex: 0, className: "close-icon", onClick: () => handleAction(undefined, false), onKeyDown: (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault(); // Verhindert Scroll bei Space
                                        handleAction(undefined, false);
                                    }
                                }, role: "button", "aria-label": "Dialog schlie\u00DFen", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) }) :
                        _jsx(_Fragment, {}), _jsx("div", { className: "headline", id: "information-input-headline", style: { whiteSpace: "pre-line", wordBreak: "break-word" }, children: _jsx("strong", { children: (state === null || state === void 0 ? void 0 : state.headline) != null ? state.headline : "" }) }), _jsx("div", { id: "information-input-message", style: { whiteSpace: "pre-line", wordBreak: "break-word" }, children: (state === null || state === void 0 ? void 0 : state.message) != null ? state.message : "" }), _jsx("div", { className: "information-input", children: _jsx("input", { id: "information-inputfield", "aria-label": (state === null || state === void 0 ? void 0 : state.placeholder) != null ? state.placeholder : "Eingabe", autoFocus: true, placeholder: (state === null || state === void 0 ? void 0 : state.placeholder) != null ? state.placeholder : "", pattern: "^[A-Za-z0-9_-~]+$", required: true, type: "text", className: "form-control", value: input, onChange: handleInputChange, onKeyDown: handleInputKeyDown }) }), _jsxs("div", { className: "information-buttons", children: [_jsx("button", { onClick: () => handleAction(state.handlerCancel, false), className: "px-4 py-2 bg-gray-300 rounded", style: (state === null || state === void 0 ? void 0 : state.cancelButtonStyle) != null ? state.cancelButtonStyle : {}, tabIndex: 0, onKeyDown: (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault(); // Verhindert Scroll bei Space
                                        handleAction(state.handlerCancel, false);
                                    }
                                }, children: (state === null || state === void 0 ? void 0 : state.cancelButtonText) != null ? state.cancelButtonText : "Abbrechen" }), _jsx("button", { onClick: () => handleAction(state.handlerOk, true), className: "px-4 py-2 bg-blue-600 text-white rounded", style: (state === null || state === void 0 ? void 0 : state.proceedButtonStyle) != null ? state.proceedButtonStyle : {}, tabIndex: 0, children: (state === null || state === void 0 ? void 0 : state.proceedButtonText) != null ? state.proceedButtonText : "OK" })] })] }) }) : _jsx(_Fragment, {});
}
