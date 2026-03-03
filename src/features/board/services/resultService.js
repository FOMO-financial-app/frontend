import { api } from "../../../shared";

export const resultService = {
    create: (resultData) => api.post(`/api/TradeResult/create`, resultData),
    page: (page, pagesize) => api.get(`/api/TradeResult/${page}/${pagesize}`),
    edit: (resultUpdate) => api.patch(`/api/TradeResult/edit`, resultUpdate),
    delete: (id) => api.delete(`/api/TradeResult/${id}`),
};