<template>
    <div class="q-pa-md">
        <div class="content row">
            <div class="col-6">
                <div class="row">
                    <div class="col-9">
                        <h6 class="text-grey-7">分组排序</h6>
                    </div>
                    <div class="col-3">
                        <q-btn class="add-nav" color="wuzhilv" flat round icon="add_box" @click="prompt = true" />
                        <q-dialog v-model="prompt" persistent>
                            <q-card style="min-width: 350px">
                                <q-card-section>
                                    <div class="text-h6 text-grey-7">分组名</div>
                                </q-card-section>

                                <q-card-section class="q-pt-none">
                                    <q-input
                                        color="wuzhilv"
                                        clearable
                                        dense
                                        autofocus
                                        v-model="groupName"
                                        @keyup.enter="prompt = false"
                                        :rules="[(val) => (val.length <= 8 && val.length >= 1) || '不能超过8位字符']"
                                    />
                                </q-card-section>

                                <q-card-actions align="right" class="text-primary">
                                    <q-btn flat color="wuzhilv" label="取消" v-close-popup />
                                    <q-btn flat color="wuzhilv" label="添加" @click="addGroup" v-close-popup />
                                </q-card-actions>
                            </q-card>
                        </q-dialog>
                    </div>
                </div>
                <draggable
                    class="list-group text-grey-7"
                    item-key="order"
                    tag="transition-group"
                    :component-data="{ tag: 'ul', name: 'flip-list', type: 'transition' }"
                    v-model="groupNames"
                    @start="isDragging = true"
                    @end="isDragging = false"
                    @change="move"
                >
                    <template #item="{ element, index }">
                        <div class="row">
                            <div class="col-11">
                                <q-card class="row">
                                    <div class="col-10 nav-name">
                                        {{ index + 1 }}.
                                        {{ element }}
                                    </div>
                                    <q-icon class="col-2 nav-icon" name="open_with" />
                                </q-card>
                            </div>

                            <div class="col-1">
                                <q-icon
                                    size="18px"
                                    class="col-2 nav-icon nav-icon-delete"
                                    name="delete"
                                    @click="delGroup(element)"
                                />
                            </div>
                        </div>
                    </template>
                </draggable>

                {{ myList }}
            </div>

            <div class="col-6 setting-group">
                <h6 class="text-grey-7">密码生成设置</h6>
                <div class="column items-start">
                    <q-option-group
                        class="text-grey-7"
                        v-model="group"
                        :options="options"
                        color="wuzhilv"
                        type="toggle"
                        keep-color
                    />
                    <div class="text-grey-7 slider-box">
                        <span>密码长度: {{ standard }}</span>
                        <q-slider
                            v-model="standard"
                            :min="8"
                            :max="20"
                            color="wuzhilv"
                            snap
                            label
                            style="margin-top: 5px"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.q-pa-md {
    padding: 0;
}
.content {
    width: 100%;
    min-width: 550px;
    padding: 15px 15px 15px 15px;
    // padding: 0;
    margin: 0;
    // text-align: center;
}
.slider-box {
    margin-top: 5px;
    margin-left: 17px;
    width: 180px;
}
.slider-box span {
    margin-left: -5px;
    padding-bottom: 10px;
}
.add-nav {
    margin-top: -5px;
    margin-right: 8px;
    float: right;
}
.nav-name {
    padding: 10px 10px 10px 20px;
}
.nav-icon {
    margin-top: 13px;
}
.nav-icon-delete {
    margin-left: 9px;
}
.list-group {
    margin: 5px;
    padding: 0px 15px 0px 0px;
}
.setting-group {
    padding-left: 15px;
}
h6 {
    margin: 0 0 25px 10px;
    padding: 0 !important;
}
</style>

<script>
import draggable from "vuedraggable";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
    components: {
        draggable,
    },
    setup() {
        const route = useRoute();
        const store = useStore();

        store.commit("setUrlName", route.name);

        return {
            groupNames: computed(() => store.state.groupNames),
        };
    },
    data() {
        return {
            prompt: false,
            drag: false,
            groupName: "",
            standard: 8,
            group: [1, 2, 3, 4],
            // myList: groupNames.map((name) => {
            //     return name;
            // }),
            options: [
                {
                    label: "包含大写字母",
                    value: 1,
                },
                {
                    label: "包含小写字母",
                    value: 2,
                },
                {
                    label: "包含数字",
                    value: 3,
                },
                {
                    label: "包含特殊字符",
                    value: 4,
                },
            ],
        };
    },

    computed: {},
    methods: {
        move(event) {
            console.log(this.$store.state.groupNames);
            console.log(event);

            this.$store.commit("sortGroup", event);
            this.$store.commit("setGroupNames", this.$store.state.groupData);
        },
        // ...mapMutations(["sortGroup"]),
        addGroup() {
            this.$store.commit("addGroup", this.$data.groupName);
            this.$store.commit("setGroupNames", this.$store.state.groupData);
        },
        delGroup(element) {
            this.$store.commit("delGroup", element);
            this.$store.commit("setGroupNames", this.$store.state.groupData);
        },
    },
};
</script>
