import * as React from 'react';
import { CSSProperties } from 'react';
import './ConfirmationBox.css';
export interface ConfirmationBoxState {
    headline?: React.ReactNode;
    message?: React.ReactNode;
    message1?: React.ReactNode;
    message2?: React.ReactNode;
    cancelButtonText?: React.ReactNode;
    proceedButtonText?: React.ReactNode;
    handlerOk?: ((args?: unknown) => void);
    handlerCancel?: ((args?: unknown) => void);
    handlerArgs?: unknown;
    addCloseButton?: boolean;
    activateConfirm?: boolean;
    proceedButtonStyle?: CSSProperties;
    cancelButtonStyle?: CSSProperties;
    style?: CSSProperties;
}
export declare const defaultConfirmationState: ConfirmationBoxState;
export declare function ConfirmationBox({ state, setState }: {
    state: ConfirmationBoxState;
    setState: (state: ConfirmationBoxState) => void;
}): React.ReactElement;
