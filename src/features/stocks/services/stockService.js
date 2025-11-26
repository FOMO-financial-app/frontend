import { api } from "../api";

export const stockService = {
    all: () => api.get("/api/Stocks"),
    details: (symbol) => api.get(`/api/Stocks/timeseries/${symbol}`),
    sma: (symbol, period) => api.get(`/api/Stocks/timeseries/${symbol}/sma/${period}`),
    bollinger: (symbol, period, k) => api.get(`/api/Stocks/timeseries/${symbol}/bollinger/${period}/${k}`),
    stochastic: (symbol, period, smaperiod) => api.get(`/api/Stocks/timeseries/${symbol}/stochastic/${period}/${smaperiod}`),
    rsi: (symbol, period) => api.get(`/api/Stocks/timeseries/${symbol}/rsi/${period}`),
    srsi: (symbol, period) => api.get(`/api/Stocks/timeseries/${symbol}/srsi/${period}`)
};