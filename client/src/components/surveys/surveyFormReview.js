import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, field => {
        return(
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        );
    });

    return(
        <div>
            <h5> Please confirm your enteries!</h5>
                {reviewFields}
            <button 
                className="yellow white-text darken-3 btn-flat"
                onClick={onCancel}
            >
            Back
            </button>
            <button 
                className="green white-text btn-flat right"
                onClick={() => submitSurvey(formValues, history) } 
            >
            Send Survey
            <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state){
    return { 
        formValues: state.form.SurveyForm.value,
        submitSurvey: state.submitSurvey
     };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/index';

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, field => {
        return(
            <div key={field.name}>
                <label>{field.label}</label>
                <div>
                    {formValues[field.name]}
                </div>
            </div>
        );
    });

    return(
        <div>
            <h5> Please confirm your enteries!</h5>
                {reviewFields}
            <button 
                className="yellow white-text darken-3 btn-flat"
                onClick={onCancel}
            >
            Back
            </button>
            <button 
                className="green white-text btn-flat right"
                onClick={() => submitSurvey(formValues, history) } 
            >
            Send Survey
            <i className="material-icons right">email</i>
            </button>
        </div>
    );
}

function mapStateToProps(state){
    return { 
        formValues: state.form.SurveyForm.value,
        submitSurvey: state.submitSurvey
     };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));