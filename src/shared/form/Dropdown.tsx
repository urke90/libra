import { useState } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import { IAuthors } from '../../ts/authors';

import './Dropdown.scss';

interface ISelectProps {
    onClick: (id: number) => void;
    items: IAuthors[];
}

const Dropdown: React.FC<ISelectProps> = ({ onClick, items }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const arrow = showDropdown ? (
        <AiOutlineArrowUp className="dropdown__arrow" />
    ) : (
        <AiOutlineArrowDown className="dropdown__arrow" />
    );

    const handleShowDropdown = () =>
        setShowDropdown((prevShowState) => !prevShowState);

    const handleChooseAuthor = (
        e: React.MouseEvent<HTMLLIElement, MouseEvent>,
        id: number
    ) => {
        e.stopPropagation();
        setShowDropdown(false);
        onClick(id);
    };

    return (
        <div className="dropdown" onClick={handleShowDropdown}>
            <span className="dropdown__placeholder">Filter by author name</span>
            {arrow}
            {showDropdown && (
                <ul className="dropdown__list">
                    <li
                        key={'all-authors'}
                        className="dropdown__item"
                        onClick={(e) => handleChooseAuthor(e, 0)}
                    >
                        All Authors
                    </li>
                    {items.length
                        ? items.map(({ id, name }) => (
                              <li
                                  key={name}
                                  className="dropdown__item"
                                  onClick={(e) => handleChooseAuthor(e, id)}
                              >
                                  {name}
                              </li>
                          ))
                        : null}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
