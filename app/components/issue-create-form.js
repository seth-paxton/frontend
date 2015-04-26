/**
 * IssueCreateForm
 */

'use strict';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { bindAll } from 'lodash';
import t from 'tcomb-form';
import { fromJS } from 'immutable';

import { Row, Col, Input, Button } from 'react-bootstrap';

const Form = t.form.Form;
const VulnType = t.enums({
    0: 'Not selected',
    1: 'Cool type',
    2: 'Wow!',
    3: 'Piy'
});
const Issue = t.struct({
    summary: t.Str,
    desc: t.maybe(t.Str),
    references: t.maybe(t.list(t.struct({
        url: t.Str,
        title: t.maybe(t.Str)
    }))),
    vulnType: VulnType
});

export default class IssueCreateForm extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'onSubmit',
            'onFormChange'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.onSubmit();
    }

    onFieldChange(e, field) {
        this.props.onChange(this.props.issue.set(field, e.target.value));
    }

    onFormChange(value) {
        this.props.onChange(this.props.issue.merge(value));
    }

    //region render
    render() {
        const { summary } = this.props.issue.toObject();
        const values = this.props.issue.toJS();
        const formOptions = {
            order: ['vulnType', 'summary', 'desc', 'references'],
            fields: {
                summary: {
                    label: iget('Summary'),
                    error: iget('Summary is required')
                },
                vulnType: {
                    nullOption: false
                },
                desc: {
                    type: 'textarea',
                    label: iget('Description')
                },
                references: {
                    disableOrder: true,
                    item: {
                        order: ['title', 'url'],
                        auto: 'placeholders'
                    }
                }
            }
        };

        formOptions.fields.summary.hasError = !summary.length;

        return <div>
            <Row>
                <Col xs={12} md={6}>
                    <Form type={Issue}
                          ref="form"
                          options={formOptions}
                          onChange={this.onFormChange}
                          value={values}/>

                    <Button onClick={this.onSubmit}
                            bsStyle="primary"
                            bsSize="large">
                        {iget('Save new issue')}
                    </Button>
                </Col>
                <Col xs={12} md={6}>
                    <h2>Vector</h2>
                </Col>
            </Row>
        </div>;
    }

    //endregion
}

IssueCreateForm.propTypes = {
    issue: Model,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};
/**
 * summary
 * desc
 * references
 * vulnType
 * target
 * vector
 */