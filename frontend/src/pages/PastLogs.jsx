import { FiExternalLink, FiArrowRightCircle, FiArrowLeftCircle,  } from "react-icons/fi";
import MainContainer from "../containers/MainContainer"
import Popup from "../components/Popup";
import { useState } from "react";


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
    ];
    const logsPerPage  = 5;
    const totalPages = Math.ceil(pastLogs.length / logsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = pastLogs.slice(indexOfFirstLog, indexOfLastLog);

    const [logId, setLogId] = useState('');
    const [showLogDetails, setShowLogDetails] = useState(false);

    const handleViewDetails = (id) => {
        setLogId(id)
        setShowLogDetails(true)
    }

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };
  return (
    <div>
        {showLogDetails && <Popup
            logId={logId}
            setShowPopup={setShowLogDetails}
        >
            <span>Hello there</span>
        </Popup>}
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
                        {currentLogs.map(({id, vehicle_number, shipper, load_no})=> (
                            <div
                                key={id}
                                className="grid grid-cols-4 gap-x-4 py-4 border-t border-b border-gray-200"
                            >
                                <div className="text-center font-light">{vehicle_number}</div>
                                <div className="text-center font-light">{shipper}</div>
                                <div className="text-center font-light">{load_no}</div>
                                <div className="font-light flex justify-center relative">
                                    <button
                                        className="cursor-pointer group"
                                        onClick={()=> handleViewDetails(id)}
                                    >
                                        <FiExternalLink size={24} color="#377DF6" />
                                        <span className="absolute top-0 right-5 -translate-x-1/2 mt-1 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                            View details
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <span
                        onClick={handlePrev}
                        className={`cursor-pointer ${currentPage === 1 ? 'opacity-30 pointer-events-none' : ''}`}
                    >
                        <FiArrowLeftCircle
                            size={34}
                            color="#377DF6"
                        />
                    </span>
                    <span
                        onClick={handleNext}
                        className={`cursor-pointer ${currentPage === totalPages ? 'opacity-30 pointer-events-none' : ''}`}
                    >
                        <FiArrowRightCircle
                            size={34}
                            color="#377DF6"
                        />
                    </span>
                </div>
            </div>
        </MainContainer>
    </div>
  )
}


