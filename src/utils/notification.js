import React from 'react';
import { NotificationManager} from 'react-notifications';

export const createNotification = (type, messages) => {
    switch (type) {
        case 'info':
            NotificationManager.info(messages);
            break;
        case 'success':
            NotificationManager.success(messages);
            break;
        case 'warning':
            NotificationManager.warning(messages);
            // NotificationManager.warning('Warning message', messages, 3000);
            break;
        case 'error':
            NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
            });
            break;
    }
};