import { Button, Modal } from "antd";
import React, { useState } from "react";
const AntModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add Job
      </Button>
      <Modal
        open={open}
        title="Add task and Task Duration"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
            form="myForm"
            htmlType="submit"
          >
            {props.btnName}
          </Button>,
        ]}
      >
        {props.children}
      </Modal>
    </div>
  );
};
export default AntModal;
