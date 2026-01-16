import { api } from "../../../shared";

export const stockService = {
    find: (query) => api.get(`/api/Stocks/find/${query}`),
    page: (page, pagesize) => api.get(`/api/Stocks/${page}/${pagesize}`),
    details: (symbol) => api.get(`/api/Stocks/timeseries/${symbol}`),
    sma: (symbol, period) => api.get(`/api/Indicators/${symbol}/sma/${period}`),
    envelopes: (symbol, period, percentage) => api.get(`/api/Indicators/${symbol}/envelope/${period}/${percentage}`),
    bollinger: (symbol, period, k) => api.get(`/api/Indicators/${symbol}/bollinger/${period}/${k}`),
    stochastic: (symbol, period, smaperiod) => api.get(`/api/Indicators/${symbol}/stochastic/${period}/${smaperiod}`),
    rsi: (symbol, period) => api.get(`/api/Indicators/${symbol}/rsi/${period}`),
    wrsi: (symbol, period) => api.get(`/api/Indicators/${symbol}/wrsi/${period}`)
};