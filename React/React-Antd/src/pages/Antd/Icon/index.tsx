import * as AntdIcons from '@ant-design/icons';
import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import Icon from './compontents';
const AllIcons: Keys = AntdIcons;

interface Keys {
  [key: string]: any;
}

const Icons = () => {
  const [open, setOpen] = useState<boolean>();
  const [selectIcon, setSelectIcon] = useState<string>();
  const onSelectIcon = (value: string) => {
    setSelectIcon(value);
  };
  return (
    <div style={{ height: 60 }}>
      <Popover
        placement="topLeft"
        title="选择图标"
        trigger="click"
        style={{ width: 300 }}
        open={open}
        content={<Icon onSelect={onSelectIcon} />}
        onOpenChange={(value) => setOpen(value)}
      >
        <Button type="link" style={{ verticalAlign: 'baseline' }}>
          选择图标
        </Button>
      </Popover>
      {selectIcon && (
        <span style={{ marginLeft: 12, fontSize: 18 }} title={selectIcon}>
          {AllIcons[selectIcon] && React.createElement(AllIcons[selectIcon])}
        </span>
      )}
    </div>
  );
};
export default Icons;
