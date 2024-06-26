import React from 'react';
import Popup from 'reactjs-popup';

export default function PopupYesNo({data}){
    return (
        <div className='flex flex-row text-center w-auto rounded-lg'>
             <Popup open={data.open} closeOnDocumentClick onClose={data.close} className='rounded-lg'>
                <div className="modal w-auto ">
                    <a className="absolute -top-2 -right-2 size-6 rounded-full bg-slate-900 text-white" onClick={data.close}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </a>
                    <div className='m-2 pb-1'>
                        {data.prompt}
                    </div>
                    <div className='flex justify-center'>
                        <button className="btn-primary w-24 m-1 flex-wrap" onClick={() => data.action(data.id)}>
                            OK
                        </button>
                        <button className="btn-primary w-24 m-1 flex-wrap" onClick={data.close}>
                            Cancel
                        </button>
                    </div>         
                </div>
            </Popup>
        </div>
    )
}
