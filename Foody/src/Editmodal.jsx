const Editmodal = ({ open, onClose, children }) => {
    if (!open) return null;
  
    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ${open ? "visible bg-black/20" : "invisible"}`}
        
      onClick={onClose}
      
      >
        <div className={`absolute right-0 left-0 ml-auto mr-auto  top-[160px] bg-white p-7 shadow-lg rounded-sm w-80 transition-all ${open? "scale-100 opacity-100": "scale-125 opacity-0" } `} 
        
        onClick={(e) => e.stopPropagation()}
        >
          
          {children}
        </div>
      </div>
    );
  };
  
  
export default Editmodal;