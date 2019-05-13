import { ConnectState, ConnectProps } from '@/typings';
import RightContent from '@/components/GlobalHeader/RightContent';
import Authorized from '@/utils/Authorized';
import { connect } from 'dva';
import React, { useState } from 'react';
import logo from '../assets/logo.svg';

import {
  BasicLayout as BasicLayoutComponents,
  BasicLayoutProps as BasicLayoutComponentsProps,
  MenuDataItem,
} from '@ant-design/pro-layout';
import Link from 'umi/link';
import settings from '../../config/defaultSettings';

export interface BasicLayoutProps extends BasicLayoutComponentsProps, ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, route } = props;
  const { routes, authority } = route!;
  /**
   * constructor
   */
  useState(() => {
    dispatch!({ type: 'user/fetchCurrent' });
    dispatch!({ type: 'menu/getMenuData', payload: { routes, authority } });
  });
  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean) =>
    dispatch!({ type: 'global/changeLayoutCollapsed', payload });
  return (
    <>
      <BasicLayoutComponents
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        filterMenuData={menuList => {
          return menuList.map(item => {
            return Authorized.check(item.authority, item, null) as MenuDataItem;
          });
        }}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        {children}
      </BasicLayoutComponents>
    </>
  );
};

export default connect(({ global }: ConnectState) => ({
  collapsed: global.collapsed,
}))(BasicLayout);
