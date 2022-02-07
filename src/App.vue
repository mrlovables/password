<template>
    <q-layout view="hHh lpR lFf">
        <q-header reveal bordered class="bg-wuzhilv text-white">
            <q-toolbar>
                <q-btn flat round dense icon="menu" class="q-mr-sm" @click="left = !left" />
                <q-toolbar-title class="navTitle">
                    <strong>账号簿</strong>
                </q-toolbar-title>

                <q-btn flat round dense icon="search" class="q-mr-xs" v-if="urlName != 'add' && urlName != 'setting'" />
                <q-btn flat round dense icon="add_box" @click="add" style="margin-right: 5px" v-if="urlName != 'add'" />
                <q-btn
                    flat
                    round
                    dense
                    icon="settings"
                    @click="setting"
                    v-if="urlName == 'add'"
                    style="margin-right: 5px"
                />
                <q-btn flat round dense icon="home" @click="home" v-if="urlName == 'add' || urlName == 'setting'" />
            </q-toolbar>
        </q-header>

        <q-drawer :width="150" v-model="left" side="left" bordered behavior="desktop" class="left-slide">
            <q-list class="text-grey-7 shadow-1" style="max-width: 150px; width: 100%">
                <q-item class="justify-center">
                    <q-btn flat round dense icon="home" class="q-mr-xs icon-opacity" @click="home" />
                </q-item>
                <q-separator />
                <q-item class="justify-center">
                    <q-btn flat dense label="全部" class="q-mr-xs icon-opacity" @click="toGroup('全部')" />
                </q-item>
                <q-item v-for="(groupName, key) in groupNames" :key="key" class="justify-center">
                    <q-btn flat dense :label="groupName" class="q-mr-xs icon-opacity" @click="toGroup(groupName)" />
                </q-item>
                <q-separator />

                <q-item class="justify-center">
                    <q-btn flat round dense icon="settings" class="q-mr-xs icon-opacity" @click="setting" />
                </q-item>
                <q-separator />
                <!-- <q-item class="justify-center">
                    <q-btn flat round dense icon="light_mode" class="q-mr-xs icon-opacity" @click="dark" />
                </q-item>
                <q-separator />
                <q-item class="justify-center">
                    <q-btn flat round dense icon="dark_mode" class="q-mr-xs icon-opacity" @click="light" />
                </q-item>-->
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    name: "App",
    setup() {
        const store = useStore();
        return {
            urlName: computed(() => store.state.urlName),
            groupNames: computed(() => store.state.groupNames),
        };
    },
    data() {
        return {
            left: false,
        };
    },
    created() {},
    methods: {
        add() {
            this.$data.left = false;
            setTimeout(() => {
                this.$router.push("add");
            }, 100);
            // this.$router.push("add");
        },
        home() {
            this.$data.left = false;
            setTimeout(() => {
                this.$router.push("home");
            }, 100);
            // this.$router.push("home");
        },
        setting() {
            this.$data.left = false;
            setTimeout(() => {
                this.$router.push("setting");
            }, 100);
            // this.$router.push("setting");
        },
        toGroup(name) {
            this.$data.left = false;
            setTimeout(() => {
                this.$router.push({ name: "home", params: { group: name } });
            }, 100);
        },
        dark() {
            window.darkMode.toggle();
        },
        light() {
            window.darkMode.toggle();
        },
    },
};
</script>

<style scoped>
@import "./styles/customer.css";
</style>
