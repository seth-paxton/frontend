/**
 * Component for render controls buttons (change issue status)
 * in issues-list
 */

'use strict';

//TODO make work with mocha
//import './issue-list-items-controls.less';

import { PropTypes, Component } from 'react/addons';
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { Model } from '../lib/types';
import { bindAll } from 'lodash';
import { greenColor, grayColor } from '../style';
import { toggleStatus } from '../actions/issues.actions';

import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Fa from './fa';

const icons = {
    confirmed: 'thumbs-up',
    'false': 'ban',
    muted: 'volume-off',
    resolved: 'check'
};
const controls = Object.keys(icons);

export default class IssueListItemsControls extends Component {
    constructor(props, context) {
        super(props, context);

        bindAll(this, [
            'renderControl'
        ]);

        this.shouldComponentUpdate = shouldComponentUpdate;
    }

    render() {
        const { style } = this.props;
        return <div style={style}>
            {controls.map(this.renderControl)}
        </div>;
    }

    onClick(status, e) {
        e.stopPropagation();

        toggleStatus(this.props.issue, status);
    }

    renderControl(status) {
        const isChecked = this.props.issue.get(status);
        const icon = icons[status];
        const tooltip = <Tooltip>Mark issue as {iget(status)}</Tooltip>;
        const style = {
            margin: 'auto 0.2rem'
        };

        const handler = this.onClick.bind(this, status);

        let className = 'c-issue-list-items-controls--control';
        if (isChecked) {
            //TODO add test
            className += ' c-issue-list-items-controls--active';
        }

        return <OverlayTrigger placement='bottom' overlay={tooltip}>
            <span style={style} onClick={handler} className={className}>
                <Fa icon={icon} size="lg" fw/>
            </span>
        </OverlayTrigger>;
    }
}

IssueListItemsControls.propTypes = {
    issue: Model,
    style: PropTypes.object
};

