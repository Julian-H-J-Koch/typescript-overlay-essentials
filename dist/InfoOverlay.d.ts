import { CSSProperties } from 'react';
import * as React from 'react';
import './InfoOverlay.css';
export interface InfoOverlayState {
    headline?: React.ReactNode;
    message?: React.ReactNode;
    proceedButtonText?: React.ReactNode;
    handler?: ((args?: unknown) => void);
    handlerArgs?: unknown;
    addCloseButton?: boolean;
    style?: CSSProperties;
}
export declare const defaultInfoOverlayState: InfoOverlayState;
export declare function InfoOverlay({ state, setState }: {
    state: InfoOverlayState;
    setState: (state: InfoOverlayState) => void;
}): React.ReactElement;
