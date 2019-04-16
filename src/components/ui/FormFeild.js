import React from 'react';

const FormFeild = ({ formData, id, onChange }) => {
    let template = null;
    switch (formData.element) {
    case 'input':
        template = (
            <div>
                <input
                    {...formData.config}
                    value={formData.value}
                    onChange={e => onChange({ e, id })}
                />
            </div>
        );
        break;
    default:
        template = null;
    }
    return <div>{template}</div>;
};

export default FormFeild;
