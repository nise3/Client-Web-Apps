import {message} from 'antd';

const Toast = {
  success: (content: string) => {
    message.success({
      content: content,
      className: 'toast-success',
    });
  },
  error: (content: string) => {
    message.error({
      content: content,
      className: 'toast-error',
    });
  },
  warning: (content: string) => {
    message.warning({
      content: content,
      className: 'toast-warning',
    });
  },
};

export default Toast;
