function ConnectWalletButton(props){
    let button_text = "";

    if (!props.walletConnected)
        button_text = "Connect";
    else 
        button_text = "Connected";
    
    return (<a className="btn btn-main" onClick={props.connectEthWallet}><i className="icon_wallet_alt"></i><span>{button_text}</span></a>)
}


export default ConnectWalletButton;