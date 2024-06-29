import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import css from './EditableInput.module.scss';
import ButtonIcon from '../buttons/button-icon/ButtonIcon';
import { mdiPencil } from '@mdi/js';

function EditableInput({ initialMinutes, initialSeconds, onSave, ...props }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const minutesRef = useRef(null);
    const secondsRef = useRef(null);

    function turnOnEditMode() {
        setIsEditMode(true);
        minutesRef.current.focus();
    }

    function handleSave() {
        const totalSeconds = (parseInt(minutes) * 60) + parseInt(seconds);
        setIsEditMode(false);
        onSave(totalSeconds);
    }

    return (
        <div style={props.style} className={`flex justify-between relative items-center ${css.wrapper}`}>
            <span className={css.input}>
                <input
                    ref={minutesRef}
                    type="number"
                    value={minutes}
                    readOnly={!isEditMode}
                    onClick={turnOnEditMode}
                    onChange={(e) => setMinutes(e.target.value)}
                    onBlur={handleSave}
                    placeholder="MM"
                    {...props}
                />
                :
                <input
                    ref={secondsRef}
                    type="number"
                    value={seconds}
                    readOnly={!isEditMode}
                    onClick={turnOnEditMode}
                    onChange={(e) => setSeconds(e.target.value)}
                    onBlur={handleSave}
                    placeholder="SS"
                    {...props}
                />
            </span>

            {!isEditMode && (
                <ButtonIcon
                    onClick={turnOnEditMode}
                    className={`hover:bg-gray-200 rounded-full ${css.button}`}
                    path={mdiPencil}
                    size={0.65}
                    color='grey'
                />
            )}
        </div>
    );
}

EditableInput.propTypes = {
    initialMinutes: PropTypes.number,
    initialSeconds: PropTypes.number,
    onSave: PropTypes.func.isRequired,
};

EditableInput.defaultProps = {
    initialMinutes: 0,
    initialSeconds: 0,
};

export default EditableInput;