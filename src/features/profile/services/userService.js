import { api } from "../../../shared";

export const userService = {
    create: (userData) => api.post(`/api/User/create`, userData),
    details: () => api.get(`/api/User/details`),
    page: (page, pagesize) => api.get(`/api/TradeResult/profile/${page}/${pagesize}`),
    edit: (userUpdate) => api.patch(`/api/User/edit`, userUpdate),
    delete: () => api.delete(`/api/User/delete`),
};