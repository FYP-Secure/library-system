import {notification} from "antd";

export const SuccessNotification = (message: string) => {
    notification["success"]({
        message: 'Success',
        description: message,
    });
}
