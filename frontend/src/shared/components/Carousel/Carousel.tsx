import React from 'react';
import Carousel from 'nuka-carousel';
import { PlaidItem } from '../../../Home/PlaidItemList/PlaidItem/PlaidItem';
export const AccountCarousel = ({ items }: { items: any }) => {
    return (
        <Carousel>
            {items?.map((item: any) => (
                <PlaidItem item={item}></PlaidItem>
            ))}
        </Carousel>
    );
};
