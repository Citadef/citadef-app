import React from "react";
import { withRouter } from "react-router-dom";

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      document.getElementById("header").scrollIntoView({behavior:"smooth"});
    }
  }

  render() {
    return null;
  }
}

export default withRouter(ScrollToTop);