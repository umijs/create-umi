
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: <% if (reactFeatures.includes('antd')) { %>true<% } else { %>false<% } %>,
      dva: <% if (reactFeatures.includes('dva')) { %>true<% } else { %>false<% } %>,
      dynamicImport: <% if (reactFeatures.includes('dynamicImport')) { %>{ webpackChunkName: true }<% } else { %>false<% } %>,
      title: '<%= name %>',
      dll: <% if (reactFeatures.includes('dll')) { %>true<% } else { %>false<% } %>,
      <% if (reactFeatures.includes('locale')) { %>locale: {
        enable: true,
        default: 'en-US',
      },<% } %>
      routes: {
        exclude: [<% if (reactFeatures.includes('dva')) { %>
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,<% } %>
          /components\//,
        ],
      },
    }],
  ],
}
