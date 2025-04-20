import MainContainer from './../containers/MainContainer'
import PageInfoSection from '../components/PageInfoSection'

export default function Home() {
  return (
    <div>
      <MainContainer>
        <div>
            <PageInfoSection msg="Are you ready to start your journey? Please fill in the form below." />
        </div>
      </MainContainer>
    </div>
  )
}
