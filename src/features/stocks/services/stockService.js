import { api } from "../../../shared";

export const stockService = {
    find: (query) => api.get(`/api/Stocks/find/${query}`),
    page: (page, pagesize) => api.get(`/api/Stocks/${page}/${pagesize}`),
    details: (symbol) => api.get(`/api/Stocks/timeseries?symbol=${encodeURIComponent(symbol)}`),
    sma: (symbol, period) => api.get(`/api/Indicators/sma?symbol=${encodeURIComponent(symbol)}&period=${period}`),
    envelopes: (symbol, period, percentage) => 
        api.get(`/api/Indicators/envelopes?symbol=${encodeURIComponent(symbol)}&period=${period}&percentage=${percentage}`),
    bollinger: (symbol, period, k) =>
        api.get(`/api/Indicators/bollinger?symbol=${encodeURIComponent(symbol)}&period=${period}&k=${k}`),
    stochastic: (symbol, period, smaperiod) =>
        api.get(`/api/Indicators/stochastic?symbol=${encodeURIComponent(symbol)}&period=${period}&smaperiod=${smaperiod}`),
    rsi: (symbol, period) => api.get(`/api/Indicators/rsi?symbol=${encodeURIComponent(symbol)}&period=${period}`),
    wrsi: (symbol, period) => api.get(`/api/Indicators/wrsi?symbol=${encodeURIComponent(symbol)}&period=${period}`),
};