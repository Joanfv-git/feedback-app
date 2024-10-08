import Card from './shared/Card'
import { useState, useContext, useEffect } from 'react'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

import FeedBackContext from '../context/FeedBackContext'

function FeedbackForm(){
    const [text, setText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState('10')
    const {addFeedback, feedbackEdit, updateFeedBack} = useContext(FeedBackContext)

    useEffect(() => {
        if(feedbackEdit.edit===true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    const handleTextChange = (e) => {
        if(text===''){
            setBtnDisabled(true)
            setMessage(null)
        
    }else if(text !== '' && text.length <= 10){
            setBtnDisabled(true)
            setMessage('Text must be at least 10 characters')
        }else{
            setBtnDisabled(false)
            setMessage('')}

        setText(e.target.value)
    }

    const handleSubmit = (e) => {
       e.preventDefault()
       if(text.trim().length > 10){
        const newFeedback = {
            rating: rating,
            text: text
        }
        if(feedbackEdit.edit===true){
            updateFeedBack(feedbackEdit.item.id, newFeedback)
        }else{
            addFeedback(newFeedback)
        }
        
        setText('')
       }
    }

    return (
    <Card> 
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
             <RatingSelect select={(rating)=>setRating(rating)} /> 
            <div className="input-group">
                <input onChange={handleTextChange} type="text" placeholder='Write a review' value={text} />
                <Button type='submit' isDisabled={btnDisabled}>Submit</Button>
            </div>
            {message && <div className='message'>{message}</div>}
            </form>
         </Card> 
    )
}

export default FeedbackForm