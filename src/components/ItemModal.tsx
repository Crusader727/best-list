import { Form, Input, Modal } from "antd";
import { Item } from "../types/store";
import TextArea from "antd/es/input/TextArea";

interface FolderModalProps {
    handleOk: (item: Item) => void;
    handleClose: () => void;
    isOpen: boolean;
    initialValues?: Item;
}

export const ItemModal = ({
    handleOk,
    handleClose,
    isOpen = false,
    initialValues = { id: "", name: "", description: "" },
}: FolderModalProps) => {
    const [form] = Form.useForm();

    const onFinish = (values: Item) => {
        handleOk({ ...values, id: initialValues?.id || `${values.name}-${Date.now()}` });
        handleClose();
    };

    const onOk = () => {
        form.submit();
    };

    return (
        <Modal title="Add Item" open={isOpen} onOk={onOk} onCancel={handleClose}>
            <Form
                name="addItem"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
                initialValues={initialValues}
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
        </Modal>
    );
};
