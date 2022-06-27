import {notification} from "antd";

export const ErrorNotification = (error: any) => {
    notification["error"]({
        message: 'Error',
        description: error?.response?.data?.message ?? `Something went wrong, ${error.toString()}`,
    });
}
