<template>
    <div>
        <kulfi-datatable ref='table' :id="target"
        :sortContent="sortedContent"
        :defaultSort="defaultSort" :target="target"
        :filterContent="filterContent"
        /> 
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import KulfiDatatable from "../kulfi/data-table/kulfi-datatable.vue";

export default Vue.extend({
    name: "kulfi-table",
    data: function() {
        return {
            currentPage: 0,
            totalPages: 0,
            useDefaultSort: true,
            sortedBy: '',
            dataContent: Array<String>(),
            dataChuncked: [],
            filtered: Array<String>(),
            columns: Array<String>(),
        }
    },
    components: {
        KulfiDatatable,
    },
    mounted: function() {
        this.initContent();
    },
    props: ['target', 'content', 'defaultSort'],
    methods: {
        setColumns: function() {
            var _keys:string[] = [];

            if(this.dataContent.length) {
                _keys = Object.keys(this.dataContent[0]);
            }
            
            this.columns = _keys;
        },
        isSortValueNumeric: function(item: string): boolean {
            var _alpha = /[a-zA-Z]/;
            var _numeric = /[0-9]/;
            
            return _numeric.test(item) && !_alpha.test(item);
        },
        isSortValueAlphaNumeric: function(item: string): boolean {
            var _alpha = /[a-zA-Z]/;
            var _numeric = /[0-9]/;

            return _numeric.test(item) && _alpha.test(item);
        },
        alphaNumericCheckASC: function(item: string, item1: string) {
            var _alpha = /[^a-zA-Z]/g;
            var _numeric = /[^0-9]/g;

            var _stripAlphaItem = item.replace(_alpha, "");
            var _stripAlphaItem1 = item1.replace(_alpha, "");

            if(_stripAlphaItem === _stripAlphaItem1) {

                var _parseItem = parseInt(item.replace(_numeric, ""), 10);
                var _parseItem1 = parseInt(item1.replace(_numeric, ""), 10);
                
                return _parseItem === _parseItem1 ? 0
                    : _parseItem > _parseItem1 ? 1 : -1;

            } else {

                return _stripAlphaItem > _stripAlphaItem1 ? 1
                    : -1;
            }

        },
        alphaNumericCheckDSC: function(item: string, item1: string) {
            var _alpha = /[^a-zA-Z]/g;
            var _numeric = /[^0-9]/g;

            var _stripAlphaItem = item.replace(_alpha, "");
            var _stripAlphaItem1 = item1.replace(_alpha, "");

            if(_stripAlphaItem === _stripAlphaItem1) {

                var _parseItem = parseInt(item.replace(_numeric, ""), 10);
                var _parseItem1 = parseInt(item1.replace(_numeric, ""), 10);

                return _parseItem === _parseItem1 ? 0
                    : _parseItem < _parseItem1 ? 1 : -1; 

            } else {

                return _stripAlphaItem < _stripAlphaItem1 ? 1
                    : -1;
            }
        },
        propComparatorDSC: function(criteria: string ) {
            var _self = this;

            return function(item: string, item1: string) {

                var _sItem = JSON.stringify(item);
                var _sItem1 = JSON.stringify(item1);
                
                var _compareItem = JSON.parse(_sItem)[criteria];
                var _compareItem1 = JSON.parse(_sItem1)[criteria];

                if(_self.isSortValueNumeric(_compareItem) && _self.isSortValueNumeric(_compareItem1))
                {

                    return _compareItem1 - _compareItem;

                } else {

                    if(_self.isSortValueAlphaNumeric(_compareItem)) {

                        return _self.alphaNumericCheckDSC(_compareItem, _compareItem1)
                    
                    } else {

                        if(_compareItem > _compareItem1) return -1;
                        if(_compareItem < _compareItem1) return 1;
                    }
                }

                return 0;

            }
        },
        propComparatorASC: function(criteria: string ) {
            var _self = this;

            return function(item: string, item1: string) {

                var _sItem = JSON.stringify(item);
                var _sItem1 = JSON.stringify(item1);

                var _compareItem = JSON.parse(_sItem)[criteria];
                var _compareItem1 = JSON.parse(_sItem1)[criteria];
                
                if(_self.isSortValueNumeric(_compareItem) && _self.isSortValueNumeric(_compareItem1))
                {
                    return _compareItem - _compareItem1;
                } else {


                    if(_self.isSortValueAlphaNumeric(_compareItem)) {
                        return _self.alphaNumericCheckASC(_compareItem, _compareItem1)
                    } else {
                        if(_compareItem < _compareItem1) return -1;
                        if(_compareItem > _compareItem1) return 1;
                    }
                }

                return 0;
            }
        },
        initContent: function() {
            var _self= this;
        
            if(this.$parent.$data.dataset.length == 0) {
                const getContent = function() {
                    var _promise = new Promise((resolve, reject) => {

                        _self.content();
                        var _data = _self.$parent.$data;
                        setTimeout(() => {

                            if((_data.dataset && _data.dataset.length > 0)) {
                                return resolve();
                            } else {
                                return reject();
                            }

                        }, 1300);

                    });

                    return _promise;
                }


                getContent()
                .then(() => {
                    _self.sortedContent(this.defaultSort, 'asc');
                });
            }
        },
        sortedContent: function(criteria: string , order: string="asc", usefiltered: boolean = false) {
            
            this.sortedBy = criteria;
            var _criteria = null;

            if(usefiltered == false) this.filtered = [];

            if(order.toLowerCase() === 'dsc') {
                _criteria = this.propComparatorDSC(criteria)
            } else {
                _criteria = this.propComparatorASC(criteria)
            }
             
            var _items = this.$parent.$data.dataset as string[];


            if(usefiltered && this.filtered.length) {
                _items = this.filtered as string[];
            }

            var _sorted = _items.sort(_criteria);

            this.chunkedContent(_sorted);

        },
        chunkedContent: function(data: string[], size: number = 10) {
            this.dataChuncked = [];
            
            for(let i = 0; i < data.length; i += size ) {
                var _data = data.slice(i, i + size);
                this.dataChuncked.push(_data as never)
            }

            this.totalPages = this.dataChuncked.length ? this.dataChuncked.length : 0;
            this.dataContent = this.dataChuncked[this.currentPage];
            this.setColumns();
            
        },
        filterContent: function(criteria: string) {
            var _self = this;
            this.currentPage = 0;

            var _items = _self.$parent.$data.dataset as string[];

            for(let i =0; i  < _items.length; i ++) {
                var _item = _items[i];
                var _sItem = JSON.stringify(_item);
                var _parseItem = JSON.parse(_sItem);


                for(let j=0; j < _self.columns.length; j++) {
                
                    var _column = _self.columns[j] as string;
                    var _columnVal = _parseItem[_column] as string;

                    if(_columnVal && criteria ) {
                        var _check = new RegExp(criteria);
                        if(_check.test(_columnVal)) {
                            this.filtered.push(_item);
                            break;
                        }
                    }
                }
            }

            this.chunkedContent(this.filtered as string[]);

        }
    }
    
})
</script>

