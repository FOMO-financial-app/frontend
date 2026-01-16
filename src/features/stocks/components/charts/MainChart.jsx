import { createChart, CandlestickSeries, LineSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export const MainChart = ({ 
    data, mainChannelData, showMainChannel, smaData, showSma, 
    envelopesData, showEnvelopes, bollingerData, showBollinger 
}) => {

    const chartContainerRef = useRef();
    const chartRef = useRef();
    const candleStickRef = useRef();
    const regressionRef = useRef(null);
    const upperChannelRef = useRef(null);
    const lowerChannelRef = useRef(null);
    const smaSeriesRef = useRef(null);
    const upperEnvelopesRef = useRef(null);
    const lowerEnvelopesRef = useRef(null);
    const upperBollingerRef = useRef(null);
    const lowerBollingerRef = useRef(null);

    // Base configuration for indicators, visibility settings and prevent autoscale.
    const indicatorOptions = {
        visible: false,
        lastValueVisible: false,
        priceLineVisible: false,
        autoscaleInfoProvider: () => ({
            priceRange: {
                minValue: 1e10,
                maxValue: -1e10,
            },
        }),
    };

    // Initialize the chart, only once.
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, { 
            layout: { textColor: 'black', background: { type: 'solid', color: 'white' } },
            autoSize: true,
            timeScale: { fixLeftEdge: true, fixRightEdge: true, lockVisibleTimeRangeOnResize: true, rightOffset: 0 },
        });

        // Create candlesticks.
        candleStickRef.current = chart.addSeries(CandlestickSeries, {
            upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
            wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        });

        // Create empty indicators.
        regressionRef.current = chart.addSeries(LineSeries, { ...indicatorOptions, color: 'rgba(19, 23, 34, 0.2)', lineWidth: 2, lineStyle: 1 });
        upperChannelRef.current = chart.addSeries(LineSeries, { ...indicatorOptions, color: 'rgba(19, 23, 34, 0.5)', lineWidth: 2, lineStyle: 0 });
        lowerChannelRef.current = chart.addSeries(LineSeries, { ...indicatorOptions, color: 'rgba(19, 23, 34, 0.5)', lineWidth: 2, lineStyle: 0 });
        
        smaSeriesRef.current = chart.addSeries(LineSeries, { ...indicatorOptions, color: '#2962FF', lineWidth: 2 });
        
        upperEnvelopesRef.current = chart.addSeries(LineSeries, { ...indicatorOptions, color: '#eaf829', lineWidth: 2 });
        lowerEnvelopesRef.current = chart.addSeries(LineSeries, { ...indicatorOptions, color: '#eaf829', lineWidth: 2 });
        
        upperBollingerRef.current = chart.addSeries(LineSeries, { ...indicatorOptions, color: '#e029f8', lineWidth: 2 });
        lowerBollingerRef.current = chart.addSeries(LineSeries, { ...indicatorOptions, color: '#e029f8', lineWidth: 2 });

        chartRef.current = chart;

        return () => chart.remove();
    }, []);

    // Sync stock data with candlesticks.
    useEffect(() => {
        if (candleStickRef.current && data.length > 0) {
            candleStickRef.current.setData(data);
            chartRef.current.timeScale().fitContent();
        }
    }, [data]);

    // Sync Main Channel data and handle visibility.
    useEffect(() => {
        if (!regressionRef.current) return;
        const isVisible = showMainChannel && mainChannelData.length > 0;
        
        if (isVisible) {
            regressionRef.current.setData(mainChannelData.map(v => ({ time: v.time, value: +v.regression })));
            upperChannelRef.current.setData(mainChannelData.map(v => ({ time: v.time, value: +v.upper })));
            lowerChannelRef.current.setData(mainChannelData.map(v => ({ time: v.time, value: +v.lower })));
        }
        
        regressionRef.current.applyOptions({ visible: isVisible });
        upperChannelRef.current.applyOptions({ visible: isVisible });
        lowerChannelRef.current.applyOptions({ visible: isVisible });
    }, [showMainChannel, mainChannelData]);

    // Sync SMA data and handle visibility.
    useEffect(() => {
        if (!smaSeriesRef.current) return;
        const isVisible = showSma && smaData.length > 0;
        
        if (isVisible) smaSeriesRef.current.setData(smaData);
        smaSeriesRef.current.applyOptions({ visible: isVisible });
    }, [showSma, smaData]);

    // Sync Envelopes Bands data and handle visibility.
    useEffect(() => {
        if (!upperEnvelopesRef.current) return;
        const isVisible = showEnvelopes && envelopesData.length > 0;
        
        if (isVisible) {
            upperEnvelopesRef.current.setData(envelopesData.map(v => ({ time: v.time, value: +v.upperBand })));
            lowerEnvelopesRef.current.setData(envelopesData.map(v => ({ time: v.time, value: +v.lowerBand })));
        }
        
        upperEnvelopesRef.current.applyOptions({ visible: isVisible });
        lowerEnvelopesRef.current.applyOptions({ visible: isVisible });
    }, [showEnvelopes, envelopesData]);

    // Sync Bollinger Bands data and handle visibility.
    useEffect(() => {
        if (!upperBollingerRef.current) return;
        const isVisible = showBollinger && bollingerData.length > 0;
        
        if (isVisible) {
            upperBollingerRef.current.setData(bollingerData.map(v => ({ time: v.time, value: +v.upperBand })));
            lowerBollingerRef.current.setData(bollingerData.map(v => ({ time: v.time, value: +v.lowerBand })));
        }
        
        upperBollingerRef.current.applyOptions({ visible: isVisible });
        lowerBollingerRef.current.applyOptions({ visible: isVisible });
    }, [showBollinger, bollingerData]);

    return (
        <div ref={chartContainerRef} className='main-chart-container' style={{ position: 'relative' }} />
    );
};