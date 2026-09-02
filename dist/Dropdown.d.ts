import * as React from 'react';
import './Dropdown.css';
export interface DropdownOption<T = string> {
    value: T;
    label: string;
    disabled?: boolean;
    indent?: number;
}
export declare function Dropdown<T = string>({ selections, value, onChange, maxMenuHeight, menuPlacement, width, placeHolder, defaultValue, isMulti, cardColorVariant, ignoreDarkMode, ...rest }: {
    selections: DropdownOption<T>[];
    value: T | T[];
    onChange: (value: T | T[] | undefined) => void;
    maxMenuHeight?: number;
    menuPlacement?: "top" | "bottom";
    width?: React.CSSProperties["width"];
    placeHolder?: string;
    defaultValue?: DropdownOption<T> | DropdownOption<T>[];
    isMulti?: boolean;
    cardColorVariant?: boolean;
    ignoreDarkMode?: boolean;
}): React.ReactElement;
