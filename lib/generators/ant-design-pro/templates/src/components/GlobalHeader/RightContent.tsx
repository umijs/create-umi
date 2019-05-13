import { ConnectProps, ConnectState } from '@/typings';
import { NoticeItem } from '@/models/global';
import { CurrentUser } from '@/models/user';
import React, { Component } from 'react';
import { Spin, Tag, Menu, Icon, Avatar, Tooltip, message } from 'antd';
import { ClickParam } from 'antd/es/menu';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import { connect } from 'dva';

export type SiderTheme = 'light' | 'dark';

export interface GlobalHeaderRightProps extends ConnectProps {
  notices?: NoticeItem[];
  currentUser?: CurrentUser;
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onMenuClick?: (param: ClickParam) => void;
  onNoticeClear?: (tabName?: string) => void;
  theme?: SiderTheme;
}

class GlobalHeaderRight extends Component<GlobalHeaderRightProps> {
  getNoticeData = (): { [key: string]: NoticeItem[] } => {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime as string).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };

  getUnreadData = (noticeData: { [key: string]: NoticeItem[] }) => {
    const unreadMsg: { [key: string]: number } = {};
    Object.entries(noticeData).forEach(([key, value]) => {
      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }
      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  changeReadState = (clickedItem: NoticeItem) => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    dispatch!({
      type: 'global/changeNoticeReadState',
      payload: id,
    });
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch!({
      type: 'global/fetchNotices',
    });
  }
  handleNoticeClear = (title: string, key: string) => {
    const { dispatch } = this.props;
    message.success(`${formatMessage({ id: 'component.noticeIcon.cleared' })} ${title}`);
    if (dispatch) {
      dispatch({
        type: 'global/clearNotices',
        payload: key,
      });
    }
  };
  render() {
    const { currentUser, fetchingNotices, onNoticeVisibleChange, onMenuClick, theme } = this.props;
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder={formatMessage({ id: 'component.globalHeader.search' })}
          dataSource={[
            formatMessage({ id: 'component.globalHeader.search.example1' }),
            formatMessage({ id: 'component.globalHeader.search.example2' }),
            formatMessage({ id: 'component.globalHeader.search.example3' }),
          ]}
          onSearch={value => {
            console.log('input', value); // tslint:disable-line no-console
          }}
          onPressEnter={value => {
            console.log('enter', value); // tslint:disable-line no-console
          }}
        />
        <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>

        <NoticeIcon
          className={styles.action}
          count={currentUser && currentUser.unreadCount}
          onItemClick={item => {
            this.changeReadState(item as NoticeItem);
          }}
          loading={fetchingNotices}
          clearText={formatMessage({ id: 'component.noticeIcon.clear' })}
          viewMoreText={formatMessage({ id: 'component.noticeIcon.view-more' })}
          onClear={this.handleNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          onViewMore={() => message.info('Click on view more')}
          clearClose
        >
          <NoticeIcon.Tab
            tabKey="notification"
            count={unreadMsg.notification}
            list={noticeData.notification}
            title={formatMessage({ id: 'component.globalHeader.notification' })}
            emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
            showViewMore
          />
          <NoticeIcon.Tab
            tabKey="message"
            count={unreadMsg.message}
            list={noticeData.message}
            title={formatMessage({ id: 'component.globalHeader.message' })}
            emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
            showViewMore
          />
          <NoticeIcon.Tab
            tabKey="event"
            title={formatMessage({ id: 'component.globalHeader.event' })}
            emptyText={formatMessage({ id: 'component.globalHeader.event.empty' })}
            count={unreadMsg.event}
            list={noticeData.event}
            showViewMore
          />
        </NoticeIcon>
        {currentUser && currentUser.name ? (
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
            <span className={styles.name}>{currentUser.name}</span>
          </span>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        <SelectLang className={styles.action} />
      </div>
    );
  }
}

export default connect(({ user, global, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(GlobalHeaderRight);
