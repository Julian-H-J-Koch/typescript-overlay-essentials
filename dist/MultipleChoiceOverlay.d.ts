import { CSSProperties } from 'react';
import * as React from 'react';
import './MultipleChoiceOverlay.css';
export interface MultipleChoiceOverlayState {
    headline?: React.ReactNode;
    message?: React.ReactNode;
    choices: string[] | [];
    disabledChoices?: string[];
    preInput?: string[];
    cancelButtonText?: React.ReactNode;
    proceedButtonText?: React.ReactNode;
    handlerOk?: ((userInput: string[], args?: unknown) => void);
    handlerCancel?: ((args?: unknown) => void);
    handlerArgs?: unknown;
    addCloseButton?: boolean;
    proceedButtonStyle?: CSSProperties;
    cancelButtonStyle?: CSSProperties;
    style?: CSSProperties;
}
export declare const defaultMultipleChoiceState: MultipleChoiceOverlayState;
export declare function MultipleChoiceOverlay({ state, setState }: {
    state: MultipleChoiceOverlayState;
    setState: (state: MultipleChoiceOverlayState) => void;
}): React.ReactElement;
