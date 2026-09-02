import { CSSProperties } from 'react';
import * as React from 'react';
import './MultipleRadioOverlay.css';
export interface MultipleRadioOverlayState {
    headline?: React.ReactNode;
    message?: React.ReactNode;
    choices: string[] | [];
    disabledChoices?: string[];
    preInput?: string;
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
export declare const defaultMultipleRadioState: MultipleRadioOverlayState;
export declare function MultipleRadioOverlay({ state, setState }: {
    state: MultipleRadioOverlayState;
    setState: (state: MultipleRadioOverlayState) => void;
}): React.ReactElement;
