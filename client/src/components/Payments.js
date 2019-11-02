import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Payments extends React.Component {
    render() {
        debugger;
        return(

            <StripeCheckout 
            name="StartupFeedback"
            decription="$5 for 5 Email Credits"
            amount={500}
            token={token => this.props.handleToken(token)}
            stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
           
            >

            <button className="btn">
                ADD CREDITS
            </button>

            </StripeCheckout>
        );
    }
}

export default connect(null,actions)(Payments);