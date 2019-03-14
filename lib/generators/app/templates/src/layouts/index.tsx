import React from 'react';
import styles from './index.css';

interface BasicLayoutProps {
  history?: History;
  location?: Location;
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  );
};

export default BasicLayout;
