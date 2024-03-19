
import { IoSearchSharp } from 'react-icons/io5'
import '../styles/SearchBar.css'
import { IconContext } from 'react-icons'

export const SearchBar = ({ onSearch }) => {
    return (
        <div className="search-container">
            <div className="search-outline">
                <input
                    type="text"
                    placeholder="Search"
                    autoFocus
                    onChange={(event) =>
                        onSearch({ input: event.target.value.toLowerCase() })
                    }
                />
                <button className="search-btn">
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            className: 'search-icon',
                            color: '7B74E0',
                        }}>
                        <IoSearchSharp />
                    </IconContext.Provider>
                </button>
            </div>
        </div>
    )
}
