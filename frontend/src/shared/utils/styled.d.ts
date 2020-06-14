import { Theme, darkTheme } from './theme';
import {} from 'styled-components';
declare module 'styled-components' {
    type Theme = typeof darkTheme;
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface DefaultTheme extends Theme {}
}
