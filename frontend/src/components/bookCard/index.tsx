import {Card} from "antd";

export const BookCard = () => {
    return (
        <Card title="Default size card" extra={<a href="#">Borrow</a>} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    )
}
