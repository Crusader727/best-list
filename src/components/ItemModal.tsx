import React, { useState } from "react";
import { Button, Form, Input, Modal, Tabs } from "antd";
import { Folder, Item } from "../types/store";
import TextArea from "antd/es/input/TextArea";

interface FolderModalProps {
    handleOk: (item: Item) => void;
    handleClose: () => void;
    isOpen: boolean;
}

export const ItemModal = ({ handleOk, handleClose, isOpen = false }: FolderModalProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: Item) => {
        handleOk({ ...values, id: `${values.name}-${Date.now()}` });
        form.resetFields();
        handleClose();
    };

    const onOk = () => {
        form.submit();
    };

    const StandartForm = (
        <Form
            name="addItem"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
        >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input item name" }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
                <TextArea />
            </Form.Item>
            <Form.Item label="Image url" name="imageURL">
                <Input />
            </Form.Item>
        </Form>
    );

    return (
        <Modal title="Add Item" open={isOpen} onOk={onOk} onCancel={handleClose}>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: "Standart",
                        key: "1",
                        children: StandartForm,
                    },
                ]}
            />
        </Modal>
    );
};
