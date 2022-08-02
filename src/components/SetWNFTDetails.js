import CardSelecttoMint from "./cardSelecttoMint"
  
function SetWNFTDetails() {
   
    return ( 
            <section id="section-collections" className="pt30 pb30">
                <div className="container">
                <div className="col-lg-12 top-100">
                    <h2 className="style-2">The Citadef Council</h2>
                </div>
                <div className="row">
                    <CardSelecttoMint/>
                    <CardSelecttoMint/>
                    <CardSelecttoMint/>
                    <CardSelecttoMint/>

                </div>
    
                                
                </div>
            </section>
    )
}

export default SetWNFTDetails;