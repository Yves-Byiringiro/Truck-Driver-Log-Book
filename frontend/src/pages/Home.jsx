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

    const handleSubmit = () => {
        alert("Form submitted")
        setAddNewDutyStatus(true)
    }

    const handleAddNewDuty = () => {
        alert("New duty added")
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
                    <div className='grid grid-cols-3 gap-4'>
                        <Input label="Driver number" type="text" />
                        <Input label="Driver initials" type="text" />
                        <Input label="Home operating center address" type="text" />
                        <Input label="Vehicle number" type="text" />
                        <Input label="Show each unit" type="text" />
                        <Input label="Other trailers" type="text" />
                        <Input label="Shipper" type="text" />
                        <Input label="Commodity" type="text" />
                        <Input label="Load no" type="text" />
                    </div>
                    <div className='mt-4'>
                        <PrimaryButton label={"Save"} onClick={handleSubmit} />
                    </div>
                </div>
                }
                {(addNewDutyStatus && ! onGoingJourney) && <div className='mt-4'>
                    <div className='grid grid-cols-3 gap-4'>
                        <Input label="Logbook" type="text" />
                        <Input label="Duty status" type="text" />
                        <Input label="Start time" type="time" />
                        <Input label="Location" type="text" />
                        <Input label="Odometer start" type="text" />
                        <Input label="Remarkss" type="text" />
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
