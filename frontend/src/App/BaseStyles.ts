import { font } from './../shared/utils/styles';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html, body #root {
        height: 100%;
        min-height: 100%;
    }

    body {
        color: ${(props) => props.theme.color};
        -webkit-tap-highlight-color: transparent;
        background: ${(props) => props.theme.background};
        ${font.regular}
    }

`;
