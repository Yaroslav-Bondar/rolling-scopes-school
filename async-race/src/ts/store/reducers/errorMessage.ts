const errorMessage = (state: unknown = null, action: UnknownAction) => {
  const { error } = action;
  if (error) {
    return error;
  }
  return state;
};

export { errorMessage };
