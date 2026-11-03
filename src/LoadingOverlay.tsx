import { useEffect, useState, ReactElement, CSSProperties, Dispatch, SetStateAction } from 'react';
import * as React from 'react';
import './LoadingOverlay.css';

// Um das LoadingOverlay zu nutzen, muss der State die folgende Struktur haben:
export interface LoadingOverlayState {
    isActive?: boolean;
    message?: React.ReactNode;
    color?: string;
    showSuccess?: boolean;
    style?: CSSProperties;
}

// Der standard LoadingOverlay Status, der zur Initialisierung genutzt werden kann
export const defaultLoadingOverlayState: LoadingOverlayState = {
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

export function LoadingOverlay({ state, setState }: { state: LoadingOverlayState, setState: Dispatch<SetStateAction<LoadingOverlayState>> }): ReactElement {
    // Wird verwendet um das LoadingOverlay ein- und auszublenden
    const [showOverlay, setShowOverlay] = useState(false);

    // Sobald der State von außen aktualisiert wird triggert diese Funktion
    // Die setzt showOverlay auf true
    useEffect(() => {
        if (state?.isActive) {
            setShowOverlay(true);
        }
        else {
            setState(defaultLoadingOverlayState);
            setShowOverlay(false);
        }
    }, [state, setState]);
    
    return showOverlay ? (
        <div className="overlay-essentials-loading-overlay" role="status" aria-live="polite" aria-atomic="true" aria-busy={state?.isActive ?? false}>
            <div className="overlay-essentials-loading-box" style={state?.style !== undefined ? state.style : {}}>
                <div className={"overlay-essentials-spinner " + (state.showSuccess === undefined ? "overlay-essentials-is-loading" : (state.showSuccess ? "overlay-essentials-is-success" : "overlay-essentials-is-error"))}
                    style={{
                        "--spinner-color": state.color ?? "#e60028",
                        "--success-bg": state.color ?? "#42ab34",
                        "--error-bg": state.color ?? "#e60028",
                    } as React.CSSProperties }
                    aria-hidden="true" />
                {state.message && <div className="loading-message">{state.message}</div>}
            </div>
        </div>
    ) : <></>;
}