<template>
    <div class="q-pa-md">
        <c-scrollbar
            trigger="hover"
            :vBarStyle="{
                'background-color': 'rgba(0,0,0,0.1)',
            }"
            :vThumbStyle="{
                'background-color': '#69a794',
            }"
            class="scroller"
            :style="{ height: winSize[1] + 'px' }"
        >
            <div class="content">
                <div class="text-grey-7 nav-title">
                    {{ this.$route.params.group || "全部" }}
                </div>
                <q-separator color="wuzhilv" style="margin-bottom: 10px" />
                <div class="row q-col-gutter-md justify-start" v-if="all.length">
                    <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6" v-for="(ele, key) in all" :key="ele">
                        <q-expansion-item
                            group="somegroup"
                            class="shadow-1 overflow-hidden"
                            style="border-radius: 10px"
                            @show="startCounting"
                            @hide="stopCounting"
                            header-class="bg-wuzhilv text-white"
                            expand-icon-class="text-white"
                            expand-icon-toggle
                        >
                            <template v-slot:header>
                                <q-item-section avatar>
                                    <!-- <q-avatar icon="explore" color="teal" text-color="white" /> -->
                                    <q-btn flat round dense :label="ele.accountName" class="teal" />
                                </q-item-section>

                                <q-item-section>
                                    <div class="row justify-end">
                                        <q-btn
                                            flat
                                            round
                                            dense
                                            icon="mode"
                                            size="10px"
                                            class="teal"
                                            @click="edit(ele, key)"
                                        />
                                        <q-btn flat round dense icon="delete" size="10px" class="teal" />
                                    </div>
                                </q-item-section>
                            </template>
                            <q-card class="panel-card text-grey-8">
                                <q-card-section>
                                    <div class="row">
                                        <div class="col-sm-4 col-xs-4 col-md-4 account-name">
                                            账&nbsp;&nbsp;&nbsp;&nbsp;号 :
                                        </div>
                                        <div class="col-sm-8 col-xs-8 col-md-8 account-name-str">{{ ele.account }}</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-4 col-xs-4 col-md-4 account-name" style="padding-top: 9px">
                                            密&nbsp;&nbsp;&nbsp;&nbsp;码 :
                                        </div>
                                        <div class="col-sm-8 col-xs-8 col-md-8 account-password">
                                            <q-input
                                                v-model="ele.password"
                                                :type="ele.isPwd ? 'password' : 'text'"
                                                hide-hint
                                                dense
                                                borderless
                                                readonly
                                                :input-style="{ color: '#616161' }"
                                            >
                                                <template v-slot:append>
                                                    <q-icon
                                                        :name="ele.isPwd ? 'visibility_off' : 'visibility'"
                                                        class="cursor-pointer"
                                                        @click="ele.isPwd = !ele.isPwd"
                                                        size="16px"
                                                    />
                                                </template>
                                            </q-input>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-4 col-xs-4 col-md-4 account-name">
                                            备&nbsp;&nbsp;&nbsp;&nbsp;注 :
                                        </div>
                                        <div class="col-sm-8 col-xs-8 col-md-8 account-name-str">{{ ele.mark }}</div>
                                    </div>
                                </q-card-section>
                                <q-separator />
                                <q-card-actions>
                                    <div class="row justify-around action-button">
                                        <q-btn
                                            flat
                                            unelevated
                                            text-color="grey-8"
                                            class="col-5"
                                            @click="copy(ele.account)"
                                            >复制账号</q-btn
                                        >
                                        <q-separator vertical />
                                        <q-btn
                                            flat
                                            unelevated
                                            text-color="grey-8"
                                            class="col-5"
                                            @click="copy(ele.password)"
                                            >复制密码</q-btn
                                        >
                                    </div>
                                </q-card-actions>
                            </q-card>
                        </q-expansion-item>
                    </div>
                </div>
                <div v-else class="row no-data justify-center items-center">
                    <div class="col-3 text-grey-7">
                        <div>
                            <q-icon size="70px" color="grey-5" name="assignment" />
                        </div>
                        <div style="font-size: 12px">没有数据</div>
                    </div>
                </div>
            </div>
        </c-scrollbar>
    </div>
</template>

<script>
import { CScrollbar } from "c-scrollbar";
import { onMounted } from "@vue/runtime-core";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import lodash from "lodash";
import common from "@/utils/common";
// import { watch } from "original-fs";
import { clipboard } from "electron";
import { Notify } from "quasar";

export default {
    components: {
        CScrollbar,
    },
    props: {},
    setup() {
        const store = useStore();
        const route = useRoute();

        store.commit("setUrlName", route.name);

        const _resizeMain = ref([800, 520]);
        if (store.state.winSize[1] === undefined) {
            store.commit("setWinSize", _resizeMain);
        }

        window.ipcRenderer.on("resized", (event, message) => {
            message[1] = message[1] - 80;
            _resizeMain.value = message;
            store.commit("setWinSize", _resizeMain);
        });

        window.ipcRenderer.on("destroyed", (event, message) => {
            message[1] = message[1] - 80;
            store.commit("setWinSize", message);
            store.commit("syncDb");
        });

        onMounted(() => {});

        return {
            winSize: computed(() => store.state.winSize),
        };
    },
    created() {},
    mounted() {},
    computed: {},
    data() {
        let groupData = this.$store.state.groupData;
        let unGroupData = this.$store.state.unGroupData;

        this.$watch(
            () => this.$route.params,
            async (newParams) => {
                if (this.$route.name == "home") {
                    if (newParams.group != undefined) {
                        if (newParams.group == "全部") {
                            this.$data.all = lodash.orderBy(common.getAllData(groupData, unGroupData), "time", "desc");
                        } else {
                            this.$data.all = lodash.orderBy(groupData[newParams.group], "time", "desc");
                        }
                    }
                }
            }
        );

        let all = [];
        if (
            this.$route.params.group == undefined ||
            this.$route.params.group == "" ||
            this.$route.params.group == "全部"
        ) {
            all = lodash.orderBy(common.getAllData(groupData, unGroupData), "time", "desc");
        } else {
            all = lodash.orderBy(groupData[this.$route.params.group], "time", "desc");
        }

        return {
            all: all,
            groupData: groupData,
            unGroupData: unGroupData,
        };
    },
    methods: {
        edit(ele, key) {
            alert(ele);
            alert(key);
        },
        copy(str) {
            clipboard.writeText(str, "selection");
            Notify.create({
                timeout: 500,
                progress: true,
                color: "wuzhilv",
                textColor: "white",
                icon: "done",
                message: "复制成功",
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.navTitle {
    text-align: center;
}
.scroller {
    width: 100%;
    height: 400px;
}
.content {
    width: 100%;
    min-width: 550px;
    padding: 15px 15px 15px 15px;
    // padding: 0;
    margin: 0;
}
.panel-card {
    overflow: hidden;
}
.action-button {
    width: 100%;
}
.account-name {
    text-align: center;
}
.account-name-str {
    padding-left: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.nav-title {
    margin-bottom: 6px;
    font-size: 15px;
}
.no-data {
    height: 300px;
    text-align: center;
}
.q-pa-md {
    padding: 0;
}
.q-separator {
    border: 0;
    background: rgb(0 0 0 / 7%);
    margin: 0;
}
.q-field__control {
    height: 24px !important;
}
.q-field__marginal {
    height: 24px !important;
}
</style>
<style>
.q-item__section--main ~ .q-item__section--side {
    padding-right: 0 !important;
    padding-left: 0 !important;
}
</style>
