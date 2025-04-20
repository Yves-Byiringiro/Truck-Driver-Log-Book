import MainContainer from './../containers/MainContainer'
import PageInfoSection from '../components/PageInfoSection'

export default function Home() {
  return (
    <div>
      <MainContainer>
        <div className='flex flex-col gap-10'>
            <PageInfoSection msg="Are you ready to start your journey? Please fill in the form below." />
            <div className='bg-white shadow-md rounded-lg p-6'>
                <h1 className='text-lg font-semibold'>New log book</h1>
            </div>
        </div>
      </MainContainer>
    </div>
  )
}
