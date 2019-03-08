import React from 'react';
import styles from './index.css';

export interface IButtonProps {
  size?: 'large' | 'default';
}

const Button: React.SFC<IButtonProps> = function(props) {
  return (
    <button
      className={styles.button}
      style={{
        fontSize: props.size === 'large' ? 40 : 20,
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
