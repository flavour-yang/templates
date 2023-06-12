/*
 * @Author: Y
 * @Date: 2022-10-25
 * @Description: 导出配置
 */
import {
  upsertExportTemplate,
  getUserExportTemplates,
} from '@/services/antdPro/bussinessTable';
import { useRequest } from 'ahooks';
import { Button, Form, Modal, Transfer, Select, Card, Input, message, FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';
interface ModalsProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  formModal: FormInstance;
}
const defaultColumns = [
  {
    title: '条码号',
    dataIndex: '条码号',
  },
  {
    title: '索书号',
    dataIndex: '索书号',
  },
  {
    title: 'ISBN/ISSN',
    dataIndex: 'ISBN/ISSN',
  },
  {
    title: '题名',
    dataIndex: '题名',
  },
  {
    title: '文献来源',
    dataIndex: '文献来源',
  },
  {
    title: '供货商',
    dataIndex: '供货商',
  },
  {
    title: '馆藏状态',
    dataIndex: '馆藏状态',
  },
];
const Modals: React.FC<ModalsProps> = ({ visible, onOk, onCancel, formModal }) => {
  const [childForm] = Form.useForm();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [childVisible, setChildVisible] = useState(false);
  const [targetKeys, setTargetKeys] = useState(defaultColumns.map((i) => i.dataIndex));

  const { runAsync, loading } = useRequest(upsertExportTemplate, {
    manual: true,
  });
  const { runAsync: getTemplates, data } = useRequest(getUserExportTemplates, { manual: true });

  const columns = [
    ...defaultColumns,
    {
      title: '文献流通类型',
      dataIndex: '文献流通类型',
    },
    {
      title: '入藏时间',
      dataIndex: '入藏时间',
    },
    {
      title: '操作人',
      dataIndex: '操作人',
    },
    {
      title: '批号',
      dataIndex: '批号',
    },
    {
      title: '所属馆',
      dataIndex: '所属馆',
    },
    {
      title: '所属馆藏地',
      dataIndex: '所属馆藏地',
    },
    {
      title: '所在馆藏地',
      dataIndex: '所在馆藏地',
    },
    {
      title: '出版社',
      dataIndex: '出版社',
      width: '10%',
    },
    {
      title: '出版时间',
      dataIndex: '出版时间',
    },
    {
      title: '介质类型',
      dataIndex: '介质类型',
    },
    {
      title: '币种',
      dataIndex: '币种',
    },
    {
      title: '码洋',
      dataIndex: '码洋',
      sorter: true,
    },
    {
      title: '实洋',
      dataIndex: '实洋',
    },
  ];

  useEffect(() => {
    if (visible) {
      (async () => {
        const res = await getTemplates();
        if (res.success) {
          const defaultIt = res.data.find((i) => i.defaultTemplate);
          if (defaultIt) {
            formModal.setFields([{ name: 'templateId', value: defaultIt.templateName }]);
            setTargetKeys(defaultIt.columnNames);
          }
        }
      })();
    }
  }, [visible]);

  const handleOk = async () => {
    if (targetKeys.length === 0) {
      message.warning('请选择导出字段');
      return;
    }
    const value = formModal.getFieldValue('templateId');
    const findIt = data.data.find((i) => i.templateName === value);
    const requestData = {
      columnNames: [...targetKeys],
      templateName: value,
      id: findIt.id,
      defaultTemplate: true,
    };
    const res = await runAsync(requestData);
    if (res.success) {
      onOk();
      message.success('保存成功');
    } else {
      message.error(res?.message || '保存失败');
    }
  };

  const onSelect = (value) => {
    const findIt = data?.data?.find((i) => value === i.templateName)?.columnNames;
    setTargetKeys(findIt);
    setSelectedKeys([]);
  };

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    // console.log('targetKeys:', nextTargetKeys);
    // console.log('direction:', direction);
    // console.log('moveKeys:', moveKeys);
    if (direction === 'left') {
      setTargetKeys(nextTargetKeys);
    } else {
      setTargetKeys([...(targetKeys || []), ...moveKeys]);
    }
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    // console.log('sourceSelectedKeys:', sourceSelectedKeys);
    // console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onChildOk = async () => {
    try {
      await childForm.validateFields();
      const values = childForm.getFieldsValue();
      const names = defaultColumns.map((i) => i.title);
      const requestData = {
        columnNames: [...names],
        ...values,
      };
      const resSave = await runAsync(requestData);
      if (resSave.success) {
        message.success('新增成功');
        const res = await getTemplates();
        setChildVisible(false);
        if (res.success) {
          formModal.setFields([{ name: 'templateId', value: values?.templateName }]);
          setTargetKeys(names);
          setSelectedKeys([]);
        }
      } else {
        message.warning(resSave?.message || '模板名称已存在');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChildCancel = () => {
    childForm.resetFields();
    setChildVisible(false);
  };

  return (
    <Modal
      title={`导出配置`}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText="确定"
      confirmLoading={loading}
      width={800}
      maskClosable={false}
    >
      <Form form={formModal} layout="inline" labelCol={{ span: 6 }}>
        <Form.Item
          label="导出模板"
          name="templateId"
          rules={[{ required: true, message: '请选择导出模板' }]}
        >
          <Select
            style={{ width: 230 }}
            options={
              data && data?.data?.map((i) => ({ label: i.templateName, value: i.templateName }))
            }
            showSearch
            optionfilterprop="label"
            onSelect={onSelect}
          />
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            childForm.resetFields();
            setChildVisible(true);
          }}
        >
          新增
        </Button>
      </Form>
      <Card bordered={false}>
        <Transfer
          rowKey={(record) => record.dataIndex}
          dataSource={columns}
          titles={['可选择字段', '已选择字段']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={onChange}
          onSelectChange={onSelectChange}
          render={(item) => item.title}
          operations={['加入右侧', '加入左侧']}
          operationStyle={{ margin: '0 50px' }}
          listStyle={{
            width: 300,
            height: 400,
          }}
        />
      </Card>
      <Modal
        title="新增"
        open={childVisible}
        onOk={onChildOk}
        onCancel={onChildCancel}
        okText="确定"
        confirmLoading={loading}
      >
        <Form form={childForm} layout="inline" labelCol={{ span: 6 }}>
          <Form.Item
            label="模板名称"
            name="templateName"
            rules={[{ required: true, message: '请输入模板名称' }]}
          >
            <Input style={{ width: 230 }} maxLength={10} showCount />
          </Form.Item>
        </Form>
      </Modal>
    </Modal>
  );
};
export default Modals;
