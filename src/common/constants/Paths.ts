import jetPaths from 'jet-paths';

const Paths = {
    _: '/api',
    Users: {
        _: '/users',
        Get: '/all',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Openings: {
        _: '/openings',
        GetAll: '/all',
        GetOne: '/:id',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
    Variations: {
        _: '/variations',
        GetAll: '/all',
        GetOne: '/:id',
        Add: '/add',
        Update: '/update',
        Delete: '/delete/:id',
    },
} as const;

export const JetPaths = jetPaths(Paths);
export default Paths;
