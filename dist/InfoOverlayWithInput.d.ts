import { CSSProperties } from 'react';
import * as React from 'react';
import './InfoOverlayWithInput.css';
export interface InfoOverlayWithInputState {
    headline?: React.ReactNode;
    message?: React.ReactNode;
    preInput?: string;
    placeholder?: string;
    cancelButtonText?: React.ReactNode;
    proceedButtonText?: React.ReactNode;
    handlerOk?: ((userInput: string, args?: unknown) => void);
    handlerCancel?: ((args?: unknown) => void);
    handlerArgs?: unknown;
    addCloseButton?: boolean;
    proceedButtonStyle?: CSSProperties;
    cancelButtonStyle?: CSSProperties;
    style?: CSSProperties;
}
export declare const defaultInfoOverlayWithInputState: InfoOverlayWithInputState;
export declare function InfoOverlayWithInput({ state, setState }: {
    state: InfoOverlayWithInputState;
    setState: (state: InfoOverlayWithInputState) => void;
}): React.ReactElement;
