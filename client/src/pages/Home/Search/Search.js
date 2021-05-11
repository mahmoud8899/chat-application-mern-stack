import { Fragment, useState } from "react"



const Search = ({ history }) => {






    const [keyword, setKeyword] = useState('')

    const HandlSearch = e => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
           
        } else {
            history.push('/')
        }


    }
    return (
        <Fragment>
            <span className="only_search">
            <input
                className="_listUserInput"
                type="text"
                placeholder="Search Messenger"
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' ? HandlSearch(e) : null}

            />
            <i className="fas fa-search"></i>

            </span>

        </Fragment>
    )
}


export default Search