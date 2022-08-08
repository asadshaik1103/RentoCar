import http from "./httpService";

const supportTicketsAPIEndpoint = "/support/";

export const getAllTickets = () => {
    return http.get(supportTicketsAPIEndpoint);
};

export const CreateTicket = (request) => {
    return http.post(supportTicketsAPIEndpoint, request)
};
