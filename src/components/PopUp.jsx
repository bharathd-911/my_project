import React from 'react';

const Popup = ({ isOpen, onClose, children }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-slate-700 p-14 text-center border-2 rounded-lg shadow-lg max-w-sm mx-auto z-10">
        {children}
        <div className='pt-5'><button className="w-24 bg-indigo-600 border-2 hover:bg-indigo-700 text-white rounded-lg" onClick={onClose}>CLOSE</button></div>
      </div>
    </div>
  );
};

export default Popup;
