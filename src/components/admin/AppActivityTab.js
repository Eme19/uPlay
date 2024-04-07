import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const { confirm } = Modal;

const AppActivityTab = () => {
  const [form] = Form.useForm();
  const [appActivity, setAppActivity] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const columns = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => editActivity(record)}>
            Edit
          </Button>
          <Button type="link" onClick={() => deleteActivity(record.key)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  useEffect(() => {
    fetchAppActivityData();
  }, []);

  const fetchAppActivityData = async () => {
    try {
      const response = await axios.get('/api/app-activity');
      setAppActivity(response.data);
    } catch (error) {
      console.error('Error fetching "App Activity" data:', error);
      message.error('Failed to fetch "App Activity" data.');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post('/api/app-activity', values);
      message.success('App Activity added successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchAppActivityData();
    } catch (error) {
      console.error('Error creating "App Activity" record:', error);
      message.error('Failed to create "App Activity" record.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editActivity = (record) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const deleteActivity = (id) => {
    confirm({
      title: 'Delete this activity?',
      content: 'This action cannot be undone.',
      onOk: async () => {
        try {
          await axios.delete(`/api/app-activity/${id}`);
          message.success('App Activity deleted successfully');
          fetchAppActivityData();
        } catch (error) {
          console.error('Error deleting "App Activity" record:', error);
          message.error('Failed to delete "App Activity" record.');
        }
      },
    });
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add App Activity
      </Button>
      <Table columns={columns} dataSource={appActivity} />
      <Modal
        title="Add App Activity"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} name="app-activity-form">
          <Form.Item
            name="activity"
            label="Activity"
            rules={[{ required: true, message: 'Please enter the activity' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: 'Please enter the time' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AppActivityTab;
