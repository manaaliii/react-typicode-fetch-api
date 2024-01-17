import React from 'react';

interface AlertProps {
    alertMessage: {
        message: string;
        alertType: string;
    };
}

const Alert: React.FC<AlertProps> = ({ alertMessage }) => {
    const { message, alertType } = alertMessage;
    return (
        <>
            {alertType?.length > 0 &&
                <div className={`alert alert-${alertType}`} role='alert'>
                    {message}
                </div>
            }
        </>
    );
}

export default Alert;
