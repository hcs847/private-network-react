import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MdGroupAdd } from "react-icons/md";
import { ADD_GROUP } from '../../utils/mutations';
import { GrClose } from 'react-icons/gr';

const GroupForm = ({ toggleGroupForm, showGroupForm }) => {
    // create a group
    const [addGroup, { error }] = useMutation(ADD_GROUP);

    // group form fields
    const [groupState, setGroupState] = useState({
        groupName: '',
        groupAdmin: '',
        groupImg: ''
    });

    const handleChangeGroupForm = async event => {
        event.preventdefault();
        try {
            await addGroup({
                variables: { ...groupState }
            });
            setGroupState({
                groupName: '',
                groupAdmin: '',
                groupImg: ''
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
                    {/* <div className="flex flex-between group-form__txt"> */}
                    <MdGroupAdd className='icons title center m-l-5' />
                    <p className='center group-form__title'>Create a group</p>
                    {/* </div> */}
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
                                onSubmit={handleChangeGroupForm}
                            >

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
