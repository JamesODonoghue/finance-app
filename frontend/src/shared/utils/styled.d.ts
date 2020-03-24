import { Theme, darkTheme } from './theme';
import {} from 'styled-components';
declare module 'styled-components' {
    type Theme = typeof darkTheme;
    export interface DefaultTheme extends Theme {}
}
