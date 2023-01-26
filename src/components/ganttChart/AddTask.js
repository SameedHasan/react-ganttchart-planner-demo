import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import React, { useContext } from "react";
import { createFormattedDateFromDate } from "./helpers/dateFunctions";
import { DataContext } from "./GanttChart";

const AddTask = () => {
  const { tasks, setTasks, taskDurations, setTaskDurations } =
    useContext(DataContext);
  const [form] = Form.useForm();

  const handleSubmit = ({ id, name, start, end, resources }) => {
    let newArr = resources.map((r) => JSON.parse(r));
    const obj = {
      id,
      start: createFormattedDateFromDate(start.$d),
      end: createFormattedDateFromDate(end.$d),
      task: id,
      resources: newArr,
    };
    console.log("object", obj);
    setTasks([...tasks, { id, name }]);
    setTaskDurations([...taskDurations, obj]);
  };

  const options = [
    {
      id: 1,
      title: "Resouce 1",
      color: "red",
    },
    {
      id: 2,
      title: "Resouce 2",
      color: "blue",
    },
    {
      id: 3,
      title: "Resouce 3",
      color: "green",
    },
    {
      id: 4,
      title: "Resouce 4",
      color: "yellow",
    },
    {
      id: 5,
      title: "Resouce 5",
      color: "black",
    },
    {
      id: 6,
      title: "Resouce 6",
      color: "orange",
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { Option } = Select;
  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit} id="myForm">
      <Form.Item label="Task Id" name="id" required>
        <InputNumber placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Task title" name="name" required>
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item name="start" label="Start Date">
        <DatePicker showTime format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item name="end" label="End Date">
        <DatePicker showTime format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item label="Resources" name="resources" required>
        <Select
          mode="multiple"
          allowClear
          style={{
            width: "100%",
          }}
          placeholder="Please select"
          onChange={handleChange}
        >
          {options.map((o) => (
            <Option key={o.id} value={JSON.stringify(o)}>
              {o.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
export default AddTask;
