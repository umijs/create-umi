
<% if (props.react.includes('dva')) { %>
export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
<% } %>
