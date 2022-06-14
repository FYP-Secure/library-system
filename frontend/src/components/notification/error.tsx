import {notification} from "antd";

export const ErrorNotification = (message: string) => {
    notification["error"]({
        message: 'Error',
        description: message,
    });
}
