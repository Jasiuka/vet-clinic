// eslint-disable-next-line no-unused-vars
export function errorHandler(error, request, response, next) {
  if (error.message.includes("no: 1062")) {
    return response
      .status(400)
      .send({ errorMessage: "Review with this email already exist!" });
  }

  return response.status(400).send(error.message);
}
