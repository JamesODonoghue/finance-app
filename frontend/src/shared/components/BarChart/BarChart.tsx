import React, { useEffect, useRef, useState } from 'react';
import useTransactions from '../../services/transactions';
import useAuth from '../../../context/auth';
import _ from 'lodash';
import moment from 'moment';
import { StyledSvg, StyledBarRect } from './Styles';
import {
    select,
    axisBottom,
    scaleTime,
    scaleLinear,
    max,
    axisRight,
    format,
    timeFormat,
} from 'd3';
import { colors } from '@atlaskit/theme';

export const getMonthlySpending = (data: any[]) => {
    let dataByMonth = _.groupBy(data, (item) =>
        moment(item.transactionDate, 'YYYY-M-DD').startOf('month'),
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
    const [width, setChartWidth] = useState(800);
    const [hoveredBar, setHoveredBar] = useState<any>(null);
    const height = 400;
    const margin = { top: 50, bottom: 100, left: 50, right: 50 };
    const d3Container = useRef(null);

    console.log('bar chart render');

    if (data && data.length > 0 && d3Container.current) {
        data = getMonthlySpending(data).splice(0, 11);
    }

    let dateObj = new Date();
    let endDate = new Date();

    let x = scaleTime()
        .domain([
            dateObj.setMonth(dateObj.getMonth() - 12),
            endDate.setMonth(endDate.getMonth() - 1),
        ])
        .range([margin.left, width - margin.right]);

    let y = scaleLinear()
        .domain([0, max(data, (item) => item.amount)])
        .range([height - margin.top, margin.bottom]);

    const numberFormat = format('.2s');

    const getXaxis = (node: any) =>
        select(node)
            .call(
                axisBottom(x)
                    .tickSize(0)
                    .tickFormat((d) => timeFormat('%b')(d as any))
                    .tickPadding(30) as any,
            )
            .call((g) => g.select('.domain').remove() as any);

    const getYAxis = (node: any) =>
        select(node)
            .call(
                axisRight(y)
                    .ticks(6)
                    .tickSize(0)
                    .tickFormat((d) => numberFormat(d)) as any,
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

    const handleMouseOver = (e: any, item: any) => {
        console.log(e.target);
        setHoveredBar({ target: e.target, data: item });
    };

    return (
        <StyledSvg width={width} height={height} ref={d3Container}>
            <g>
                <g
                    className="x-axis"
                    ref={(node) => getXaxis(node)}
                    style={{ fontSize: '14px', fontFamily: 'Montserrat' }}
                    transform={`translate(0, ${height - margin.bottom})`}
                ></g>
                <g
                    className="y-axis"
                    ref={(node) => getYAxis(node)}
                    transform={`translate(${margin.left},-50)`}
                    style={{ fontSize: '14px', fontFamily: 'Montserrat' }}
                ></g>
                <g>
                    {data.map((item) => (
                        <StyledBarRect
                            rx="5"
                            x={x(new Date(item.date) as Date) - 10}
                            y={y(item.amount) - margin.top}
                            height={height - margin.top - y(item.amount)}
                            onMouseOver={(e) => handleMouseOver(e, item)}
                        ></StyledBarRect>
                    ))}
                </g>
            </g>

            {hoveredBar ? (
                <g
                    style={{ transition: '100ms all' }}
                    transform={`translate(${
                        hoveredBar?.target?.x?.baseVal.value - 50
                    }, ${hoveredBar?.target?.y?.baseVal.value - 50})`}
                >
                    <rect
                        height={40}
                        width={120}
                        fill={colors.N600}
                        rx={'5px'}
                    ></rect>
                    <text
                        y={25}
                        x={10}
                        style={{ fontSize: '1.2rem', fill: colors.N0 }}
                    >
                        {Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(hoveredBar?.data?.amount)}
                    </text>
                </g>
            ) : (
                ''
            )}
        </StyledSvg>
    );
};

export const BarChartContainer = () => {
    const { user } = useAuth();
    const { id: userId } = user;
    const { transactionsByUser, getTransactionsByUser } = useTransactions();
    const parentNode = useRef(null);

    useEffect(() => {
        getTransactionsByUser(userId);
    }, [userId, getTransactionsByUser]);

    return (
        <div ref={parentNode}>
            {transactionsByUser ? (
                <BarChart
                    data={transactionsByUser[userId]}
                    parentNode={parentNode}
                ></BarChart>
            ) : (
                <div></div>
            )}
        </div>
    );
};
