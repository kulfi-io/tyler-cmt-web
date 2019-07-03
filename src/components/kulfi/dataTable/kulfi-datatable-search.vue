<template>
    <b-row >
        <b-col class="search">
            <b-input-group>
            <b-input-group-addon>
                <button class="btn shadow-none search-icon-btn" :id="`toggle-undo`" 
                data-display="hidden" v-on:click="clearSeachCriteria">
                    <i id="fa-clear" class="fas fa-undo fa-base" aria-hidden="true"></i>
                </button>
            </b-input-group-addon>
            <b-input
                id="search"
                ref="search"
                type="text"
                class="text-center"
                placeholder="Search"
            />
            <b-input-group-addon>
                <button class="btn shadow-none search-icon-btn" :id="`toggle-search`"  
                data-display="hidden" v-on:click="filterData">
                    <i id="fa-search" class="fas fa-search fa-base" aria-hidden="true"></i>
                </button>
            </b-input-group-addon>
            </b-input-group>
        </b-col>
    </b-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'kulfi-search',
    props: ['filterContent', 'resetFilter'],
    methods: {
        clearSeachCriteria: function() {
            var _search = <HTMLInputElement>this.$el.querySelector('#search');
            if(_search) {
                _search.value = '';
                this.resetFilter();
            }
        },
        filterData: function() {
            var _search = <HTMLInputElement>this.$el.querySelector('#search');
            if(_search && _search.value.trim() != '') {
                this.filterContent(_search.value.trim());
            }

        }
    }
})
</script>

<style lang="scss" scoped>
    $hover-scroll-color: #0B2747; //#0ba360;
    .search {
        z-index: 100;
        margin: 0 auto;

        .fa-base:hover {
            color: $hover-scroll-color;
        }
    }
</style>


