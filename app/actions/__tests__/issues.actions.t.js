'use strict';

import { stub, spy, mock, match } from 'sinon';
import mockery from 'mockery';
import C from '../../constants';
import { Map, fromJS } from 'immutable';

describe('issuesActions', function() {
    const data = {
        results: [
            { id: 'id1', desc: 'desc 1' }
        ]
    };

    let actions = null;
    let loadForTarget = null;
    let dispatch = null;
    let apiMock = null;
    let issuesApi = null;

    beforeEach(() => {

        const issues = { then: (f) => f(data) };

        issuesApi = {
            list: () => false,
            update: () => ({
                catch: a => a()
            })
        };

        spy(issuesApi, 'update');

        apiMock = mock(issuesApi);
        apiMock.expects('list').once().returns(issues);
        mockery.registerMock('../lib/api3', {
            issues: apiMock.object
        });

        dispatch = spy();
        mockery.registerMock('../lib/disp', {
            dispatch: dispatch
        });

        mockery.registerAllowable('../issues.actions', true);
        actions = require('../issues.actions');
        loadForTarget = actions.loadForTarget;
    });

    //TODO test fetchOne

    describe('loadForTarget', function() {
        it('should dispatch new issues from api', function() {
            const target = 'targetId1';

            loadForTarget({ target });

            dispatch.should.have.been.calledWith(C.ISSUES_FETCH_SUCCESS, data);

            apiMock.verify();
        });
    });

    describe('updateFilter', function() {
        it('should dispatch ISSUES_UPDATE_FILTER with new filter', function() {
            const filter = Map();

            actions.updateFilter(filter);

            dispatch.should.be.calledWith(C.ISSUES_UPDATE_FILTER, filter);
        });
    });

    describe('updateSort', function() {
        it('should dispatch ISSUES_UPDATE_SORT with new sortBy', function() {
            const sortBy = 'created';

            actions.updateSort(sortBy);

            dispatch.should.be.calledOnce;
            dispatch.should.be.calledWith(C.ISSUES_UPDATE_SORT, sortBy);
        });
    });

    describe('toggleStatus', function() {
        const statusName = 'confirmed';
        const id = 'some id';
        const issue = fromJS({
            id,
            [statusName]: false
        });

        beforeEach(() => {
            actions.toggleStatus(issue, statusName);
        });

        it('should call api.issues.update with new status', function() {
            issuesApi.update.should.have.been.calledWithMatch({
                issueId: id,
                body: { [statusName]: true }
            });
        });

        it('should dispatch ISSUE_UPDATE_START', function() {
            dispatch.should.have.been.calledWith(C.ISSUE_UPDATE_START, {
                id,
                [statusName]: true
            });
        });

        it('should dispatch ISSUE_UPDATE_FAIL on api error', function() {
            dispatch.args[1].should.be.eql([
                C.ISSUE_UPDATE_FAIL, {
                    id,
                    [statusName]: false
                }
            ]);
        });
    });
});
