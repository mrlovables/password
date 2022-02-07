import db from "@/utils/db";
import lodash from "lodash";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import common from "@/utils/common";

db.read();
db.chain = lodash.chain(db.data);

let _groupData = db.chain.get("groupData").value();
let groupNames = [];
for (const key in _groupData) {
    if (Object.hasOwnProperty.call(_groupData, key)) {
        // const element = _groupData[key];
        groupNames.push(key);
    }
}
let _unGroupData = db.chain.get("unGroupData").value();

export default createStore({
    // plugins: [createPersistedState({ storage: window.sessionStorage })],
    plugins: [
        createPersistedState({
            overwrite: true,
        }),
    ],
    state: {
        homePath: "",
        urlName: "home",
        winSize: [],
        pwdLen: 8,
        pwdType: 4,
        groupNames: groupNames,
        groupData: _groupData || {},
        unGroupData: _unGroupData || [],
    },
    mutations: {
        syncDb(state) {
            db.read();
            state.groupData = db.data.groupData;
            state.unGroupData = db.data.unGroupData;
        },
        setWinSize(state, _winSize) {
            state.winSize = _winSize;
        },
        setUrlName(state, _urlName) {
            state.urlName = _urlName;
        },
        setPwdLen(state, _pwdLen) {
            state.pwdLen = _pwdLen;
        },
        setPwdType(state, _pwdType) {
            state.pwdType = _pwdType;
        },
        setHomePath(state, _homePath) {
            state.homePath = _homePath;
        },
        setGroupNames(state, groupData) {
            var _groupNames = [];
            for (const key in groupData) {
                if (Object.hasOwnProperty.call(groupData, key)) {
                    _groupNames.push(key);
                }
            }
            state.groupNames = _groupNames;
        },
        addGroupData(state, group) {
            let groupName = group.groupName;
            delete group.groupName;
            if (groupName == null) {
                state.unGroupData.push(group);
            } else {
                state.groupData[groupName].push(group);
            }
            db.data.groupData = state.groupData;
            db.data.unGroupData = state.unGroupData;
            db.write();
        },
        addGroup(state, groupName) {
            if (state.groupData[groupName] === undefined) {
                state.groupData[groupName] = [];
                db.data.groupData = state.groupData;
                db.write();
            }
        },
        delGroup(state, groupName) {
            if (state.groupData[groupName] !== undefined) {
                for (const key in state.groupData[groupName]) {
                    if (Object.hasOwnProperty.call(state.groupData[groupName], key)) {
                        const element = state.groupData[groupName][key];
                        state.unGroupData.push(element);
                    }
                }
                delete state.groupData[groupName];
                db.data.groupData = state.groupData;
                db.data.unGroupData = state.unGroupData;
                db.write();
            } else {
                delete state.groupData[groupName];
            }
        },
        sortGroup(state, event) {
            // let groupData = state.groupData;
            let _groupNames = common.swapArray(state.groupNames, event.moved.oldIndex, event.moved.newIndex);
            console.log(_groupNames);

            let _groupData = {};
            for (const key in _groupNames) {
                _groupData[_groupNames[key]] = state.groupData[_groupNames[key]];
            }
            state.groupNames = _groupNames;
            state.groupData = _groupData;

            db.data.groupData = state.groupData;
            db.write();
            // if (state.groupData[groupName] === undefined) {
            //     state.groupData[groupName] = [];
            //     db.data.groupData = state.groupData;
            //     db.write();
            // }
        },
    },
});
