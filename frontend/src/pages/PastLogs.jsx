import MainContainer from "../containers/MainContainer"


export default function PastLogs() {
    const pastLogs = [
        {
            id: 1,
            vehicle_number: 'HVH989',
            shipper: 'HHHHHD',
            load_no: '89834'
        },
        {
            id: 2,
            vehicle_number: 'YEVD89',
            shipper: 'NLABD',
            load_no: '98824'
        },
        {
            id: 3,
            vehicle_number: 'HVH989',
            shipper: 'HHHHHD',
            load_no: '89834'
        },
        {
            id: 4,
            vehicle_number: 'YEVD89',
            shipper: 'NLABD',
            load_no: '98824'
        },
        {
            id: 5,
            vehicle_number: 'HVH989',
            shipper: 'HHHHHD',
            load_no: '89834'
        },
        {
            id: 6,
            vehicle_number: 'YEVD89',
            shipper: 'NLABD',
            load_no: '98824'
        },
        {
            id: 7,
            vehicle_number: 'HVH989',
            shipper: 'HHHHHD',
            load_no: '89834'
        },
        {
            id: 8,
            vehicle_number: 'YEVD89',
            shipper: 'NLABD',
            load_no: '98824'
        }
    ]
  return (
    <div>
        <MainContainer>
            <div className='flex flex-col gap-10'>
                <h1 className="text-3xl font-semibold">
                    Past logs
                </h1>
                <div>
                    <div className="grid grid-cols-4 gap-x-4 py-4 border-t border-b border-gray-500">
                        <div className="text-center font-semibold">Vehicle number</div>
                        <div className="text-center font-semibold">Shipper</div>
                        <div className="text-center font-semibold">Load no</div>
                        <div className="text-center font-semibold">View more</div>
                    </div>
                    <div>
                        {pastLogs.map(({id, vehicle_number, shipper, load_no})=> (
                            <div
                                key={id}
                                className="grid grid-cols-4 gap-x-4 py-4 border-t border-b border-gray-200"
                            >
                                <div className="text-center font-light">{vehicle_number}</div>
                                <div className="text-center font-light">{shipper}</div>
                                <div className="text-center font-light">{load_no}</div>
                                <div className="text-center font-light">View more</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    dsfd
                </div>
            </div>

        </MainContainer>
    </div>
  )
}
