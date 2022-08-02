
const FishDescription = props => {
    function inputClasses(error) {
        if (error)
            return "form-control fish-input fish-description is-invalid";
        else 
            return "form-control fish-input fish-description";

    }

    const FishDescriptionChange = (e) => props.setDesc(e.target.value)
    return (<div className="row g-3 ">
                <div>
                    <label className="col-form-label">Fish Description</label>
                </div>
                <div>
                    <textarea id="desc-input" rows="4" className={inputClasses(props.descError)} 
                    placeholder="Describe your fish" onChange={FishDescriptionChange} 
                    value={props.desc} />
                </div>
                <div className="col-auto">
                    <span className="form-text">
                    Maximum 500 characters long.
                    </span>
                </div>
            </div>)
}

export default FishDescription;