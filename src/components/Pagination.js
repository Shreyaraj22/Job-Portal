const Pagination = ({ currentPage, onPageChange }) => { 
 
  return (
    <div className="flex justify-center items-center space-x-4 mt-8"> 
    <button
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" 
       onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-gray-700">Page {currentPage}</span> 
      <button
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" 
        onClick={() => onPageChange(currentPage + 1)} >
        Next
      </button>
    </div>
  );
};

export default Pagination; 

