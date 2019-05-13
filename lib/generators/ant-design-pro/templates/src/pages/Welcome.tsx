import React from 'react';
import { Icon, Button } from 'antd';
import style from './Welcome.less';

const Welcome = () => (
  <div className={style.main}>
    <Icon type="smile" className={style.icon} />
    <p>
      想要添加更多页面？请参考
      <a href="https://umijs.org/guide/block.html" target="_blank" rel="noopener noreferrer">
        umi 区块
      </a>
    </p>
  </div>
);
export default Welcome;
