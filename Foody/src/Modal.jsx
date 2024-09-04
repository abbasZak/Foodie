const Modal = ({ open, onClose, children }) => {
    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className= {`absolute right-0 left-0 ml-auto mr-auto  top-[160px] bg-white p-7 shadow-lg rounded-sm w-80 transition-all ${open? "scale-100 opacity-100": "scale-125 opacity-0" } z-50 `}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
