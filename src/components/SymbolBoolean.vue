<template>
    <div>
        <div class="symbol">
            <h2>Boolean</h2>
            <div class="symbol__container"
                 ref="symbolContainer">
                <svg :viewBox="symbol.attributes.viewBox"
                     ref="symbol"
                     class="symbol__svg"
                     v-html="symbol.content">
                </svg>
            </div>

            <div class="symbol__controls">
                <el-switch class="symbol__switch"
                           v-model="value"
                           active-color="#13ce66"
                           inactive-color="#ff4949"
                           active-text="True"
                           inactive-text="False">
                </el-switch>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        symbol: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            value: undefined
        }
    },

    watch: {
        value(val) {
            const booleans = this.$refs.symbol.getElementsByClassName('sBoolean');
            for (const c of booleans) {
                this.$emit('clean', c);
                this.$emit('append', c, val.toString());
            }
        }
    }
}
</script>

<style>

</style>
