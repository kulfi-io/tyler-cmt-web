<template>
    <div>
        <kulfi-search :filterContent="filterContent" :resetFilter="resetFilter" />
        <div class="table-responsive-sm  base-table">
            <table  class="table table-striped table-hover table-sm ">
                <kulfi-heading :heading="heading" 
                :defaultSort="defaultSort" :sortContent="sortContent"
                />
                <kulfi-body-content :dataContent="getDataContent" 
                :columns="heading" />
            </table>
            <kulfi-footer :page="getCurrentPage" :pages="getTotalPages"/>
        </div>
        <kulfi-scroll :scrollPosition="scrollPosition" :next="nextPage" :previous="previousPage"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import KulfiSearch from "./kulfi-datatable-search.vue";
import KulfiHeading from "./kulfi-datatable-thead.vue";
import KulfiBodyContent from "./kulfi-datatable-tbody.vue";
import KulfiFooter from "./kulfi-datatable-footer.vue";
import KulfiScroll from "./kulfi-datatable-scroller.vue";



export default Vue.extend({
    name: 'kulfi-data-table',
    props: ['defaultSort', 'filterContent', 
    'sortContent', 'target'],
    components: {
        KulfiSearch,
        KulfiHeading,
        KulfiBodyContent,
        KulfiFooter,
        KulfiScroll
    },
    methods: {
        heading: function() {
            return this.$parent.$data.columns;
        },
        getDataContent: function() {
            var _content = this.$parent.$data.dataContent;
            return _content;
        },
        getCurrentPage: function() {
            var _page = this.$parent.$data.currentPage;
            return _page;
        },
        getTotalPages: function() {
            var _pages = this.$parent.$data.totalPages;
            return _pages;
        },
        resetFilter: function() {
            this.sortContent(this.defaultSort, 'asc', false);
            var _ordered = <HTMLSpanElement>this.$el.querySelector('.ordered');
            var _default = <HTMLSpanElement>this.$el.querySelector(`.sort-${this.defaultSort}`);

            if(_ordered) {
                var _rotate = _ordered.querySelector('.rotate');
                _ordered.classList.remove('ordered')
                
                if(_rotate) {
                    _rotate.classList.remove('rotate');
                    _rotate.classList.remove('asc');
                }
            }

            if(_default) {
                var _fa = _default.querySelector('.fas');
                _default.classList.add('ordered');

                if(_fa) {
                    _fa.classList.add('rotate');
                    _fa.classList.add('asc');
                }
            }
        },
        tableContainer: function() {
            return <HTMLElement>this.$parent.$el.querySelector(`#${this.target}`);
        },
        scrollPosition: function(e: Event) {
            var _item = <HTMLElement>e.currentTarget;
            if(_item) {
                var _container = this.tableContainer();

                if(_container) {
                    var _table = <HTMLDivElement>_container.querySelector('.base-table');

                    if(_table) {

                        if(_item.className.indexOf('left') > 0) {
                            _table.scrollLeft -= 25;
                        }

                        if(_item.className.indexOf('right') > 0) {
                            _table.scrollLeft += 25;
                        }

                    }
                    
                }
            }
        },
        nextPage: function(e: Event) {
            
            if(this.$parent.$data.currentPage == (this.$parent.$data.totalPages - 1)) {
                return false;
            } else  {
                this.$parent.$data.currentPage += 1;
                this.$parent.$data.dataContent = 
                    this.$parent.$data.dataChuncked[this.getCurrentPage()];
            }

            return;
        },
        previousPage: function(e: Event) {

            if(this.$parent.$data.currentPage == 0) {
                return false;
            } else  {
                this.$parent.$data.currentPage -= 1;
                this.$parent.$data.dataContent = 
                    this.$parent.$data.dataChuncked[this.getCurrentPage()];
            }

            return;
        },
        
    }
})
</script>

<style lang="scss" scoped>
    .base-table {
        overflow: auto;
    }

</style>




