
// ref: https://umijs.org/config/
export default {
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: <% if (props.react.includes('antd')) { %>true<% } else { %>false<% } %>,
      dva: <% if (props.react.includes('dva')) { %>true<% } else { %>false<% } %>,
      dynamicImport: <% if (props.react.includes('dynamicImport')) { %>true<% } else { %>false<% } %>,
      title: '<%= name %>',
      dll: <% if (props.react.includes('dll')) { %>true<% } else { %>false<% } %>,
      routes: {
        exclude: [],
      },
      hardSource: <% if (props.react.includes('hardSource')) { %>true<% } else { %>false<% } %>,
    }],
  ],
}
