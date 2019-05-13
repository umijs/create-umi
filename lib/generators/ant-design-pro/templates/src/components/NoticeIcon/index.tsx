import React, { Component } from 'react';
import { Icon, Tabs, Badge, Spin } from 'antd';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import NoticeList, { NoticeIconTabProps } from './NoticeList';
import styles from './index.less';

const { TabPane } = Tabs;

export interface NoticeIconData {
  avatar?: string | React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  datetime?: React.ReactNode;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
  key?: string | number;
  read?: boolean;
}

export interface NoticeIconProps {
  count?: number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string, tabKey: string) => void;
  onItemClick?: (item: NoticeIconData, tabProps: NoticeIconTabProps) => void;
  onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
  onTabChange?: (tabTile: string) => void;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  clearText?: string;
  viewMoreText?: string;
  clearClose?: boolean;
  children: React.ReactElement<NoticeIconTabProps>[];
}

export default class NoticeIcon extends Component<NoticeIconProps> {
  public static Tab: typeof NoticeList = NoticeList;

  static defaultProps = {
    onItemClick: () => {},
    onPopupVisibleChange: () => {},
    onTabChange: () => {},
    onClear: () => {},
    onViewMore: () => {},
    loading: false,
    clearClose: false,
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  };

  state = {
    visible: false,
  };

  onItemClick = (item: NoticeIconData, tabProps: NoticeIconTabProps) => {
    const { onItemClick } = this.props;
    if (onItemClick) {
      onItemClick(item, tabProps);
    }
  };

  onClear = (name: string, key: string) => {
    const { onClear } = this.props;
    if (onClear) {
      onClear(name, key);
    }
  };

  onTabChange = (tabType: string) => {
    const { onTabChange } = this.props;
    if (onTabChange) {
      onTabChange(tabType);
    }
  };

  onViewMore = (tabProps: NoticeIconTabProps, event: MouseEvent) => {
    const { onViewMore } = this.props;
    if (onViewMore) {
      onViewMore(tabProps, event);
    }
  };

  getNotificationBox() {
    const { children, loading, clearText, viewMoreText } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, (child: React.ReactElement<NoticeIconTabProps>) => {
      if (!child) {
        return null;
      }
      const { list, title, count, tabKey, showClear, showViewMore } = child.props;
      const len = list && list.length ? list.length : 0;
      const msgCount = count || count === 0 ? count : len;
      const tabTitle: string = msgCount > 0 ? `${title} (${msgCount})` : title;
      return (
        <TabPane tab={tabTitle} key={title}>
          <NoticeList
            clearText={clearText}
            viewMoreText={viewMoreText}
            data={list}
            onClear={() => this.onClear(title, tabKey)}
            onClick={item => this.onItemClick(item, child.props)}
            onViewMore={event => this.onViewMore(child.props, event)}
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
            {...child.props}
          />
        </TabPane>
      );
    });
    return (
      <Spin spinning={loading} delay={0}>
        <Tabs className={styles.tabs} onChange={this.onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    );
  }

  handleVisibleChange = (visible: boolean) => {
    const { onPopupVisibleChange } = this.props;
    this.setState({ visible });
    if (onPopupVisibleChange) {
      onPopupVisibleChange(visible);
    }
  };

  render() {
    const { className, count, popupVisible, bell } = this.props;
    const { visible } = this.state;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = bell || <Icon type="bell" className={styles.icon} />;
    const trigger = (
      <span className={classNames(noticeButtonClass, { opened: visible })}>
        <Badge count={count} style={{ boxShadow: 'none' }} className={styles.badge}>
          {NoticeBellIcon}
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps: {
      visible?: boolean;
    } = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = popupVisible;
    }
    return (
      <HeaderDropdown
        placement="bottomRight"
        overlay={notificationBox}
        overlayClassName={styles.popover}
        trigger={['click']}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </HeaderDropdown>
    );
  }
}
