import * as AntdIcons from '@ant-design/icons';
import { Input, Pagination } from 'antd';
import React, { MouseEvent, useState } from 'react';
import { categoriesList } from './fields';
import styles from './index.less';
const { VerticalRightOutlined, LeftOutlined, RightOutlined, VerticalLeftOutlined } = AntdIcons;
const AllIcon: { [key: string]: any } = AntdIcons;

interface IconProps {
  onSelect?: (value: string) => void;
}
const Icon: React.FC<IconProps> = ({ onSelect }) => {
  // 每页显示数量
  const PAGE = 60;
  // 不想显示的图表在这添加
  const HIDDEN = ['LoadingOutlined'];
  const iconResource = categoriesList
    .map((iconName: string) => iconName + 'Outlined')
    .concat(categoriesList.map((iconName: string) => iconName + 'Filled'))
    .concat(categoriesList.map((iconName: string) => iconName + 'TwoTone'))
    .filter((iconName: string) => {
      return !HIDDEN.includes(iconName) && AllIcon[iconName];
    });
  // 最后一页的页数
  const pageMax = Math.ceil(iconResource.length / PAGE);
  const sliceIt = iconResource.slice(0, PAGE);
  // 第一页的数据
  const [pageItem, setPageItem] = useState(sliceIt);
  const [pagination, setPagination] = useState({ current: 1, total: iconResource.length });

  const onChange = (page: number) => {
    if (page !== 1) {
      const sliceIcon = iconResource.slice((page - 1) * PAGE, page * PAGE);
      setPageItem(sliceIcon);
    } else if (page === 1) {
      const sliceIcon = iconResource.slice(0, PAGE);
      setPageItem(sliceIcon);
    }
    setPagination({ ...pagination, current: page });
  };

  const onSearch = (searchKey: string) => {
    if (searchKey) {
      const matchKey = searchKey
        .replace(new RegExp(`^<([a-zA-Z]*)\\s/>$`, 'gi'), (_, name) => name)
        .replace(/(Filled|Outlined|TwoTone)$/, '')
        .toLowerCase();
      const iconList = iconResource.filter((iconName) => iconName.toLowerCase().includes(matchKey));
      setPageItem(iconList);
    } else {
      const sliceIcon = iconResource.slice(0, PAGE);
      setPageItem(sliceIcon);
    }
  };

  const onIconClick = (item: string) => {
    if (onSelect) onSelect(item);
  };

  const onStart = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onChange(1);
  };

  const onEnd = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onChange(pageMax);
  };

  return (
    <React.Fragment>
      <div className={styles.content}>
        <div>
          <Input.Search
            enterButton="查询"
            style={{ width: 200, marginBottom: 8 }}
            allowClear={true}
            onFocus={(e) => e?.target.select()}
            onSearch={onSearch}
          />
        </div>
        <div className={styles.iconContainer}>
          {pageItem.map((item) => (
            <div
              key={item}
              title={item}
              className={styles.iconOuter}
              onClick={() => onIconClick(item)}
            >
              {React.createElement(AllIcon[item])}
            </div>
          ))}
        </div>
        <Pagination
          simple
          defaultCurrent={1}
          defaultPageSize={PAGE}
          className={styles.pagination}
          current={pagination.current}
          total={iconResource.length}
          onChange={onChange}
          itemRender={(_, type, originalElement) => {
            if (type === 'prev') {
              return (
                <span>
                  <VerticalRightOutlined onClick={onStart} />
                  <LeftOutlined />
                </span>
              );
            }
            if (type === 'next') {
              return (
                <span>
                  <RightOutlined />
                  <VerticalLeftOutlined onClick={onEnd} />
                </span>
              );
            }
            return originalElement;
          }}
          showTotal={(total) => {
            return (
              <span style={{ fontSize: 12 }}>
                每页{PAGE}条共{total}条
              </span>
            );
          }}
        />
      </div>
    </React.Fragment>
  );
};
export default Icon;
