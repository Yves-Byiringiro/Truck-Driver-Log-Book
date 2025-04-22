import { useState, useEffect } from 'react';
import MainContainer from './../containers/MainContainer';
import PageInfoSection from '../components/PageInfoSection';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

export default function Home() {
    const [onGoingJourney, setOnGoingJourney] = useState(false);
    const [addNewDutyStatus, setAddNewDutyStatus] = useState(false);
    const [formTitle, setFormTitle] = useState('New log book');
    const [pageInfo, setPageInfo] = useState('Are you ready to start your journey? Please fill in the form below.');

    const [formState, setFormState] = useState({
        driver_number: '7Y-56-783',
        driver_initials: 'YB',
        home_address: '',
        vehicle_number: '',
        co_driver_name: '',
        show_each_unit: '',
        other_trailers: [],
        shipper: '',
        commodity: '',
        load_no: '',
        other_loads: []
    });

    const [dutyFormState, setDutyFormState] = useState({
        log_book: 1,
        duty_status: '',
        start_time: '',
        location: '',
        odometer_start: '',
        remarks: '',
    });
    const dutyStatuses = [
        {key:'OFF', value: 'Off Duty'},
        {key:'SB', value:'Sleeper Berth'},
        {key:'D' , value:'Driving'},
        {key:'ON', value:'On Duty (Not Driving)'}
    ]
    const [errors, setErrors] = useState({});

    const validate = (formToValidate, formType) => {
        const newErrors = {};

        if (formType == 'logbook') {
            if (!formToValidate.home_address) newErrors.home_address = 'Home address is required';
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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

    const handleSubmit = () => {
        const isValid = validate(formState, 'logbook');
        if (!isValid) return;

        console.log({formState})

        setAddNewDutyStatus(true)
    }

    const handleAddNewDuty = () => {
        const isValid = validate(dutyFormState, 'duty');
        if (!isValid) return;

        console.log({dutyFormState})

        setOnGoingJourney(true)
    }

    useEffect(()=> {
        if (addNewDutyStatus) {
            setFormTitle('New duty')
            setPageInfo('Start your journey by logging the activities, please fill in the form below.')
        }
    }, [addNewDutyStatus])

    useEffect(()=> {
        setFormTitle('')
        setPageInfo('Visualize your journey, and add new duty')
    }, [onGoingJourney])
  return (
    <div>
      <MainContainer>
        <div className='flex flex-col gap-10'>
            <PageInfoSection msg={pageInfo} />
            <div className='bg-white shadow-md rounded-lg p-6'>
                <h1 className='text-lg font-semibold'>{formTitle}</h1>
                {(!addNewDutyStatus && !onGoingJourney) && <div className='mt-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <Input
                            label="Driver number"
                            type="text"
                            value={formState.driver_number}
                            onChange={(val) =>
                                setFormState((prev) => ({ ...prev, driver_number: val }))
                            }
                            editable={false}
                        />
                        <Input
                            label="Driver initials"
                            type="text"
                            value={formState.driver_initials}
                            onChange={(val) =>
                                setFormState((prev) => ({ ...prev, driver_initials: val }))
                            }
                            editable={false}
                        />
                        <Input
                            label="Home operating center address"
                            type="text"
                            value={formState.home_address}
                            onChange={(val) => {
                                setErrors((prev) => ({ ...prev, home_address: '' }));
                                setFormState((prev) => ({ ...prev, home_address: val }))
                                }
                            }
                            error={errors.home_address}
                            editable={true}
                        />
                        <Input
                            label="Vehicle number"
                            type="text"
                            value={formState.vehicle_number}
                            onChange={(val) => {
                                setFormState((prev) => ({ ...prev, vehicle_number: val }))
                                setErrors((prev) => ({ ...prev, vehicle_number: '' }));
                                }
                            }
                            error={errors.vehicle_number}
                            editable={true}
                        />
                        <Input
                            label="Co driver name"
                            type="text"
                            value={formState.co_driver_name}
                            onChange={(val) => {
                                setFormState((prev) => ({ ...prev, co_driver_name: val }))
                                }
                            }
                            editable={true}
                        />

                        <Input
                            label="Show each unit"
                            type="text"
                            value={formState.show_each_unit}
                            onChange={(val) => {
                                setFormState((prev) => ({ ...prev, show_each_unit: val }))
                                setErrors((prev) => ({ ...prev, show_each_unit: '' }));
                                }
                            }
                            error={errors.show_each_unit}
                            editable={true}
                        />
                        <Input
                            label="Other trailers"
                            type="text"
                            value={formState.other_trailers}
                            onChange={(val) => {
                                setFormState((prev) => ({ ...prev, other_trailers: val }))
                                setErrors((prev) => ({ ...prev, other_trailers: '' }));
                                }
                            }
                            error={errors.other_trailers}
                            editable={true}
                        />
                        <Input
                            label="Shipper"
                            type="text"
                            value={formState.shipper}
                            onChange={(val) => {
                                setFormState((prev) => ({ ...prev, shipper: val }))
                                setErrors((prev) => ({ ...prev, shipper: '' }));
                                }
                            }
                            error={errors.shipper}
                            editable={true}
                        />
                        <Input
                            label="Commodity"
                            type="text"
                            value={formState.commodity}
                            onChange={(val) => {
                                setFormState((prev) => ({ ...prev, commodity: val }))
                                setErrors((prev) => ({ ...prev, commodity: '' }));
                                }
                            }
                            error={errors.commodity}
                            editable={true}
                        />
                        <Input
                            label="Load no"
                            type="text"
                            value={formState.load_no}
                            onChange={(val) => {
                                setFormState((prev) => ({ ...prev, load_no: val }))
                                setErrors((prev) => ({ ...prev, load_no: '' }));
                                }
                            }
                            error={errors.load_no}
                            editable={true}
                        />
                        <Input
                            label="Other loads"
                            type="text"
                            value={formState.other_loads}
                            onChange={(val) => {
                                setFormState((prev) => ({ ...prev, other_loads: val }))
                                }
                            }
                            editable={true}
                        />
                    </div>
                    <div className='mt-4'>
                        <PrimaryButton label={"Save"} onClick={handleSubmit} />
                    </div>
                </div>
                }
                {(addNewDutyStatus && ! onGoingJourney) && <div className='mt-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <Input
                            label="Log book"
                            type="text"
                            value={dutyFormState.log_book}
                            onChange={(val) =>
                                setFormState((prev) => ({ ...prev, log_book: val }))
                            }
                            editable={false}
                        />
                        <Input
                            label="Duty status"
                            type="select"
                            value={dutyFormState.duty_status}
                            onChange={(val) => {
                                setDutyFormState((prev) => ({ ...prev, duty_status: val }))
                                setErrors((prev) => ({ ...prev, duty_status: '' }));
                                }
                            }
                            error={errors.duty_status}
                            editable={true}
                            options={dutyStatuses}
                        />
                        <Input
                            label="Start time"
                            type="time"
                            value={dutyFormState.start_time}
                            onChange={(val) => {
                                setDutyFormState((prev) => ({ ...prev, start_time: val }))
                                setErrors((prev) => ({ ...prev, start_time: '' }));
                                }
                            }
                            error={errors.start_time}
                            editable={true}
                        />
                        <Input
                            label="Location"
                            type="text"
                            value={dutyFormState.location}
                            onChange={(val) => {
                                setDutyFormState((prev) => ({ ...prev, location: val }))
                                setErrors((prev) => ({ ...prev, location: '' }));
                                }
                            }
                            error={errors.location}
                            editable={true}
                        />
                        <Input
                            label="Odometer start"
                            type="number"
                            value={dutyFormState.odometer_start}
                            onChange={(val) => {
                                setDutyFormState((prev) => ({ ...prev, odometer_start: val }))
                                setErrors((prev) => ({ ...prev, odometer_start: '' }));
                                }
                            }
                            error={errors.odometer_start}
                            editable={true}
                        />
                        <Input
                            label="Remarks"
                            type="text"
                            value={dutyFormState.remarks}
                            onChange={(val) => {
                                setDutyFormState((prev) => ({ ...prev, remarks: val }))
                                setErrors((prev) => ({ ...prev, remarks: '' }));
                                }
                            }
                            error={errors.remarks}
                            editable={true}
                        />
                    </div>
                    <div className='mt-4'>
                        <SecondaryButton onClick={handleAddNewDuty} />
                    </div>
                </div>
                }
            </div>
        </div>
      </MainContainer>
    </div>
  )
}



