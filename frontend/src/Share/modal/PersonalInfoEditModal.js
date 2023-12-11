import React, { useState } from 'react'
import styles from './PersonalInfoEditModal.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { adding } from '../../store/userSlice';
import axios from 'axios';
const PersonalInfoEditModal = ({backdropHandler}) => {
    const dispatch = useDispatch();
    const user = useSelector(u => u.user.user);
    const [selectedOption, setSelectedOption] = useState(user.status ? user.status : null);
    const [selectedDate, setSelectedDate] = useState(
        user.date ? new Date(user.date).toISOString().split('T')[0] : ''
      );
      
    const id=user.id;
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleAddClick = async (e) => {
        e.preventDefault();
        if (selectedDate !== '' || selectedOption !== '') {
            // At least one field is filled, proceed with the request
            const data={
                id:id,
                status:selectedOption,
                date:selectedDate
            }
            axios.defaults.baseURL = 'https://smart-api-32fb.onrender.com';
            const response = await axios.put('/api/editinformation', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.status){
                dispatch(adding({ ...user, date: selectedDate || null, status: selectedOption || null }));
                backdropHandler()
            }
            // Perform your API request or Redux action dispatch here
        } else {
            // Both date and selected option are null, prevent the request
            alert('Please select a date or an option before proceeding.');
        }
    };
    return (
        <div className={styles.modalcontainer}>
            <h3>Language</h3>
            <div className={styles.inputcontainer}>
                <div>
                    <div style={{ "display": "flex" }}>
                        Mariage Status:
                        <label>
                            <input
                                type="radio"
                                name="options"
                                value="single"
                                checked={selectedOption === 'single'}
                                onChange={handleOptionChange}
                            />
                            single
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="options"
                                value="married"
                                checked={selectedOption === 'married'}
                                onChange={handleOptionChange}
                            />
                            married
                        </label>
                    </div>
                </div>
                <div>
                    <label>
                        Select a Birthday date:
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </label>
                    <p>Selected date: {selectedDate}</p>
                </div>
            </div>
            <button className={styles.btnAdd} onClick={(e) => handleAddClick(e)}>
                Edit
            </button>
        </div>

    )
}
export default PersonalInfoEditModal;