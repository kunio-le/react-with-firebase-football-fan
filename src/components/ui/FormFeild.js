import React from 'react';

const FormFeild = ({ formData, id, onChange }) => {
    let template = null;
    switch (formData.element) {
    case 'input':
        template = (
            <div>
                {formData.config.label && (
                    <div className="label_inputs">
                        {formData.config.label}
                    </div>
                )}
                <input
                    {...formData.config}
                    value={formData.value}
                    onChange={e => onChange({ e, id })}
                />
            </div>
        );
        break;

    case 'select':
        template = (
            <div>
                {formData.config.label && (
                    <div className="label_inputs">
                        {formData.config.label}
                    </div>
                )}
                <select
                    {...formData.config}
                    value={formData.value}
                    onChange={e => onChange({ e, id })}>
                    <option value="" disabled>
                            ---Select One---
                    </option>
                    {formData.config.options.map(option => (
                        <option key={option.key} value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </select>
            </div>
        );
        break;
    default:
        template = null;
    }
    return <div>{template}</div>;
};

export default FormFeild;
