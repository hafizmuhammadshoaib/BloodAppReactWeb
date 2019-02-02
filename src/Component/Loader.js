import React, { Component } from "react";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";

class Loader extends Component{
    render(){
        return(

        <div style={{flexGrow:1}} >
           <Fade in={this.props.isLoading} unmountOnExit>
            
            <LinearProgress color="secondary" />
          </Fade>
         </div>

        )
    }
}
const mapStateToProps = state => {
    console.log(state);
    return {
      
      isLoading: state.AuthReducer.isLoading,
      
    };
  };
export default connect(
    mapStateToProps,
    null
  )(Loader);