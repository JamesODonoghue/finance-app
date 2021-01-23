import React, { FC, ReactNode, useState } from 'react';
export interface DropdownProps {
    selected: {
        value: string;
        text: string;
    };
    onClick?: (event: Event) => void;
    children: ReactNode;
}

export interface DropdownOption {
    value: string;
    text: string;
}

export interface DropdownItemProps {
    option: DropdownOption;
    onClick?: (event: DropdownOption) => void;
}
export const DropdownItem: FC<DropdownItemProps> = ({ option, onClick }: DropdownItemProps) => (
    <li
        id={`list-item-${option.value}`}
        key={`list-item-${option.value}`}
        className="text-gray-900 select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white transition-all duration-75"
        value={option.value}
        onClick={() => onClick && onClick(option)}
    >
        <div className="flex items-center">
            <span className="block truncate">{option.text}</span>
        </div>
    </li>
);
export const Dropdown: FC<DropdownProps> = ({ children, selected }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative font-semibold">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 font-semibold"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center">
                    <span className="block truncate">{selected.text}</span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </button>

            {isOpen ? (
                <button
                    onClick={() => setIsOpen(!setIsOpen)}
                    type="button"
                    className="fixed h-full w-full inset-0 focus:outline-none cursor-default"
                >
                    text
                </button>
            ) : (
                ''
            )}
            {isOpen ? (
                <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
                    <ul
                        role="listbox"
                        aria-labelledby="listbox-label"
                        className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
                    >
                        {children}
                    </ul>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};
