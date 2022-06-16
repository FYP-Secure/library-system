import {Button, Input, Modal, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {AddBookView} from "./AddBook";
import {EditBookView} from "./EditBook";
import {DeleteBookView} from "./DeleteBook";
import axios from "axios";
import {ErrorNotification} from "../../../components/notification/error";

export const AdminDashboard = () => {

    const [modalVisible, setModalVisible] = useState({
        add: false,
        edit: false,
        delete: false
    })

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Is Borrowed',
            dataIndex: 'isBorrowed',
            key: 'isBorrowed',
            render(_: any, record: any): JSX.Element {
                return <span>{record.isBorrowed ? "Yes" : "No"}</span>
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render(_: any, record: any) {
                return (
                    <Space direction={"horizontal"}>
                        <Button onClick={() => {
                            setSelectedRecord(record)
                            setModalVisible({ ...modalVisible, edit: true })
                        }}>Edit</Button>
                        <Button onClick={() => {
                            setSelectedRecord(record)
                            setModalVisible({ ...modalVisible, delete: true })
                        }}>Delete</Button>
                    </Space>
                );
            }
        },
    ];

    const [loading, setLoading] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const onGetBookList = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API_URL}/books`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then((res) => {
                setBookList(res.data)
            })
            .catch((error) => {
                ErrorNotification(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const onCloseModal = () => {
        onGetBookList()
        setModalVisible({ ...modalVisible, add: false, edit: false, delete: false })
    }

    useEffect(() => {
        onGetBookList();
    }, []);

    return (
        <>
            <Space direction={"vertical"} style={{width: "100%"}}>
                <Space direction={"horizontal"}>
                    <Button onClick={() => setModalVisible({...modalVisible, add: true})}>Create</Button>
                </Space>
                <Table loading={loading} dataSource={bookList} columns={columns}/>
            </Space>

            <Modal title="Add Book" visible={modalVisible.add}
                   onOk={() => setModalVisible({...modalVisible, add: false})}
                   onCancel={() => setModalVisible({...modalVisible, add: false})} footer={null} width={800}>
                <AddBookView onCloseModal={onCloseModal}/>
            </Modal>

            <Modal title="Edit Book" visible={modalVisible.edit}
                   onOk={() => setModalVisible({...modalVisible, edit: false})}
                   onCancel={() => setModalVisible({...modalVisible, edit: false})} footer={null} width={800}>
                <EditBookView record={selectedRecord} onCloseModal={onCloseModal} />
            </Modal>

            <Modal title="Delete Book" visible={modalVisible.delete}
                   onOk={() => setModalVisible({...modalVisible, delete: false})}
                   onCancel={() => setModalVisible({...modalVisible, delete: false})} footer={null} width={400}>
                <DeleteBookView record={selectedRecord} onCloseModal={onCloseModal}/>
            </Modal>
        </>
    )
}
