/*
 * @Author: Y
 * @Date: 2022-10-25
 * @Description: 列表
 */
import { DownOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-components';
import ProTable from '@ant-design/pro-table';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import React, { useState } from 'react';

interface PageProps {
  pageSize: number;
  current: number;
}

interface ProTableProps {
  data: any;
  locationLoading: boolean;
  menu: MenuProps;
  getPagination: () => PageProps;
  statisticsData: any;
  loading: boolean;
  requestParams: any;
  setRequestParams: (arg: any) => void;
  runAsync: (arg: any) => void;
  runStatistics: (arg: any) => void;
}
const ProTables: React.FC<ProTableProps> = ({
  data,
  locationLoading,
  menu,
  getPagination,
  statisticsData,
  loading,
  requestParams,
  setRequestParams,
  runAsync,
  runStatistics,
}) => {
  const columns: ProColumns<API.RuleListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 60,
      render: (_, record, index) => {
        const { pageSize, current } = getPagination();
        return pageSize * (current - 1) + index + 1;
      },
    },
    {
      title: '条码号',
      dataIndex: 'barcode',
      width: 140,
      sorter: true,
    },
    {
      title: '索书号',
      dataIndex: 'itemLevelCallNumber',
      width: 120,
      sorter: true,
    },
    {
      title: 'ISBN/ISSN',
      dataIndex: 'isbn',
      width: 160,
    },
    {
      title: '题名',
      dataIndex: 'title',
      // sorter: true,
    },
    {
      title: '文献来源',
      dataIndex: 'literatureSource',
      width: 100,
    },
    {
      title: '供货商',
      dataIndex: 'supplier',
    },
    {
      title: '馆藏状态',
      dataIndex: 'itemRegisterStatusName',
      width: 80,
    },
    {
      title: '文献流通类型',
      dataIndex: 'permanentLoanType',
    },
    {
      title: '入藏时间',
      dataIndex: 'collectionTime',
      sorter: true,
      width: 100,
      render: (text) => (text ? text?.split(' ')?.[0] : ''),
    },
    {
      title: '操作人',
      dataIndex: 'updatedBy',
    },
    {
      title: '批号',
      dataIndex: 'registerBatchNumber',
    },
    {
      title: '所属馆',
      dataIndex: 'libraryName',
    },
    {
      title: '所属馆藏地',
      dataIndex: 'permanentLocation',
    },
    {
      title: '所在馆藏地',
      dataIndex: 'temporaryLocation',
      width: 100,
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
    },
    {
      title: '出版时间',
      dataIndex: 'publisherDate',
      width: 100,
    },
    {
      title: '介质类型',
      dataIndex: 'mediaType',
    },
    {
      title: '币种',
      dataIndex: 'currency',
      width: 60,
    },
    {
      title: '码洋',
      dataIndex: 'bookPrice',
    },
    {
      title: '实洋',
      dataIndex: 'actualPrice',
    },
  ];
  const [columnsStateMap, setColumnsStateMap] = useState({
    publisher: { show: false },
    publisherDate: { show: false },
    mediaType: { show: false },
    currency: { show: false },
    bookPrice: { show: false },
    actualPrice: { show: false },
  });

  return (
    <ProTable
      dataSource={data?.list || []}
      loading={loading || locationLoading}
      size="small"
      rowKey="id"
      options={{
        fullScreen: false,
        reload: false,
        setting: true,
        density: false,
      }}
      search={false}
      columns={columns}
      columnsState={{
        value: columnsStateMap,
        onChange: (value) => {
          setColumnsStateMap(value);
        },
      }}
      onChange={({ current, pageSize }, _, sorter: API.ParamsData) => {
        const sortKey = {
          descend: 'desc',
          ascend: 'asc',
        } as API.ParamsData;
        let sortParams = {};
        if (sorter.order) {
          sortParams = {
            sortColumn: sorter.field,
            sortRule: sortKey[sorter.order],
            current: 1,
          };
          let params = { ...requestParams, pageSize, ...sortParams };
          if (sortKey[sorter.order] === requestParams.sortRule) {
            params = { ...params, current };
          }
          setRequestParams({ ...params });
          runAsync({ ...params });
          runStatistics({ ...params });
          return;
        }
        let params1 = { ...requestParams, pageSize, current };
        if (pageSize !== requestParams.pageSize) {
          params1 = { ...params1, current: 1 };
        }
        setRequestParams({ ...params1 });
        runAsync({ ...params1 });
        runStatistics({ ...params1 });
      }}
      scroll={
        columnsStateMap && Object.values(columnsStateMap).filter((i) => i).length < 7
          ? { x: 2200 - Object.values(columnsStateMap).filter((i) => i).length * 33 }
          : { x: 2000 }
      }
      toolBarRender={() => [
        <Dropdown menu={menu} key="1" trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Button type="primary">
                导出
                <DownOutlined />
              </Button>
            </Space>
          </a>
        </Dropdown>,
      ]}
      pagination={{
        showQuickJumper: true, // 快速跳转
        defaultPageSize: 10,
        pageSize: requestParams.pageSize,
        pageSizeOptions: ['5', '10', '20', '30', '50', '100'],
        current: requestParams.current,
        total: data?.total,
        showTotal: (total) => [
          statisticsData && (
            <span
              key={1}
              style={{
                color: '#333',
                marginRight: 14,
                position: 'absolute',
                left: 0,
                fontWeight: 'bold',
              }}
            >
              种数：{statisticsData.instanceCount}，册数：{statisticsData.itemCount}，总码洋：
              {statisticsData.bookTotalPrice} 元{/* </Spin> */}
            </span>
          ),
          <span key={2}>
            共<i style={{ fontStyle: 'normal', color: '#1890ff', margin: '0 5px' }}>{total}</i>
            条记录
          </span>,
        ],
      }}
    />
  );
};
export default ProTables;
