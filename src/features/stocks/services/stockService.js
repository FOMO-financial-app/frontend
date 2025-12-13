import { api } from "../../../shared";

export const stockService = {
    find: (query) => api.get(`/api/Stocks/find/${query}`),
    page: (page, pagesize) => api.get(`/api/Stocks/${page}/${pagesize}`),
    details: (symbol) => api.get(`/api/Stocks/timeseries/${symbol}`),
    sma: (symbol, period) => api.get(`/api/Stocks/timeseries/${symbol}/sma/${period}`),
    bollinger: (symbol, period, k) => api.get(`/api/Stocks/timeseries/${symbol}/bollinger/${period}/${k}`),
    stochastic: (symbol, period, smaperiod) => api.get(`/api/Stocks/timeseries/${symbol}/stochastic/${period}/${smaperiod}`),
    rsi: (symbol, period) => api.get(`/api/Stocks/timeseries/${symbol}/rsi/${period}`),
    srsi: (symbol, period) => api.get(`/api/Stocks/timeseries/${symbol}/srsi/${period}`)
};