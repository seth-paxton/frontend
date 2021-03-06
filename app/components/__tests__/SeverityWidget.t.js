'use strict';

import { spy } from 'sinon';
import mockery from 'mockery';
import Fa from '../fa';
import Widget from '../widget';

describe('SeverityWidget', function() {
    const count = 6;
    const severity = 'high';

    let Component = null;
    let instance = null;

    beforeEach(function() {
        mockery.registerAllowable('../SeverityWidget', true);
        Component = require('../SeverityWidget');

        instance = TestUtils.renderIntoDocument(
            <Component count={count} severity={severity}/>
        );
    });

    describe('render', function() {
        it('should render count', function() {
            nodeByTag(instance, 'h1')[0].innerHTML
                .should.be.eql(count.toString());
        });

        it('should use bomb icon', () => {
            byType(instance, Fa)[0].props.icon
                .should.be.eql('exclamation-circle');
        });

        it('should use danger type', () => {
            byType(instance, Widget)[0].props.type
                .should.be.eql('danger');
        });
    });
});
