
export function config() {
  return {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  };
}
