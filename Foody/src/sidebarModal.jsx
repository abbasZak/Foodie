const SidebarModal = ({ open, onClose, children }) => {
    return (
      <div
        className={`fixed inset-0 justify-center items-center transition-colors ${
          open ? "visible bg-black/20" : "invisible"
        }`}
        onClick={onClose}
      >
        <div
          className={`absolute w-80 right-0 bg-white h-screen text-center transition-all ${
            open ? "right-0" : "right-[-240px]"
          }`}
          onClick={(e) => e.stopPropagation()} // Prevents the modal from closing when clicking inside it
        >
          {children}
        </div>
      </div>
    );
  };
  
  export default SidebarModal;
  