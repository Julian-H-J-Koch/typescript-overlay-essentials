import { ReactElement, CSSProperties } from 'react';
import * as React from 'react';
import './LoadingOverlay.css';
export interface LoadingOverlayState {
    isActive?: boolean;
    message?: React.ReactNode;
    color?: string;
    showSuccess?: boolean;
    style?: CSSProperties;
}
export declare const defaultLoadingOverlayState: LoadingOverlayState;
export declare function LoadingOverlay({ state, setState }: {
    state: LoadingOverlayState;
    setState: (state: LoadingOverlayState) => void;
}): ReactElement;
