import { useState } from 'react';

const useFormValid = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    const rule = validationRules[name];
    if (!rule) return;

    if (rule.required && !value.trim()) {
      return 'This field is required';
    }
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Invalid format';
    }
    return '';
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    const errorMessage = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const isValid = Object.values(errors).every((error) => !error);

  return { values, errors, handleChange, isValid };
};

export default useFormValid;
