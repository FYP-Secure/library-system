import {Button, Input, Modal, Space, Table} from "antd";
import {useState} from "react";
import {AddBookView} from "./AddBook";
import {EditBookView} from "./EditBook";
import {DeleteBookView} from "./DeleteBook";

export const AdminDashboard = () => {

    const [modalVisible, setModalVisible] = useState({
        add: false,
        edit: false,
        delete: false
    })

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render(_: any, record: any) {
                return (
                    <Space direction={"horizontal"}>
                        <Button onClick={() => {
                            setModalVisible({ ...modalVisible, edit: true })
                            console.log(record)
                        }}>Edit</Button>
                        <Button onClick={() => {
                            setModalVisible({ ...modalVisible, delete: true })
                            console.log(record)
                        }}>Delete</Button>
                    </Space>
                );
            }
        },
    ];

    return (
        <>
            <Space direction={"vertical"} style={{width: "100%"}}>
                <Space direction={"horizontal"}>
                    <Button onClick={() => setModalVisible({...modalVisible, add: true})}>Create</Button>
                </Space>
                <Table dataSource={dataSource} columns={columns}/>
            </Space>

            <Modal title="Add Book" visible={modalVisible.add}
                   onOk={() => setModalVisible({...modalVisible, add: false})}
                   onCancel={() => setModalVisible({...modalVisible, add: false})} footer={null} width={800}>
                <AddBookView/>
            </Modal>

            <Modal title="Edit Book" visible={modalVisible.edit}
                   onOk={() => setModalVisible({...modalVisible, edit: false})}
                   onCancel={() => setModalVisible({...modalVisible, edit: false})} footer={null} width={800}>
                <EditBookView/>
            </Modal>

            <Modal title="Delete Book" visible={modalVisible.delete}
                   onOk={() => setModalVisible({...modalVisible, delete: false})}
                   onCancel={() => setModalVisible({...modalVisible, delete: false})} footer={null} width={400}>
                <DeleteBookView/>
            </Modal>
        </>
    )
}
