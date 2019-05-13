import React, { Component } from 'react';
import { Input, Icon, AutoComplete } from 'antd';
import { DataSourceItemType } from 'antd/es/auto-complete';
import classNames from 'classnames';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import styles from './index.less';

export interface HeaderSearchProps {
  onPressEnter: (value: string) => void;
  onSearch: (value: string) => void;
  onChange: (value: string) => void;
  onVisibleChange: (b: boolean) => void;
  className: string;
  placeholder: string;
  defaultActiveFirstOption: boolean;
  dataSource: DataSourceItemType[];
  defaultOpen: boolean;
  open?: boolean;
}

interface HeaderSearchState {
  value: string;
  searchMode: boolean;
}

export default class HeaderSearch extends Component<HeaderSearchProps, HeaderSearchState> {
  static defaultProps = {
    defaultActiveFirstOption: false,
    onPressEnter: () => {},
    onSearch: () => {},
    onChange: () => {},
    className: '',
    placeholder: '',
    dataSource: [],
    defaultOpen: false,
    onVisibleChange: () => {},
  };

  static getDerivedStateFromProps(props: HeaderSearchProps) {
    if ('open' in props) {
      return {
        searchMode: props.open,
      };
    }
    return null;
  }

  private timeout: NodeJS.Timeout = null!;
  private inputRef: Input | null = null;

  constructor(props: HeaderSearchProps) {
    super(props);
    this.state = {
      searchMode: props.defaultOpen,
      value: '',
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const { onPressEnter } = this.props;
      const { value } = this.state;
      this.timeout = setTimeout(() => {
        onPressEnter(value); // Fix duplicate onPressEnter
      }, 0);
    }
  };

  onChange = (value: string) => {
    const { onSearch, onChange } = this.props;
    this.setState({ value });
    if (onSearch) {
      onSearch(value);
    }
    if (onChange) {
      onChange(value);
    }
  };

  enterSearchMode = () => {
    const { onVisibleChange } = this.props;
    onVisibleChange(true);
    this.setState({ searchMode: true }, () => {
      const { searchMode } = this.state;
      if (searchMode && this.inputRef) {
        this.inputRef.focus();
      }
    });
  };

  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: '',
    });
  };

  // NOTE: 不能小于500，如果长按某键，第一次触发auto repeat的间隔是500ms，小于500会导致触发2次
  @Bind()
  @Debounce(500, {
    leading: true,
    trailing: false,
  })
  debouncePressEnter() {
    const { onPressEnter } = this.props;
    const { value } = this.state;
    onPressEnter(value);
  }

  render() {
    const { className, placeholder, open, ...restProps } = this.props;
    const { searchMode, value } = this.state;
    delete restProps.defaultOpen; // for rc-select not affected
    const inputClass = classNames(styles.input, {
      [styles.show]: searchMode,
    });
    return (
      <span
        className={classNames(className, styles.headerSearch)}
        onClick={this.enterSearchMode}
        onTransitionEnd={({ propertyName }) => {
          if (propertyName === 'width' && !searchMode) {
            const { onVisibleChange } = this.props;
            onVisibleChange(searchMode);
          }
        }}
      >
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...restProps}
          className={inputClass}
          value={value}
          onChange={this.onChange as any}
        >
          <Input
            ref={node => {
              this.inputRef = node;
            }}
            aria-label={placeholder}
            placeholder={placeholder}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  }
}
