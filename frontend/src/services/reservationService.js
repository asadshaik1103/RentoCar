import http from "./httpService";

const reservationsAPIEndpoint = "/reservations/";

export const getReservations = () => {
  return http.get(reservationsAPIEndpoint);
};

export const cancelReservation = (id, cancellationReason) => {
  return http.delete(reservationsAPIEndpoint + `${id}`, { data: { cancellationReason: cancellationReason } })
};

export const postReservation = (reservationData) => {
  return http.post(reservationsAPIEndpoint + "add", reservationData)
}

export const modifyReservation =(reservationData) => {
  return http.put(reservationsAPIEndpoint + `:${reservationData._id}`, reservationData)
}