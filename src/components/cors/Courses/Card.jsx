import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
    let course = props.course;
    const navigate = useNavigate();

    // Navigate to course details page on card click
    const handleCardClick = () => {
        navigate(`/course/${course._id}`);
    };

    return (
        <div className='card' onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div>
                <img className="image" src={course.thumbnail} alt={course.courseName}/>
            </div>
            <div className="card-content">
                <p>{course.courseName}</p>
                <p>
                    {
                        course.courseDescription.length > 100 
                        ? `${course.courseDescription.substr(0, 100)}...` 
                        : course.courseDescription
                    }
                </p>
            </div>
        </div>
    );
};

export default Card;
