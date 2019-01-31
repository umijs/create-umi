import React from 'react';
import styles from './index.css';
<% if (reactFeatures.includes('locale')) { %>import { formatMessage } from 'umi-plugin-locale';<% } %>

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            <% if (reactFeatures.includes('locale')) { %>{formatMessage({ id: 'index.start' })}<% } else { %>Getting Started<% } %>
          </a>
        </li>
      </ul>
    </div>
  );
}
