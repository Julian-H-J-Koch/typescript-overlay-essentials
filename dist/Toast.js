import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import './Toast.css';
// Zeigt einen kleinen Toast in der oberen rechten Ecke an, der nach 2,5 Sekunden wieder verschwindet
export function Toast({ state, setState }) {
    // Wird verwendet um die Toast-Notification ein-/auszublenden
    const [showToast, setShowToast] = useState(false);
    // Wird verwendet um den Inhalt der Toast-Notification zu bestimmen
    const [toastContent, setToastContent] = useState("");
    useEffect(() => {
        setToastContent(state);
    }, [state]);
    useEffect(() => {
        if (toastContent && toastContent !== "") {
            setShowToast(true);
            setTimeout(() => { setState(""); }, 2500); // Hinweis nach 2,5 Sekunden wieder ausblenden
        }
        else {
            setShowToast(false);
        }
    }, [toastContent, setState]);
    return _jsx(_Fragment, { children: showToast && (_jsx("div", { className: "toast-notification", role: "status", "aria-live": "polite", "aria-atomic": "true", children: toastContent })) });
}
