

export  const validate = (formToValidate, formType, setErrors) => {
    const newErrors = {};

    if (formType == 'logbook') {
        if (!formToValidate.home_operating_center_address) newErrors.home_operating_center_address = 'Home address is required';
        if (!formToValidate.vehicle_number) newErrors.vehicle_number = 'Vehicle number is required';
        if (!formToValidate.show_each_unit) newErrors.show_each_unit = 'Show each unit is required';
        if (!formToValidate.other_trailers) newErrors.other_trailers = 'Other trailers is required';
        if (!formToValidate.shipper) newErrors.shipper = 'Shipper name is required';
        if (!formToValidate.commodity) newErrors.commodity = 'Commodity name is required';
        if (!formToValidate.load_no) newErrors.load_no = 'Load no is required';
    }

    if (formType == 'duty') {
        if (!formToValidate.duty_status) newErrors.duty_status = 'Duty status is required';
        if (!formToValidate.start_time) newErrors.start_time = 'Start time is required';
        if (!formToValidate.location) newErrors.location = 'Location is required';
        if (!formToValidate.odometer_start) newErrors.odometer_start = 'Odometer start is required';
        if (!formToValidate.remarks) newErrors.remarks = 'Remark is required';
    }

    if (formType == 'login') {
        if (!formToValidate.username) newErrors.username = 'Username is required';
        if (!formToValidate.password) newErrors.password = 'Password is required';
    }

    if (formType === 'register') {
        if (!formToValidate.username) {
            newErrors.username = 'Username is required';
        } else if (formToValidate.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters long';
        }

        if (!formToValidate.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formToValidate.email)) {
            newErrors.email = 'Email is not valid';
        }

        if (!formToValidate.password) {
            newErrors.password = 'Password is required';
        } else if (formToValidate.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};