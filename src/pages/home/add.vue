<template>
    <div class="q-pa-md">
        <div class="content">
            <q-form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
                <div class="column account-form items-center">
                    <q-input
                        clearable
                        class="account-input"
                        color="wuzhilv"
                        v-model="accountName"
                        label="账号名"
                        lazy-rules
                        :rules="[
                            (val) => (val !== null && val !== '') || '* Required',
                            (val) => val.length >= 1 || '至少1位字符',
                            (val) => val.length <= 20 || '不能超过20位字符',
                        ]"
                    />
                    <q-input
                        clearable
                        class="account-input"
                        color="wuzhilv"
                        v-model="account"
                        label="账号"
                        :rules="[
                            (val) => !!val || '* Required',
                            (val) => val.length >= 1 || '至少1位字符',
                            (val) => val.length <= 40 || '不能超过40位字符',
                        ]"
                        lazy-rules
                    />
                    <q-item class="password">
                        <q-input
                            clearable
                            class="account-password"
                            color="wuzhilv"
                            v-model="password"
                            label="密码"
                            :rules="[
                                (val) => !!val || '* Required',
                                (val) => val.length >= 8 || '至少8位字符',
                                (val) => val.length <= 20 || '不能超过20位字符',
                            ]"
                            lazy-rules
                        />
                        <q-btn dense class="random-password" color="wuzhilv" label="生成密码" @click="createPwd" />
                    </q-item>

                    <q-input
                        clearable
                        class="account-input"
                        color="wuzhilv"
                        v-model="mark"
                        label="备注"
                        :rules="[
                            (val) => !!val || '* Required',
                            (val) => val.length >= 1 || '至少1位字符',
                            (val) => val.length <= 50 || '不能超过50位字符',
                        ]"
                        lazy-rules
                    />
                    <q-select
                        clearable
                        color="wuzhilv"
                        v-model="groupName"
                        :options="groupNames"
                        label="分组"
                        style="width: 350px"
                    />
                    <q-btn class="account-button" type="submit" color="wuzhilv" label="保&nbsp;&nbsp;存" />
                </div>
            </q-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.q-pa-md {
    padding: 0;
}
.content {
    width: 100%;
    min-width: 550px;
    padding: 15px 15px 15px 15px;
    // padding: 0;
    margin: 0;
    text-align: center;
}
.account-form {
    padding-top: 10px;
}
.account-input {
    width: 350px;
    max-width: 350px;
}
.password {
    height: 76px;
    padding: 0;
}
.account-password {
    width: 280px;
}
.random-password {
    width: 60px;
    margin-left: 10px;
    margin-top: 20px;
    height: 36px;
    font-size: 12px;
}
.account-button {
    min-width: 100px;
    margin-top: 25px;
}
</style>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import common from "@/utils/common";
import { computed } from "vue";
import { Notify } from "quasar";

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        store.commit("setUrlName", route.name);

        const accountName = ref(null);
        const account = ref(null);
        const password = ref(null);
        const mark = ref(null);
        const groupName = ref(null);

        const createPwd = () => {
            console.log(accountName.value);
            password.value = common.randomPassword();
        };

        const onSubmit = () => {
            let group = {
                accountName: accountName.value,
                account: account.value,
                password: password.value,
                mark: mark.value,
                groupName: groupName.value,
                time: common.getNow(),
            };
            console.log(group);

            store.commit("addGroupData", group);

            Notify.create({
                timeout: 2000,
                progress: true,
                color: "wuzhilv",
                textColor: "white",
                icon: "done",
                message: "添加成功",
                onDismiss: () => {
                    router.push("home");
                },
            });
        };

        return {
            accountName: accountName,
            account: account,
            password: password,
            mark: mark,
            groupName: groupName,

            groupNames: computed(() => store.state.groupNames),
            createPwd: createPwd,
            onSubmit: onSubmit,
        };
    },
    data() {
        return {};
    },

    computed: {},
    methods: {},
};
</script>
