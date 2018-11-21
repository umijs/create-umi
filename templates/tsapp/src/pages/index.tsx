import * as React from "react";
import styles from "./index.css";
<% if (props.react.includes('antd')) { %>import { connect } from "dva";<% } %>

interface PageProps {
  dispatch: any;
  location: any;
  <% if (props.react.includes('antd')) { %>message: any;<% } %>
}

<% if (props.react.includes('antd')) { %>@connect(state => state.global)<% } %>
class App extends React.Component<PageProps> {
  public render() {
    <% if (props.react.includes('antd')) { %>const { message } = this.props;<% } %>
    
    return (
      <div className={styles.normal}>
        <div className={styles.welcome} />
        <h1 className={styles.title}><% if (props.react.includes('antd')) { %>{message}<% } else { %>Umi TypeScript Template<% } %></h1>
        <ul className={styles.list}>
          <li>
            To get started, edit <code>src/pages/index.tsx</code> and save to reload.
          </li>
          <li>
            <a href="https://umijs.org/guide/getting-started.html">Getting Started</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
