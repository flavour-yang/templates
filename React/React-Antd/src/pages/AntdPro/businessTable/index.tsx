/*
 * @Author: Y
 * @Date: 2023-01-10
 * @Description: 常用业务列表模板
 */
import {
  exportCollectionListing,
  getCollectionListing,
  getItemStatus,
  getLibraryInfos,
  getLiteratureSources,
  getLoanTypes,
  getLocations,
  getOperateUsers,
  getOrganizations,
  getStatisticsInfo,
} from '@/services/antdPro/bussinessTable';
import { useRequest } from 'ahooks';
import { Form, Menu, message, Modal, Spin } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Modals from './components/Modals';
import Search from './components/Search';
import ProTables from './components/Table';

const formatDate = (value: dayjs.Dayjs) => {
  return value.format('YYYY-MM-DD HH:mm:ss');
};

const getDefaultDate = () => {
  return {
    collectionTimeStart: formatDate(dayjs().startOf('day').subtract(90, 'days')),
    collectionTimeEnd: formatDate(dayjs().endOf('day')),
  };
};
/**
 * @param {Blob} value Blob 对象
 * @param {string} download 下载链接的名称
 */
const hrefDownload = (value: Blob, download: string) => {
  const a = document.createElement('a');
  const blob = new Blob([value], { type: 'application/vnd.ms-excel' });
  a.style.display = 'none';
  a.href = URL.createObjectURL(blob); // 创建下载的链接
  a.download = download;
  document.body.appendChild(a);
  a.click(); // 点击下载
  document.body.removeChild(a); // 下载完成移除元素
};

/**
 * @description: table 的基本功能包含 []
 */
const ExampleTable = () => {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [requestParams, setRequestParams] = useState<API.ParamsData>({
    ...getDefaultDate(),
    current: 1,
    pageSize: 10,
  });

  const getPagination = () => ({
    current: requestParams.current,
    pageSize: requestParams.pageSize,
  });

  // 所属馆
  const { data: libraryData, runAsync: runLibrary } = useRequest(getLibraryInfos, {
    manual: true,
  });
  // // 所属馆藏地/所在馆藏地
  const { data: locationsData, loading: locationLoading } = useRequest(getLocations);
  // 文献流通类型
  const { data: loanTypesData } = useRequest(getLoanTypes);
  // 馆藏状态
  const { data: statusData } = useRequest(getItemStatus);
  // 文献来源
  const { data: sourcesData } = useRequest(getLiteratureSources);
  // 供货商
  const { data: organizationsData } = useRequest(getOrganizations);
  // 获取操作人
  const { data: operateUsers } = useRequest(getOperateUsers);
  // 种数,册数,总码洋
  const {
    data: statisticsData,
    runAsync: runStatistics,
    loading: statisticsLoading,
  } = useRequest(
    (data: any) => {
      if (data.pageNum) delete data.pageNum;
      if (data.pageNum) delete data.pageSize;
      if (data.pageNum) delete data.current;
      return getStatisticsInfo(data);
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (!res) {
          message.error('服务端错误');
        }
      },
    },
  );

  // 导出馆藏清单列表
  const { runAsync: runExport, loading: exportLoading } = useRequest(exportCollectionListing, {
    manual: true,
    onSuccess: (res) => {
      if (res) {
        const download = `馆藏清单${moment().format('YYYY-MM-DD')}.xlsx`; // 下载后文件名
        hrefDownload(res, download);
        message.success('导出成功');
      }
    },
    onError: (err) => {
      message.error(err?.message || '导出失败');
    },
  });

  const { data, runAsync, loading } = useRequest(
    (data) => {
      const requestData = {
        pageSize: data.pageSize,
        pageNum: data.current,
        ...data,
      } as API.ParamsData;
      if (requestData.current) delete requestData.current;

      return getCollectionListing(requestData).then((res) => {
        if (res?.total > getPagination().pageSize && !res?.content) {
          // 最后一页删除查询空处理
          runAsync({
            pageSize: getPagination().pageSize,
            current: requestParams.pagination.current - 1,
          });
        }
        return {
          total: res?.total || 0,
          list: res?.content || [],
        };
      });
    },
    { manual: true },
  );
  console.log({ data });

  useEffect(() => {
    (async () => {
      const res = await runLibrary();
      if (res) {
        const findIt = res?.find((i: any) => i.displayOrder);
        const params = {
          libraryIds: findIt?.id,
          ...getDefaultDate(),
        };
        runAsync({ ...getPagination(), ...params });
        runStatistics(params);
        setRequestParams({ ...requestParams, ...params });
      }
    })();
  }, []);

  const serialStr = (value: string) => {
    let matchNum = 0; // 记录连续字符数
    let isContinu = true; // 记录字符连贯
    const matchArr = [...value.matchAll(/[a-zA-Z]/g)];
    if (matchArr) {
      matchArr.forEach((item, index) => {
        if (item.index === index && isContinu) {
          matchNum = matchNum + 1;
        } else {
          isContinu = false;
        }
      });
    }
    return matchNum;
  };

  const onExport = async () => {
    const requestData = {
      ...requestParams,
    } as { [key: string]: any };
    if (requestData.time) {
      requestData.collectionTimeStart = formatDate(requestData.time[0].startOf('day'));
      requestData.collectionTimeEnd = formatDate(requestData.time[1].endOf('day'));
      delete requestData.time;
    }
    if (requestData.pageNum) delete requestData.pageNum;
    if (requestData.pageSize) delete requestData.pageSize;
    if (requestData.current) delete requestData.current;
    try {
      // const res = await runStatistics({ ...requestData });
      if (statisticsData?.itemCount >= 10000) {
        Modal.confirm({
          title: '仅支持导出前10000条数据，是否继续导出？',
          content: null,
          onOk: () => {
            runExport(requestData);
          },
        });
      } else {
        runExport(requestData);
      }
    } catch (error) {}
  };

  const onConfig = () => {
    setVisible(true);
  };

  const formatRequest = (values: any) => {
    if (values.barcodeStart || values.barcodeEnd) {
      if (!values.barcodeStart || !values.barcodeEnd) {
        // 判断一个未输入
        message.warning('请输入条码范围');
        return null;
      } else if (values.barcodeStart.length !== values.barcodeEnd.length) {
        message.warning('请输入长度一致的条码');
        return null;
      } else if (values.barcodeStart && values.barcodeEnd) {
        // 判断前缀不一致或长度不一致
        const count1 = serialStr(values.barcodeStart);
        const count2 = serialStr(values.barcodeEnd);
        const slice1 = values.barcodeStart.slice(0, count1);
        const slice2 = values.barcodeEnd.slice(0, count2);
        if (count1 !== count2 || slice1 !== slice2) {
          message.warning('请输入前缀一致的条码');
          return null;
        }
      }
    }
    if (values.time) {
      values.collectionTimeStart = formatDate(values.time[0].startOf('day'));
      values.collectionTimeEnd = formatDate(values.time[1].endOf('day'));
    } else {
      values.collectionTimeStart = undefined;
      values.collectionTimeEnd = undefined;
    }
    delete values.time;
    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key])) {
        values[key] = values[key].filter((i: any) => i);
      }
    });
    return values;
  };

  const initRequest = async (values: API.ParamsData) => {
    await runAsync({
      pageSize: getPagination().pageSize,
      ...values,
    });
    await runStatistics({ ...values });
  };

  const onFinish = async (values = {}) => {
    const formatValue = formatRequest(values);
    if (!formatValue) return;
    const params = { ...requestParams, ...formatValue, current: 1 };
    setRequestParams(params);
    initRequest(params);
  };

  const reset = () => {
    form.resetFields();
    const findIt = libraryData?.find((i: any) => i.displayOrder);
    if (findIt) form.setFields([{ name: 'libraryIds', value: findIt.id }]);
  };

  const resetModal = () => {
    setVisible(false);
    formModal.resetFields();
  };

  const onOk = async () => {
    await formModal.validateFields();

    resetModal();
  };

  const onCancel = () => {
    resetModal();
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={onExport}>导出清单</Menu.Item>
      <Menu.Item onClick={onConfig}>导出配置</Menu.Item>
    </Menu>
  );

  const SearchProps = {
    form,
    onFinish,
    reset,
    libraryData,
    locationsData,
    loanTypesData,
    statusData,
    sourcesData,
    organizationsData,
    operateUsers,
    loading,
  };

  const ProTablesProps = {
    data,
    locationLoading,
    form,
    menu,
    getPagination,
    locationsData,
    loanTypesData,
    statisticsData: statisticsData || {},
    statisticsLoading,
    loading,
    requestParams,
    // initRequest,
    setRequestParams,
    runAsync,
    runStatistics,
  };

  const ModalsProps = {
    visible,
    onOk,
    onCancel,
    formModal,
  };

  return (
    <React.Fragment>
      {/* <div>11</div> */}
      <Spin spinning={exportLoading}>
        <Search {...SearchProps} />
        <ProTables {...ProTablesProps} />
        <Modals {...ModalsProps} />
      </Spin>
    </React.Fragment>
  );
};
export default ExampleTable;
