
const FishDescription = props => {
    const FishDescriptionChange = (e) => props.setDesc(e.target.value)
    return (<div className="row g-3 ">
                <div>
                    <label className="col-form-label">Fish Description</label>
                </div>
                <div>
                    <textarea id="desc-input" rows="4" className="form-control fish-input fish-description" 
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