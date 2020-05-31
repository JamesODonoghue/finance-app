import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useTransactions from '../../services/transactions';
import useAuth from '../../../context/auth';
import _ from 'lodash';
import moment from 'moment';
import { color, font } from '../../utils/styles';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useTheme } from 'styled-components';
import { StyledSvg } from './Styles';

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
export const BarChart = ({ data = [] }: { data: any[] }) => {
    const { color } = useTheme();

    const d3Container = useRef(null);
    const width = 800;
    const height = 400;
    const margin = { top: 50, bottom: 50, left: 50, right: 50 };

    useEffect(() => {
        if (data && data.length > 0 && d3Container.current) {
            data = getMonthlySpending(data);

            let dateObj = new Date();
            var x = d3
                .scaleTime()
                .domain([dateObj.setMonth(dateObj.getMonth() - 6), new Date()])
                .range([margin.left, width - margin.right]);

            var y = d3
                .scaleLinear()
                .domain([0, d3.max(data, (item) => item.amount)])
                .range([height - margin.bottom, margin.top]);
            var xAxis = (g: any) =>
                g
                    .attr(
                        'transform',
                        `translate(0, ${height - margin.bottom - margin.top})`,
                    )
                    .call(d3.axisBottom(x).tickSize(0).tickPadding(20))
                    .call((g: any) => g.select('.domain').remove());

            var yAxis = (g: any) =>
                g
                    .attr(
                        'transform',
                        `translate(${margin.left}, -${margin.top})`,
                    )
                    .call(
                        d3
                            .axisLeft(y)
                            .tickSize(0)
                            .ticks(6)
                            .tickPadding(20)
                            .tickFormat((d) =>
                                new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    maximumSignificantDigits: 2,
                                }).format(d as number),
                            ),
                    )
                    .call((g: any) => g.select('.domain').remove());
            const svg = d3.select(d3Container.current);
            const g = svg
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            g.append('g')
                .attr('class', 'x-axis')
                .call(xAxis)
                .attr('font-size', '14px')
                .attr('font-family', font.regular);

            g.append('g')
                .attr('class', 'y-axis')
                .call(yAxis)
                .attr('font-size', '14px')
                .attr('font-family', font.regular);

            // Bind D3 data
            const update = g.append('g').selectAll('g').data(data);

            update
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('fill', color)
                .attr('rx', 5)
                .attr('x', (d) => x(new Date(d.date) as Date) - 15)
                .attr('y', (d) => y(d.amount) - margin.top)
                .attr('height', (d) => height - margin.top - y(d.amount))
                .attr('width', 30);

            update.exit().remove();
        }
    }, [data, d3Container.current]);
    return (
        <StyledSvg width={width} height={height} ref={d3Container}></StyledSvg>
    );
};

export const BarChartContainer = () => {
    const { user } = useAuth();
    const { userId } = user;
    const { allTransactions, getTransactionsByUser } = useTransactions();

    useEffect(() => {
        getTransactionsByUser(userId);
    }, [userId, getTransactionsByUser]);
    return (
        <div>
            <BarChart data={allTransactions}></BarChart>
        </div>
    );
};
