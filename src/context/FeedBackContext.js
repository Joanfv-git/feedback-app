import { createContext, useState, useEffect } from "react";


const FeedBackContext = createContext();

export const FeedBackProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState([])

    const [feedbackEdit,setFeedbackEdit] = useState({
        item:{},
        edit:false
    })

    useEffect(() => {
        fetchFeedback();
    }, []);

    //Fetch feedback
    const fetchFeedback = async () => {
        const response = await fetch("/feedback?_sort=id&_order=desc");
        const data = await response.json();
        setFeedback(data);
        setIsLoading(false);
      };
      //Fetch feedback

    //Delete feedback
    const deleteFeedbak = async(id) => {
        if (window.confirm("Are you sure you want to delete this feedback?"))
          await fetch(`/feedback/${id}`, {
        
            method: "DELETE",})
          
            setFeedback(feedback.filter((item) => item.id !== id));
      };
        //Add feedback
      const addFeedback = async(newFeedback) => {
         const reponse = await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body:JSON.stringify(newFeedback)
         })

         const data = await reponse.json();
        setFeedback([data, ...feedback]);
        };
        //Edit feedback
        const editFeedback = (item) => {
            setFeedbackEdit({item, edit:true})
        }

        const updateFeedBack=async(id, updItem)=>{
const reponse = await fetch(`/feedback/${id}`, {
    method: 'PUT',
    headers: {
        'Content-type': 'application/json'
    },
    body:JSON.stringify(updItem)
    })
    const data = await reponse.json();

            setFeedback( feedback.map((item) => (item.id === id ?{...item, ...data}: item)))
        }

    return <FeedBackContext.Provider  value={{
        feedback,
        deleteFeedbak,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedBack,
        isLoading
        
    }}>
    {children}
    </FeedBackContext.Provider> 
}

export default FeedBackContext