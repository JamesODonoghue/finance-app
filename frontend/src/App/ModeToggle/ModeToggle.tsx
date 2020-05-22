import React from 'react';
import { CheckBoxWrapper, CheckBox, CheckBoxLabel } from './Styles';

export const ModeToggle = ({ handleChange }: { handleChange: any }) => {
    return (
        <CheckBoxWrapper>
            <CheckBox id="checkbox" type="checkbox" onChange={handleChange} />
            <CheckBoxLabel htmlFor="checkbox" />
        </CheckBoxWrapper>
    );
};
