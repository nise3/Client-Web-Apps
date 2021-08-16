import * as localforage from "localforage";

const localSD = localforage.createInstance({
    driver: localforage.LOCALSTORAGE,
    name: 'reactStorage'
});

export default localSD;