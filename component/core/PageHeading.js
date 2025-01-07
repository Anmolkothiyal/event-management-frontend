import React from 'react'

const PageHeading = (props) => {
    const {
        heading = "",
        subHeading = "",
        dashboardCommentsLength = "",

        showSearchInput = true,
        placeholder = "Search",
        searchClassName = "",
        searchQuery = "",
        setSearchQuery = () => { },

        className = "",
        btns = [],
        buttons = [],
        searchBtns = [],
        bypassSecurity = false
    } = props
    return (
        <div className={`page-heading-container ${className}`}>
            <div className="page-heading">
                <div>
                    <h2>{heading}</h2>
                    {subHeading && <p>{subHeading}</p>}
                </div>

                <div className='action-btns'>
                        {btns?.map((btn, idx) => {
                            return (
                                <button className={`page-heading-action-btn ${btn.className || ""}`}
                                    key={`${heading}_page-heading-action-btn__${idx}`}
                                    onClick={btn.onClick}
                                >
                                    {btn.icon && <img src={btn.icon} alt={btn.label} />}
                                    {btn.label}
                                </button>
                            )
                        })}
                    </div>
            </div>
            <hr />
        </div>
    )
}

export default PageHeading