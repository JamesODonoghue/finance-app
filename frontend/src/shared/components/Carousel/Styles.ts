import styled from 'styled-components';
import { color } from '../../utils/styles';

export const StyledCarousel = styled.div`
    position: relative;
    margin: auto;
`;

export const StyledCarouselItem = styled.div`
    height: 200px;
    background: ${color.blueDark};
    border-radius: 1rem;
    color: #fff;
    text-align: center;
    z-index: 1;
`;

export const StyledCarouselItemMiddle = styled(StyledCarouselItem)`
    /* transform: scale(0.8) translate(0, -30px);
    z-index: 0; */
`;

export const StyledCarouselItemEnd = styled(StyledCarouselItem)`
    /* transform: scale(0.7) translate(0, -60px);
    z-index: -1; */
`;
