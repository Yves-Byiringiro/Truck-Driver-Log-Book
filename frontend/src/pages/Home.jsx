import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../containers/MainContainer';
import PageInfoSection from '../components/PageInfoSection';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { validate } from '../utils/funcs';
import { addLogBook, addLogBookEntry } from '../context/slices/log.slice';



export default function Home() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const {
        logBookAdded,
        addLogBookSuccess,
        addLogBookLoading,
        addLogBookError,

        addLogBookEntryLoading,
        addLogBookEntryError,
        addLogBookEntrySuccess
    } = useSelector(state => state.log);

    const [onGoingJourney, setOnGoingJourney] = useState(false);
    const [addNewDutyStatus, setAddNewDutyStatus] = useState(false);
    const [formTitle, setFormTitle] = useState('New log book');
    const [pageInfo, setPageInfo] = useState('Are you ready to start your journey? Please fill in the form below.');

    const [formState, setFormState] = useState({
        driver_number: user?.driver_number,
        driver_initials: user?.driver_initials,
        home_operating_center_address: '',
        vehicle_number: '',
        co_driver_name: '',
        show_each_unit: '',
        other_trailers: [],
        other_trailers_input: '',
        shipper: '',
        commodity: '',
        load_no: '',
        other_loads: [],
        other_loads_input: ''
    });

    const [dutyFormState, setDutyFormState] = useState({
        log_book: '',
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

    const handleSubmit = () => {
        const isValid = validate(formState, 'logbook', setErrors);
        if (!isValid) return;

        const bodyReq = formState
        dispatch(addLogBook(bodyReq))
    }

    const handleAddNewDuty = () => {
        const isValid = validate(dutyFormState, 'duty', setErrors);
        if (!isValid) return;

        console.log({dutyFormState})
        const bodyReq = dutyFormState
        dispatch(addLogBookEntry(bodyReq))
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


    useEffect(()=> {
        if (addLogBookSuccess) {
            setAddNewDutyStatus(true)
        }
        setDutyFormState((prev) => ({
            ...prev, log_book: logBookAdded?.id
        }))

    }, [addLogBookSuccess, logBookAdded])

    useEffect(()=> {
        if (addLogBookEntrySuccess) {
            setOnGoingJourney(true)
        }
    }, [addLogBookEntrySuccess])

    console.log(user)

  return (
    <div>
      <MainContainer>
        <div className='flex flex-col gap-10'>
            <PageInfoSection msg={pageInfo} />
            <div className='bg-white shadow-md rounded-lg p-6'>
                <h1 className='text-lg font-semibold'>{formTitle}</h1>
                {(!addNewDutyStatus && !onGoingJourney) && <div className='mt-4'>
                    {addLogBookLoading && <div>{addLogBookLoading}</div>}
                    {addLogBookError && <div>{addLogBookError}</div>}
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
                            value={formState.home_operating_center_address}
                            onChange={(val) => {
                                setErrors((prev) => ({ ...prev, home_operating_center_address: '' }));
                                setFormState((prev) => ({ ...prev, home_operating_center_address: val }))
                                }
                            }
                            error={errors.home_operating_center_address}
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
                            value={formState.other_trailers_input}
                            onChange={(val) => {
                                setFormState((prev) => ({
                                    ...prev,
                                    other_trailers_input: val,
                                    other_trailers: val
                                        .split(',')
                                        .map((item) => item.trim())
                                        .filter((item) => item.length > 0)
                                }))
                                setErrors((prev) => ({ ...prev, other_trailers: '' }));
                                }
                            }
                            error={errors.other_trailers}
                            editable={true}
                            caption={"More than 2 trailers are separatd with comma eg: trailer1, trailer2"}
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
                            value={formState.other_loads_input}
                            onChange={(val) => {
                                setFormState((prev) => ({
                                    ...prev, other_loads_input: val,
                                    other_loads: val
                                        .split(',')
                                        .map((item) => item.trim())
                                        .filter((item) => item.length > 0)
                                }))
                                }
                            }
                            editable={true}
                            caption={"More than two loads are separated with commas, e.g., load1, load2"}

                        />
                    </div>
                    <div className='mt-4'>
                        <PrimaryButton label={"Save"} onClick={handleSubmit} />
                    </div>
                </div>
                }
                {(addNewDutyStatus && ! onGoingJourney) && <div className='mt-4'>
                    {addLogBookEntryLoading && <div>{addLogBookEntryLoading}</div>}
                    {addLogBookEntryError && <div>{addLogBookEntryError}</div>}
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



