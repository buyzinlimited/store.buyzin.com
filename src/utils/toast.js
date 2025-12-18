import { useToast } from 'vue-toastification';

const toast = useToast();

export function Toast(type, message) {
    switch (type) {
        case 'success':
            toast.success(message, { timeout: 3000 });
            break;
        case 'info':
            toast.info(message, { timeout: 3000 });
            break;
        case 'error':
            toast.error(message, { timeout: 3000 });
            break;
        case 'warning':
            toast.warning(message, { timeout: 3000 });
            break;
        default:
            console.error('Unknown toast type:', type);
    }
}

export default Toast;
