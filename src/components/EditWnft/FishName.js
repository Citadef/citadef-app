const FishName = (props) => {
    const FishNameChange = (e) => props.setNick(e.target.value)
    return (<div className="row g-3 ">
                <div>
                    <label className="col-form-label">Fish Name</label>
                </div>
                <div>
                    <input id="nick-input" className="form-control fish-input" 
                                placeholder={props.nick} onChange={FishNameChange} value={props.nick} />
                </div>
                <div className="col-auto">
                    <span className="form-text">
                    Maximum 30 characters long.
                    </span>
                </div>
            </div>)
}

export default FishName