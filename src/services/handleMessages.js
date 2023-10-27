function handleResponse(error) {
  switch (error) {
    case "Failed to fetch":
      return {
        message: "No se pudo conectar con el servidor",
        type: "error",
        redirect: true,
        redirectPath: "/login",
      };
    default:
      return {
        message: error,
        type: "error",
        redirect: true,
        redirectPath: "/login",
      };
  }
}

export { handleResponse };
