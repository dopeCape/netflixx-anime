function isValidEmail(email: string) {
  // Regular expression pattern for basic email validation
  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return emailPattern.test(email);
}

export { isValidEmail };
