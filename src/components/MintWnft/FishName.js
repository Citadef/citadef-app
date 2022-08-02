

const FishName =  props => {
    const FishNameChange = (e) => props.setNick(e.target.value);

    function inputClasses(error) {
        if (error)
            return "form-control fish-input is-invalid";
        else 
            return "form-control fish-input";

    }

    return (<div className="row g-3 ">
                <div>
                    <label className="col-form-label">Fish Name</label>
                </div>
                <div>
                    <input id="nick-input" className={inputClasses(props.nameError)} 
                                placeholder="Enter the fish name" onChange={FishNameChange} value={props.nick} />
                </div>
                <div className="col-auto">
                    <span className="form-text">
                    Maximum 30 characters long.
                    </span>
                </div>
            </div>)
}

export default FishName;
