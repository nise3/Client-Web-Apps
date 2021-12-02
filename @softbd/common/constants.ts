export const APP_TITLE = 'NISE3 TMS';

export const PERMISSION_GROUP_ORGANIZATION_KEY = 'organization';
export const PERMISSION_GROUP_INSTITUTE_KEY = 'institute';
export const HIERARCHY_NODE_ID_PREFIX_STRING = 'm';

const isLocalHost = () => location.hostname === "localhost" || location.hostname === "127.0.0.1";

export const dashboardDomain = () => {
    return isLocalHost() ? 'http://localhost:3000' : 'http://123.49.47.38:3000'
}

export const niseDomain = () => {
    return isLocalHost() ? 'http://localhost:3001' : 'http://123.49.47.38:3001'
}

export const youthDomain = () => {
    return isLocalHost() ? 'http://localhost:3002' : 'http://123.49.47.38:3002'
}

export const instituteDomain = () => {
    return isLocalHost() ? 'http://localhost:3003' : 'http://123.49.47.38:3003'
}
