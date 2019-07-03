<template>
    <b-row>
        <b-col class="foot">
            Page {{ (page() + 1) }} of {{ pages() }}
        </b-col>
    </b-row>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "kulfi-datatable-footer",
    props: ['page', 'pages']
})
</script>

<style lang="scss" scoped>
    $default-foot-active-color: #80a0c4; //#5e7c6f;
    .foot {
        white-space: nowrap;
        color: $default-foot-active-color;
    }
</style>


