import localStorage from '../lib/local-storage';

export default {
    // models stores
    // hold all entities by [id]:entity
    // projects: { 'project1id': { id: 'project1id', name: ... } }
    projects: {},
    techs: {},
    users: {},
    targets: {},

    currentProjectId: localStorage.getItem('currentProjectId'),

    targetTechsPage: {
        list: [],
        count: 0,
        pageSize: 16,
        targetId: null
    },

    userPicker: {
        value: '',
        users: [], // Array of strings suggested users ids

        symbol: Symbol('userPickerFetch'),
        fetchDelay: 500
    }
};

export const facets = {
    currentProject: {
        cursors: {
            id: ['currentProjectId'],
            projects: ['projects']
        },
        get: data => data.projects[data.id]
    },

    userPickerUsers: {
        cursors: {
            users: ['users'],
            list: ['userPicker', 'users']
        },
        get(data) {
            return data.list.map(id => data.users[id])
        }
    }
};