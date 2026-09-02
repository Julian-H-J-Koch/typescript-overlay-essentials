import "./ToggleSwitch.css";
export interface ToggleSwitchOption<T> {
    value: T;
    label: string;
}
export declare function ToggleSwitch<T>({ optionLeft, optionRight, value, onChange }: {
    optionLeft: ToggleSwitchOption<T>;
    optionRight: ToggleSwitchOption<T>;
    value: T;
    onChange: (value: T) => void;
}): import("react/jsx-runtime").JSX.Element;
