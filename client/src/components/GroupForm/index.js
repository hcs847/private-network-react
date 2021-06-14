import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MdGroupAdd } from "react-icons/md";
import { ADD_GROUP } from '../../utils/mutations';
import { GrClose } from 'react-icons/gr';

const GroupForm = ({ toggleGroupForm, showGroupForm }) => {
    // group form fields
    const [groupState, setGroupState] = useState({ groupName: '' });

    // create a group
    const [addGroup, { error }] = useMutation(ADD_GROUP);


    const handleChangeGroupForm = (event) => {
        setGroupState({
            ...groupState,
            groupName: event.target.value
        });
    };

    const handleSubmitGroupForm = async event => {
        event.preventDefault();
        try {
            await addGroup({ variables: { groupName: groupState.groupName } });
            setGroupState({
                groupName: ''
            });
            toggleGroupForm();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="group-form flex flex-center card">
                <button className="flex flex-between group-form__btn"
                    type='button'
                    onClick={toggleGroupForm}>
                    <MdGroupAdd className='icons title center m-l-5' />
                    <p className='center group-form__title'>Create a group</p>
                </button>
                {showGroupForm && (
                    <div className="modal-overlay">
                        <div className="form-modal">
                            <div className="flex flex-around">
                                <h3 className='form-title'>Create a Group</h3>
                                <button
                                    type='button'
                                    className='icons icon-x'
                                    onClick={toggleGroupForm}
                                ><GrClose /></button>
                            </div>
                            <form className={`flex flex-columns ${!showGroupForm ? 'no-display' : ''}`}
                                onSubmit={handleSubmitGroupForm}
                            >
                                <div className="flex flex-between">
                                    <label htmlFor="groupName">Group name</label>
                                    <input
                                        type="text"
                                        name="groupName"
                                        value={groupState.groupName}
                                        onChange={handleChangeGroupForm}
                                    />
                                </div>
                                <button className='btn'>Submit</button>
                                {error && <p>There was a problem with submiting your request.</p>}
                            </form>
                        </div>
                    </div>
                )
                }
            </div>
        </>
    )
}

export default GroupForm
