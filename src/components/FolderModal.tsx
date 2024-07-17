import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { Folder } from "../types/store";

interface FolderModalProps {
    handleOk: (folder: Folder) => void;
    handleClose: () => void;
    isOpen: boolean;
}

export const FolderModal = ({ handleOk, handleClose, isOpen = false }: FolderModalProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: { name: string }) => {
        handleOk({ ...values, items: [] });
        form.resetFields();
        handleClose();
    };

    const onOk = () => {
        form.submit();
    };

    return (
        <Modal title="Add Folder" open={isOpen} onOk={onOk} onCancel={handleClose}>
            <Form
                name="addFolder"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input folder name" }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
