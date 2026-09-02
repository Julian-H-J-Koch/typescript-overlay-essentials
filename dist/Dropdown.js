import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect, useState } from 'react';
import Select from 'react-select';
import './Dropdown.css';
// Wobei alle Attribute außer dem value und dem label optional sind:
// - value: Der Wert, der bei Auswahl gesetzt werden soll
//      -> Dabei kann es sich um komplexe Objekte handeln, diese müssen dann ein Attribut id haben, mithilfe derer sie verglichen werden!
// - label: Der String, der in der Auswahl angezeigt werden soll
// - disabled: Kann auf true gesetzt werden, wenn diese Option nicht zur Auswahl verfügbar sein soll
// - indent: Eine Zahl größer 0, kann angegeben werden, wenn die Option mit so vielen Strichen eingerückt werden soll (nur im Auswahlmenü)
// Attribute vom Dropdown:
// - selections: Das Array mit den Optionen die zur Auswahl stehen sollen
// - value: Der Wert, der ausgewählt angezeigt werden soll (useState)
// - onChange: Die Funktion die bei Änderung ausgeführt werden soll.
//             Standardmäßig könnte z.B. {(value) => {value ? setValue(value) : setValue("")}} genutzt werden, wenn es sich bei value um einen String handelt
// - maxMenuHeight: Maximale Menühöhe in Pixeln (Optional)
// - menuPlacement: Ob das Menü oben oder unten platziert sein soll (Optional, Standard: Auto)
// - width: Breite des Menüs als CSS Property (Optional)
// - placeHolder: Der Platzhalter der angezeigt wird, wenn noch nichts ausgewählt ist (Optional) (Wird auch nur angezeigt, wenn value noch keinen validen Wert hat)
// - defaultValue: Die Auswahl die von Anfang an ausgewählt ist (Optional) (sollten mehrere Werte übergeben werden, wird "isMulti" automatisch gesetzt)
// - isMulti: Ob mehrere Optionen gleichzeitig ausgewählt werden können (Optional)
//      - Daraufhin MUSS value ein Array sein und falls defaultValue angegeben ist, MUSS das auch ein Array sein
// - cardColorVariant: Wenn auf true gesetzt, wird eine leicht andere Farbvariante gewählt
// - ignoreDarkMode: Wenn auf true gesetzt wird der DarkMode ignoriert, der sonst standardmäßig angewendet wird
// - ...rest (Optional): sorgt dafür, dass alle weiteren angegebenen Attribute (z.B. aria-label) direkt an React-Select weitergegeben werden
export function Dropdown({ selections, value, onChange, maxMenuHeight, menuPlacement, width, placeHolder, defaultValue, isMulti = false, cardColorVariant = false, ignoreDarkMode = false, ...rest }) {
    const initializedRef = useRef(false);
    const options = selections.map(({ value, label, disabled, indent }) => ({ value: value, label: label, isDisabled: disabled !== null && disabled !== void 0 ? disabled : false, indent }));
    if (!initializedRef.current && Array.isArray(value) && value.length === 0 && Array.isArray(defaultValue) && defaultValue.length > 0) {
        value = options.filter(opt => defaultValue.map(({ value }) => (value)).includes(opt.value)).map(opt => opt.value);
    }
    function usePrefersDarkMode() {
        const [isDarkMode, setIsDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
        useEffect(() => {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = (event) => setIsDarkMode(event.matches);
            // EventListener hinzufügen
            mediaQuery.addEventListener('change', handler);
            // Aufräumen
            return () => mediaQuery.removeEventListener('change', handler);
        }, []);
        return isDarkMode;
    }
    const isDarkModeRaw = usePrefersDarkMode();
    const isDarkMode = ignoreDarkMode ? false : isDarkModeRaw;
    function hasId(value) {
        return typeof value === "object" && value !== null && "id" in value;
    }
    return isMulti || Array.isArray(defaultValue) ? (_jsx(Select, { className: "custom-select", isMulti: true, "aria-label": placeHolder !== null && placeHolder !== void 0 ? placeHolder : "Auswahl", placeholder: placeHolder !== null && placeHolder !== void 0 ? placeHolder : "", options: options, value: options.length > 0 && hasId(options[0].value) ? // Wenn die values der Optionen ids haben, handelt es sich um komplexe Objekte, die zur Auswahl stehen und müssen dahingehend verglichen werden
            options.filter(opt => (hasId(opt.value) && value.find(val => hasId(val) && hasId(opt.value) && val.id === opt.value.id))) // Dann alle Optionen, die in den values per id vorkommen
            : options.filter(opt => (value.includes(opt.value))) // Ansonsten einfach alle Optionen, die in den values vorkommen
        , onChange: (selectedOption) => { initializedRef.current = true; onChange(selectedOption.map((opt) => opt.value)); }, maxMenuHeight: maxMenuHeight !== null && maxMenuHeight !== void 0 ? maxMenuHeight : 280, menuPlacement: menuPlacement !== null && menuPlacement !== void 0 ? menuPlacement : "auto", menuPosition: "fixed", classNamePrefix: "dropdown", defaultValue: options.filter(opt => defaultValue.map(({ value }) => (value)).includes(opt.value)), formatOptionLabel: ({ label, indent }, { context }) => {
            if (context === 'menu') {
                // Alle mit indent angegebenen Werte im Dropdown-Menü einrücken
                return indent && indent > 0 ? '-'.repeat(indent) + '\u00A0' + label : label;
            }
            else {
                // Im ausgewählten Zustand: normal
                return label;
            }
        }, styles: {
            container: (provided) => ({
                ...provided,
                backgroundColor: isDarkMode ? (cardColorVariant ? 'var(--FastSchwarz, black)' : 'black') : cardColorVariant ? 'var(--FastWeiß, white)' : 'white',
                color: isDarkMode ? 'white' : 'black',
                ...(width ? { width } : {})
            }),
            control: () => ({
                display: 'flex',
                ...(width ? { width } : {})
            }),
            menu: (provided) => ({
                ...provided,
                borderRadius: '8px', // runde Ecken für das Dropdown
                overflow: 'hidden',
                backgroundColor: isDarkMode ? (cardColorVariant ? 'var(--FastSchwarz, black)' : 'black') : cardColorVariant ? 'var(--FastWeiß, white)' : 'white',
                color: isDarkMode ? 'white' : 'black',
                ...(width ? { width } : {})
            }),
            menuList: (provided) => ({
                ...provided,
                overflowY: "auto",
                padding: 0,
                backgroundColor: isDarkMode ? (cardColorVariant ? 'var(--FastSchwarz, black)' : 'black') : cardColorVariant ? 'var(--FastWeiß, white)' : 'white',
                color: isDarkMode ? 'white' : 'black',
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? 'var(--DunkelAkzent, red)' : state.isSelected ? 'var(--MittelAkzent, blue)' :
                    isDarkMode ? (cardColorVariant ? 'var(--FastSchwarz, black)' : 'black') : cardColorVariant ? 'var(--FastWeiß, white)' : 'white',
                color: state.isFocused ? 'white' : state.isSelected ? 'var(--FastSchwarz, black)' :
                    isDarkMode ? (cardColorVariant ? 'white' : 'white') : cardColorVariant ? 'black' : 'var(--FastSchwarz, black)',
                cursor: 'pointer',
            }),
        }, ...rest })) : (_jsx(Select, { className: "custom-select", isMulti: false, "aria-label": placeHolder !== null && placeHolder !== void 0 ? placeHolder : "Auswahl", placeholder: placeHolder !== null && placeHolder !== void 0 ? placeHolder : "", options: options, value: options.length > 0 && hasId(options[0].value) ? // Wenn die values der Optionen ids haben, handelt es sich um komplexe Objekte, die zur Auswahl stehen und müssen dahingehend verglichen werden
            options.find(opt => hasId(opt.value) && hasId(value) && opt.value.id === value.id) // Die eine Option mit der passenden id finden
            : options.find(opt => opt.value === value), onChange: (selectedOption) => { var _a; return onChange((_a = selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.value) !== null && _a !== void 0 ? _a : undefined); }, maxMenuHeight: maxMenuHeight !== null && maxMenuHeight !== void 0 ? maxMenuHeight : 280, menuPlacement: menuPlacement !== null && menuPlacement !== void 0 ? menuPlacement : "auto", menuPosition: "fixed", classNamePrefix: "dropdown", defaultValue: defaultValue, formatOptionLabel: ({ label, indent }, { context }) => {
            if (context === 'menu') {
                // Alle mit indent angegebenen Werte im Dropdown-Menü einrücken
                return indent && indent > 0 ? '-'.repeat(indent) + '\u00A0' + label : label;
            }
            else {
                // Im ausgewählten Zustand: normal
                return label;
            }
        }, styles: {
            container: (provided) => ({
                ...provided,
                backgroundColor: isDarkMode ? (cardColorVariant ? 'var(--FastSchwarz, black)' : 'black') : cardColorVariant ? 'var(--FastWeiß, white)' : 'white',
                color: isDarkMode ? 'white' : 'black',
                ...(width ? { width } : {})
            }),
            control: () => ({
                display: 'flex',
                ...(width ? { width } : {})
            }),
            menu: (provided) => ({
                ...provided,
                borderRadius: '8px', // runde Ecken für das Dropdown
                overflow: 'hidden',
                backgroundColor: isDarkMode ? (cardColorVariant ? 'var(--FastSchwarz, black)' : 'black') : cardColorVariant ? 'var(--FastWeiß, white)' : 'white',
                color: isDarkMode ? 'white' : 'black',
                ...(width ? { width } : {})
            }),
            menuList: (provided) => ({
                ...provided,
                overflowY: "auto",
                padding: 0,
                backgroundColor: isDarkMode ? (cardColorVariant ? 'var(--FastSchwarz, black)' : 'black') : cardColorVariant ? 'var(--FastWeiß, white)' : 'white',
                color: isDarkMode ? 'white' : 'black',
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? 'var(--DunkelAkzent, red)' : state.isSelected ? 'var(--MittelAkzent, blue)' :
                    isDarkMode ? (cardColorVariant ? 'var(--FastSchwarz, black)' : 'black') : cardColorVariant ? 'var(--FastWeiß, white)' : 'white',
                color: state.isFocused ? 'white' : state.isSelected ? 'var(--FastSchwarz, black)' :
                    isDarkMode ? (cardColorVariant ? 'white' : 'white') : cardColorVariant ? 'black' : 'var(--FastSchwarz, black)',
                cursor: 'pointer',
            }),
        }, ...rest }));
}
