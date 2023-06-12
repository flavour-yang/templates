/*
 * @Author: Y
 * @Date: 2022-10-25
 * @Description: form搜索
 */
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

interface SearchProps {
  form: any;
  onFinish: (values: any) => void;
  reset: () => void;
  libraryData: any;
  locationsData: any;
  loanTypesData: any;
  statusData: any;
  sourcesData: any;
  organizationsData: any;
  operateUsers: any;
  loading: boolean;
}
const Search: React.FC<SearchProps> = ({
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
}) => {
  const [isDrop, setIsDrop] = useState(false);

  useEffect(() => {
    if (libraryData) {
      const findIt = libraryData?.find((i) => i.displayOrder);
      if (findIt) form.setFields([{ name: 'libraryIds', value: findIt.id }]);
    }
  }, [libraryData]);

  const FormItemSelect = useCallback(({ options, ...args }) => {
    // const [selecValues, setSelectValues] = useState('');
    let clones = [] as any;
    if (options) {
      clones = [...options];
    }
    if (clones?.length) {
      clones = [{ label: '全部', value: '' }, ...options];
    }
    return (
      <Form.Item {...args}>
        <Select
          options={clones}
          showSearch
          allowClear
          mode="multiple"
          maxTagCount="responsive"
          optionFilterProp="label"
          placeholder="全部"
          onDeselect={(v) => {
            if (v === '') {
              form.setFields([{ name: args.name, value: [] }]);
            }
          }}
          onSelect={(v) => {
            const values = clones.map((i) => i.value);
            if (v === '') {
              form.setFields([{ name: args.name, value: values }]);
            }
          }}
          onChange={(v) => {
            const values = clones.map((i) => i.value);
            const filters = clones.filter((i) => i.value);
            const vFilters = v.filter((i) => i);
            if (v.length === filters.length && !v.includes('')) {
              form.setFields([{ name: args.name, value: values }]);
            }
            if (v.length === filters.length && v.includes('')) {
              form.setFields([{ name: args.name, value: vFilters }]);
            }
          }}
        />
      </Form.Item>
    );
  }, []);

  const colSpan = {
    xxl: { span: 6 },
    xl: { span: 6 },
    sm: { span: 6 },
  };

  const layout = {
    labelCol: {
      xxl: { flex: '120px' },
      sm: { span: 7 },
    },
    wrapperCol: {
      xxl: { flex: 'none', style: { width: 'calc(100% - 120px)' } },
      sm: { span: 17 },
    },
  };

  return (
    <Card style={{ marginBottom: '10px' }} bodyStyle={{ padding: '24px 24px 0 24px' }}>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        {...layout}
        initialValues={{
          time: [dayjs().subtract(90, 'days'), dayjs()],
        }}
      >
        <Row style={isDrop ? {} : { height: 88, overflow: 'hidden' }}>
          <Col {...colSpan}>
            <Form.Item label="所属馆" name="libraryIds">
              <Select
                options={
                  libraryData && libraryData?.map((i) => ({ label: i.value, value: i.id }))
                }
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <FormItemSelect
              label="所属馆藏地"
              name="permanentLocationIds"
              options={
                locationsData && locationsData?.map((i) => ({ label: i.name, value: i.id }))
              }
            />
          </Col>
          <Col {...colSpan}>
            <FormItemSelect
              label="所在馆藏地"
              name="temporaryLocationIds"
              options={
                locationsData && locationsData?.map((i) => ({ label: i.name, value: i.id }))
              }
            />
          </Col>
          <Col {...colSpan}>
            <FormItemSelect
              label="文献流通类型"
              name="permanentLoanTypeIds"
              options={
                loanTypesData && loanTypesData?.map((i) => ({ label: i.name, value: i.id }))
              }
            />
          </Col>
          <Col {...colSpan}>
            <Form.Item label="入藏时间" name="time">
              <RangePicker />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <FormItemSelect
              label="馆藏状态"
              name="registerStatusCodes"
              options={
                statusData && statusData?.map((i) => ({ label: i.value, value: i.id }))
              }
            />
          </Col>
          <Col {...colSpan}>
            <FormItemSelect
              label="操作人"
              name="updatedByUserIds"
              options={
                operateUsers &&
                operateUsers?.users
                  ?.filter((i) => i && i.username)
                  .map((i) => ({ label: i.username, value: i.id }))
              }
            />
          </Col>
          <Col {...colSpan}>
            <Form.Item label="批号" name="batchNumber">
              <Input allowClear placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col {...colSpan}>
            <FormItemSelect
              label="文献来源"
              name="literatureSourceIds"
              options={
                sourcesData && sourcesData?.map((i) => ({ label: i.name, value: i.id }))
              }
            />
          </Col>
          <Col {...colSpan}>
            <FormItemSelect
              label="供货商"
              name="supplierIds"
              options={
                organizationsData &&
                organizationsData?.map((i) => ({ label: i.name, value: i.id }))
              }
            />
          </Col>
          <Col xxl={{ span: 6 }} xl={{ span: 7 }} sm={{ span: 10 }}>
            <Form.Item label="条码范围">
              {/* <Input.Group compact> */}
              <Form.Item
                name="barcodeStart"
                style={{ display: 'inline-block', width: 'calc(50% - 13px)' }}
              >
                <Input placeholder="起始值" />
              </Form.Item>
              <div
                style={{ height: 32, lineHeight: '32px', margin: '0 8px', display: 'inline-block' }}
              >
                ~
              </div>
              <Form.Item
                name="barcodeEnd"
                style={{ display: 'inline-block', width: 'calc(50% - 13px)' }}
              >
                <Input placeholder="结束值" />
              </Form.Item>
              {/* </Input.Group> */}
            </Form.Item>
          </Col>
        </Row>
        <div style={{ textAlign: 'center', margin: 10 }}>
          <Space>
            <Button key="add" type="primary" htmlType="submit" loading={loading}>
              查询
            </Button>
            <Button key="delete" onClick={reset}>
              重置
            </Button>
            {isDrop ? (
              <UpOutlined onClick={() => setIsDrop(false)} />
            ) : (
              <DownOutlined onClick={() => setIsDrop(true)} />
            )}
          </Space>
        </div>
      </Form>
    </Card>
  );
};
export default Search;
