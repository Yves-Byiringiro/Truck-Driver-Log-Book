import React from 'react'

export default function Popup({ logId, children, setShowPopup }) {
    console.log(logId)
  return (
    <div className="backdrop-blur-sm bg-black/75 fixed inset-0 flex items-center justify-center z-50">
    <div className="model-overlay"></div>
    <div className="modal-container">
        <div className="modal-content">
            {children}
            <button
                className="cursor-pointer"
                onClick={()=> setShowPopup(false)}
            >
                <span>Close</span>
            </button>
        </div>
    </div>
</div>
  )
}