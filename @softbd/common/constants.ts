export const APP_TITLE = 'NISE3 TMS';

export const PERMISSION_GROUP_ORGANIZATION_KEY = 'organization';
export const PERMISSION_GROUP_INSTITUTE_KEY = 'institute';
export const HIERARCHY_NODE_ID_PREFIX_STRING = 'm';

const isLocalHost = () => location.hostname === "localhost" || location.hostname === "127.0.0.1";

export const adminDomain = () => {
    return isLocalHost() ? 'http://localhost:3000' : 'https://admin.nise3.xyz'
}

export const niseDomain = () => {
    return isLocalHost() ? 'http://localhost:3001' : 'https://nise3.xyz'
}

export const youthDomain = () => {
    return isLocalHost() ? 'http://localhost:3002' : 'https://youth.nise3.xyz'
}

export const instituteDomain = () => {
    return isLocalHost() ? 'http://localhost:3003' : 'https://dyd.nise3.xyz'
}
