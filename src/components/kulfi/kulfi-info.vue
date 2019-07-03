<template>
    <b-col cols=12>
        <p class="info" >
            <b>Notification:</b>
            <ul class="info-list info-list-hidden" >
                <li v-for="item in info" :key="item.index">
                {{ item }}
                </li>
            </ul>
        </p>
    </b-col>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: "kulfi-info",
    props: {
        info: Array,
       
    },
    methods: {
        displayNotification: function() {
            var _options = <HTMLUListElement>document.querySelector('.info-list');

            var _classes = _options.className.match(/\S+/g) || [];
            var _display = _classes.indexOf("info-list-display");
            var _hidden = _classes.indexOf("info-list-hidden");


            if (_display < 0) {

                if(_hidden >= 0) {
                _classes.splice(_hidden, 1);
                }
                _classes.push("info-list-display");
                _options.className = _classes.join(" ");
                
            }

        },

    }
    
})
</script>






