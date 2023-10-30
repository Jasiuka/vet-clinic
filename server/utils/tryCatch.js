export const tryCatch = (controller) => async (request, response, next) => {
  try {
    await controller(request, response);
  } catch (error) {
    next(error);
  }
};
