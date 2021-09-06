import React from 'react';

const QuestionModal = ({questions}) => {

    const renderForm = () => {
        return (
            <>
                <h1>Question Modal</h1>
                {renderCurrentQuestion()}
            </>
        )
    }

    return ( 
    <div>
        <h1>Question Modal</h1>
        <button onClick={log}>Answer question</button>
    </div>
        
    );
}
 
export default QuestionModal;