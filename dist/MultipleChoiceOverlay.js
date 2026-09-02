import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './MultipleChoiceOverlay.css';
// Der standard MultipleChoiceOverlay Status, der zur Initialisierung genutzt werden kann
export const defaultMultipleChoiceState = {
    headline: undefined,
    message: undefined,
    choices: [],
    disabledChoices: undefined,
    preInput: undefined,
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
// - choices: Ein String-Array mit den Optionen die ausgewählt werden können (ohne Angabe gibt es keine Auswahl)
// - disabledChoices: Ein String-Array mit den Optionen, die zwar vorhanden sind, aber nicht ausgewählt werden können (Einträge müssen identisch zu denen in choices sein und werden onst ignoriert)
// - preInput: Ein String-Array: Die Einträge sind stadardmäßig ausgewählt alle anderen nicht ausgewählt
// - cancelButtonText: ist der Text der auf dem Cancel Button stehen soll (ohne Angabe wird "Abbrechen" verwendet)
// - proceedButtonText: ist der Text der auf dem Proceed Button stehen soll (ohne Angabe wird "OK" verwendet)
// - handlerOk: ist die Funktion die bei Bestätigung des Inputs ausgeführt wird (Struktur: handlerOk(userInput, handlerArgs)
// - handlerCancel: ist die Funktion die bei Ablehnung des Inputs ausgeführt wird (Struktur: handlerCancel(handlerArgs)
// - handlerArgs: kann im handler als Argumente genutzt werden
// - addCloseButton: boolscher Wert, der angibt, ob ein x oben rechts als close-Button verfügbar sein soll (bricht die Aktion ohne handler ab, standardmäßig false)
// - proceedButtonStyle: ist der Style des Bestätigungsbuttons (Standardmäßig unverändert)
// - cancelButtonStyle: ist der Style des Abbrechenbuttons (Standardmäßig unverändert)
// - style: ist der Style des MultipleChoiceOverlay (Standardmäßig unverändert)
// Output: Der Input vom User wird am Ende an den handlerOk übergeben (oder bei handlerCancel ignoriert)!
// Somit wird der handler so aufgerufen: handlerOk(UserInput, handlerArgs) oder handlerCancel(handlerArgs)
export function MultipleChoiceOverlay({ state, setState }) {
    // Wird verwendet um das Infoverlay ein- und auszublenden
    const [showOverlay, setShowOverlay] = useState(false);
    // Wird verwendet um die ausgewählten Choices aktuell zu halten
    const [input, setInput] = useState([]);
    // Sobald der State von außen aktualisiert wird triggert diese Funktion
    // Die setzt showOverlay auf true
    useEffect(() => {
        if ((state === null || state === void 0 ? void 0 : state.message) != null || (state === null || state === void 0 ? void 0 : state.headline) != null) {
            setInput((state === null || state === void 0 ? void 0 : state.preInput) != null ? state.preInput : []);
            setShowOverlay(true);
        }
    }, [state]);
    // Toggled die Auswahl eines Choices
    // Setzt dafür den aktuellen Input auf den neuen Input + Choice
    const toggle = (choice) => {
        if (input.includes(choice)) {
            setInput(input.filter(item => item !== choice)); // Entfernt den Choice wenn er schon ausgewählt ist
        }
        else {
            setInput([...input, choice]); // Fügt den Choice hinzu wenn er noch nicht ausgewählt ist
        }
    };
    const handleAction = (handler, useInput) => {
        setShowOverlay(false);
        var tempState = {
            handler: handler,
            handlerArgs: state.handlerArgs
        };
        setState(defaultMultipleChoiceState);
        if (typeof tempState.handler === 'function' && useInput)
            tempState.handler(input, tempState.handlerArgs);
        else if (typeof tempState.handler === 'function')
            tempState.handler(tempState.handlerArgs);
    };
    return showOverlay ?
        _jsx("div", { className: "multiplechoice-overlay", children: _jsxs("div", { className: "multiplechoice-box", style: (state === null || state === void 0 ? void 0 : state.style) !== undefined ? state.style : {}, role: "dialog", "aria-modal": "true", "aria-labelledby": (state === null || state === void 0 ? void 0 : state.headline) != null ? "multiple-choice-headline" : undefined, "aria-label": (state === null || state === void 0 ? void 0 : state.headline) != null ? undefined : "Mehrfachauswahl", "aria-describedby": "multiple-choice-message", onKeyDown: (event) => { if (event.key === "Escape")
                    handleAction(state.handlerCancel, false); }, children: [state.addCloseButton ?
                        _jsx("span", { className: "closeButton", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", tabIndex: 0, className: "close-icon", onClick: () => handleAction(undefined, false), onKeyDown: (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault(); // Verhindert Scroll bei Space
                                        handleAction(undefined, false);
                                    }
                                }, role: "button", "aria-label": "Dialog schlie\u00DFen", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) }) :
                        _jsx(_Fragment, {}), _jsx("div", { className: "headline", id: "multiple-choice-headline", style: { whiteSpace: "pre-line", wordBreak: "break-word" }, children: _jsx("strong", { children: (state === null || state === void 0 ? void 0 : state.headline) != null ? state.headline : "" }) }), _jsx("div", { id: "multiple-choice-message", style: { whiteSpace: "pre-line", wordBreak: "break-word" }, children: (state === null || state === void 0 ? void 0 : state.message) != null ? state.message : "" }), _jsx("div", { className: "choices-input", role: "group", "aria-label": "Auswahloptionen", children: _jsx("div", { className: "choices-container", children: state === null || state === void 0 ? void 0 : state.choices.map(choice => {
                                var _a;
                                return (_jsxs("label", { className: "choice-label", children: [_jsx("input", { type: "checkbox", checked: input.includes(choice), disabled: (_a = state.disabledChoices) === null || _a === void 0 ? void 0 : _a.includes(choice), onChange: () => toggle(choice), tabIndex: 0, onKeyDown: (e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault(); // Verhindert Scroll bei Space
                                                    toggle(choice);
                                                }
                                            } }), choice] }, choice));
                            }) }) }), _jsxs("div", { className: "information-buttons", children: [_jsx("button", { onClick: () => handleAction(state.handlerCancel, false), onKeyDown: (event) => {
                                    if (event.key === "Enter" || event.key === ' ') {
                                        event.preventDefault(); // Verhindert Scroll bei Space
                                        handleAction(state.handlerCancel, false);
                                    }
                                }, className: "px-4 py-2 bg-gray-300 rounded", style: (state === null || state === void 0 ? void 0 : state.cancelButtonStyle) != null ? state.cancelButtonStyle : {}, children: (state === null || state === void 0 ? void 0 : state.cancelButtonText) != null ? state.cancelButtonText : "Abbrechen" }), _jsx("button", { onClick: () => handleAction(state.handlerOk, true), type: "button", autoFocus: true, onKeyDown: (event) => {
                                    if (event.key === "Enter" || event.key === ' ') {
                                        event.preventDefault(); // Verhindert Scroll bei Space
                                        handleAction(state.handlerOk, true);
                                    }
                                }, className: "px-4 py-2 bg-blue-600 text-white rounded", style: (state === null || state === void 0 ? void 0 : state.proceedButtonStyle) != null ? state.proceedButtonStyle : {}, children: (state === null || state === void 0 ? void 0 : state.proceedButtonText) != null ? state.proceedButtonText : "OK" })] })] }) }) : _jsx(_Fragment, {});
}
