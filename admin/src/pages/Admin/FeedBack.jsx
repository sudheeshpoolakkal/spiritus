import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { FiCheckCircle, FiTrash2, FiMail, FiEye } from 'react-icons/fi';

export const FeedBack = () => {
  const { feedbacks, getAllFeedbacks, markFeedbackAsRead, deleteFeedback } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllFeedbacks();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleMarkAsRead = async (id) => {
    await markFeedbackAsRead(id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      await deleteFeedback(id);
      if (selectedFeedback && selectedFeedback._id === id) {
        setSelectedFeedback(null);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">User Feedback Management</p>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white px-8 py-8 border rounded w-full max-w-7xl max-h-[82vh] overflow-y-scroll">
          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <p className="mb-3 text-lg font-medium flex items-center">
                <FiMail className="mr-2" /> Feedback List
              </p>
              
              {feedbacks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No feedback submissions yet.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {feedbacks.map((feedback) => (
                    <li 
                      key={feedback._id}
                      className={`p-3 rounded cursor-pointer transition-all duration-200 ${
                        selectedFeedback && selectedFeedback._id === feedback._id
                          ? 'bg-blue-100 border-l-4 border-primary'
                          : feedback.isRead 
                            ? 'hover:bg-gray-100 bg-gray-50 border'
                            : 'hover:bg-blue-50 bg-blue-50 border-l-4 border-primary'
                      }`}
                      onClick={() => setSelectedFeedback(feedback)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`font-medium ${!feedback.isRead && 'font-medium'}`}>
                            {feedback.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(feedback.createdAt)}
                          </p>
                        </div>
                        <div className="flex space-x-1">
                          {!feedback.isRead && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(feedback._id);
                              }}
                              className="text-green-500 hover:text-green-700 p-1"
                              title="Mark as read"
                            >
                              <FiCheckCircle />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(feedback._id);
                            }}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Delete feedback"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1 truncate">
                        {feedback.message.substring(0, 50)}
                        {feedback.message.length > 50 && '...'}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              {selectedFeedback ? (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-medium">{selectedFeedback.name}</h2>
                      <p className="text-primary">{selectedFeedback.email}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        Submitted on {formatDate(selectedFeedback.createdAt)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {!selectedFeedback.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(selectedFeedback._id)}
                          className="flex items-center bg-green-100 text-green-600 px-3 py-1 rounded hover:bg-green-200 transition-colors"
                        >
                          <FiCheckCircle className="mr-1" /> Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(selectedFeedback._id)}
                        className="flex items-center bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition-colors"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="border rounded px-3 py-3 bg-gray-50">
                    <p className="mb-2 font-medium flex items-center">
                      <FiEye className="mr-2" /> Message
                    </p>
                    <p className="text-gray-700 whitespace-pre-line">{selectedFeedback.message}</p>
                  </div>
                  
                  {!selectedFeedback.isRead && (
                    <div className="mt-4 bg-blue-50 border border-blue-100 p-3 rounded">
                      <p className="text-primary text-sm">
                        This feedback is unread. Mark it as read once you've reviewed it.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center border rounded px-3 py-3 bg-gray-50">
                  <FiMail className="text-gray-400 text-6xl mb-4" />
                  <h3 className="text-lg font-medium text-gray-500">Select a feedback to view details</h3>
                  <p className="text-gray-400 mt-2">
                    Click on any feedback from the list to view its contents
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedBack;