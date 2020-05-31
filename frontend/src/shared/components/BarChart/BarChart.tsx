import React, { useEffect, useRef, useState } from 'react';
import useTransactions from '../../services/transactions';
import useAuth from '../../../context/auth';
import _ from 'lodash';
import moment from 'moment';
import { font } from '../../utils/styles';
import { useTheme } from 'styled-components';
import { StyledSvg } from './Styles';
import { select, axisBottom, axisLeft, scaleTime, scaleLinear, max } from 'd3';

export const getMonthlySpending = (data: any[]) => {
    let dataByMonth = _.groupBy(data, (item) =>
        moment(item.date, 'YYYY-M-DD').startOf('month'),
    );
    let totalSpentReducer = (acc: number, item: any) => acc + item.amount;

    return Object.keys(dataByMonth).map((key) => ({
        date: key,
        amount: dataByMonth[key].reduce(totalSpentReducer, 0),
    }));
};
export const BarChart = ({
    data = [],
    parentNode,
}: {
    data: any[];
    parentNode: any;
}) => {
    const { color } = useTheme();
    const [width, setChartWidth] = useState(800);
    const height = 400;
    const margin = { top: 50, bottom: 50, left: 50, right: 50 };
    const barWidth = 50;

    const d3Container = useRef(null);

    if (data && data.length > 0 && d3Container.current) {
        data = getMonthlySpending(data);
    }

    let dateObj = new Date();

    let x = scaleTime()
        .domain([dateObj.setMonth(dateObj.getMonth() - 6), new Date()])
        .range([margin.left, width - margin.right]);

    let y = scaleLinear()
        .domain([0, max(data, (item) => item.amount)])
        .range([height - margin.bottom, margin.top]);

    const getTickFormat = (val: any) =>
        Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(val);

    const getXaxis = (node: any) =>
        select(node)
            .call(axisBottom(x).tickSize(0).tickPadding(20) as any)
            .call((g) => g.select('.domain').remove() as any);

    const getYAxis = (node: any) =>
        select(node)
            .call(
                axisLeft(y)
                    .ticks(4)
                    .tickSize(0)
                    .tickFormat((d) => getTickFormat(d)) as any,
            )
            .call((g) => g.select('.domain').remove() as any);

    useEffect(() => {
        const handleResize = () => {
            if (parentNode.current) {
                setChartWidth(parentNode.current.getBoundingClientRect().width);
            }
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [parentNode]);

    return (
        <StyledSvg width={width} height={height} ref={d3Container}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <g
                    className="x-axis"
                    ref={(node) => getXaxis(node)}
                    style={{ fontSize: '14px', fontFamily: font.regular }}
                    transform={`translate(0, ${
                        height - margin.top - margin.bottom
                    })`}
                ></g>
                <g
                    className="y-axis"
                    ref={(node) => getYAxis(node)}
                    transform={`translate(${margin.left}, -${margin.top})`}
                    style={{ fontSize: '14px', fontFamily: font.regular }}
                ></g>
                <g>
                    {data.map((item) => (
                        <rect
                            fill={color}
                            rx="5"
                            x={x(new Date(item.date) as Date) - barWidth / 2}
                            y={y(item.amount) - margin.top}
                            height={height - margin.top - y(item.amount)}
                            width={barWidth}
                        ></rect>
                    ))}
                </g>
            </g>
        </StyledSvg>
    );
};

export const BarChartContainer = () => {
    const { user } = useAuth();
    const { userId } = user;
    const { allTransactions, getTransactionsByUser } = useTransactions();
    const parentNode = useRef(null);
    useEffect(() => {
        getTransactionsByUser(userId);
    }, [userId, getTransactionsByUser]);
    return (
        <div ref={parentNode}>
            <BarChart data={allTransactions} parentNode={parentNode}></BarChart>
        </div>
    );
};
