<template>
    <div id="t-ddl" ref="t-ddl">
        <p class="control">
            <b-input-group>
                <b-input id="input-dropdown" ref="search" data-value=""
                class="input-dropdown" />
                <b-input-group-addon>
                    <span class="input-group-text">
                        <i id="fa-chevy" class="fas fa-chevron-up rotate" aria-hidden="true"/>
                    </span>
                </b-input-group-addon>
            </b-input-group>
        </p>
        <ul class="options-list" >
            <li v-for="item in filteredItems" :key="item.index" :data-name="item.name"
            :id="item.value" :class="item.selected ? 'selected' : ''">
                <span>{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Options from '../../models/options';

export default Vue.extend({
    name: "kulfi-dropdown",
    data: {
        search: '',
    },
    props: ['ddOptions'],
    mounted: function() {
        var _self = this;
        var _rotate = this.$el.querySelector('.rotate');
        var _search = this.$el.querySelector('#input-dropdown');
        var _optionList = <HTMLUListElement>this.$el.querySelector('.options-list');

        if(_rotate) {
            _rotate.addEventListener('click', function(e: Event) {
                var _elm = e.currentTarget;
                if(_elm ) {
                    _self.toggle(_elm as HTMLElement);
                }
            });
        }

        this.setSelectedAction();

        if(_search) {
            _search.addEventListener('keyup', function(e: Event) {
                _self.filter(e.currentTarget as HTMLInputElement);
            });
        }
    },
    methods: {
        toggle: function(elm: HTMLElement) {
            var _options = <HTMLUListElement>document.querySelector('.options-list');
            elm.classList.toggle('down');
            _options.classList.toggle('display');
        },
        selected: function(elm: HTMLLIElement, parent: HTMLUListElement) {
            var _list = [].slice.call(parent.querySelectorAll('li')) as HTMLLIElement[];
            var _search = <HTMLInputElement>document.querySelector('#input-dropdown')
            var _rotate = document.querySelector('.rotate');

            _search.value = '';
            _search.setAttribute('data-value', '');

            var _filtered = _list.filter(item => item.classList.contains('selected'));
            
            _list.forEach(target => {
                var _item = <HTMLLIElement>document.querySelector(`li[id="${target.id}"]`);
                _item.className = '';
            });

            elm.className = 'selected';
            this.assignSelectedName();
            this.toggle(_rotate as HTMLElement);
        },
        setSelectedAction: function() {
            var _optionList = <HTMLUListElement>this.$el.querySelector('.options-list');
            if(_optionList) {
                var _list = _optionList.querySelectorAll('li');
                var _items = [].slice.call(_list);
                var _self = this;

                for (let i=0; i < _items.length; i++) {
                    var _elm = <HTMLLIElement>_items[i];
                    _elm.addEventListener('click', function(e: Event) {
                        _self.selected(e.currentTarget as HTMLLIElement, _optionList);
                    });
                }
            }

            this.assignSelectedName();
        },
        filter: function(elm: HTMLInputElement) {
            var _rotate = document.querySelector('.rotate');
            var _optionsList = <HTMLUListElement>document.querySelector('.options-list');
            var _items = _optionsList.querySelectorAll('li');


            elm.setAttribute('data-value', '');
            this.search = elm.value;
            this.muted(_rotate as HTMLElement);

            
            var _options = this.filtered();
            _optionsList.innerHTML = '';
            _options.forEach(option => {
                var _li = document.createElement('li');
                var _span = document.createElement('span');

                if(option.value) {
                    _li.setAttribute('id', option.value);
                    _li.setAttribute('data-name', <string>option.name);
                }

                if(option.name) {
                    _span.innerText = option.name;
                }

                _li.appendChild(_span);
                _optionsList.appendChild(_li);
            });


            if(_optionsList.className.indexOf('display') < 0) {
                this.toggle(_rotate as HTMLElement);
            }

            this.setSelectedAction();
        },
        filtered: function(): Options[] {
            const _condition = new RegExp(this.search);
            const _options = <Options[]>this.ddOptions;
            if(this.search) {
                return _options.filter(item =>(<String>item.value).toLowerCase().match(_condition));
            }

            return _options;
        },
        passed: function(elm: HTMLElement) {
             if (elm) {
                var _classes = elm.className.match(/\S+/g) || [];
                var _passed = _classes.indexOf("passed");
                if (_passed < 0) {
                    _classes.push("passed");
                    elm.className = _classes.join(" ");
                }
            }
        },
        muted: function(elm: HTMLElement) {
            if (elm) {
                var _classes = elm.className.match(/\S+/g) || [];
                var _passed = _classes.indexOf("passed");
                if (_passed >= 0) {
                    _classes.splice(_passed, 1);
                     elm.className = _classes.join(" ");
                }
            }
        },
        assignSelectedName: function() {
            var _selected = <HTMLLIElement>document.querySelector('.options-list li[class="selected"] '); 
            var _search = <HTMLInputElement>document.querySelector('#input-dropdown');
            var _chevron = <HTMLElement>document.querySelector('#fa-chevy');

            if(_selected.classList.contains('selected')) {
                _search.value = <string>_selected.getAttribute('data-name'); 
                _search.setAttribute('data-value', _selected.id);
                this.passed(_chevron);
            } else {
                _search.value = ''; 
                _search.setAttribute('data-value', '');
                this.muted(_chevron);
            }
        }  
    },
    computed: {

        filteredItems: function() : Options[]{
            return this.filtered();
        }

    }
})
</script>
<style>
    .rotate {
        cursor: pointer;
        -moz-transition: all .50s linear;
        -webkit-transition: all .50s linear;
        transition: all .50s linear;
    }

    .rotate.down {
        -moz-transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        transform:rotate(180deg);
    }

    p.control {
        position: relative;
        display: flex;
        margin-bottom: 0.1rem;
        z-index: 10;
    }

    ul.options-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
        border: 1px solid #dbdbdb;
        border-radius: 0 0 3px 3px;
        max-height: 300px;
        overflow-y: auto;
        box-shadow: 0px 3px 6px 0px rgba(195, 195, 195, 0.76);
        opacity: 0;
        visibility: hidden;
    }

    @keyframes fadeInOpacity {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    ul.options-list.display {
        visibility: visible;
        opacity: 1;
        animation-name: fadeInOpacity;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-duration: 2s;
    }

    ul.options-list li.selected {
        background-color: #91b58d;
        color: #fff;
    }

    ul.options-list li:hover {
        background-color: #a8c4a4;
        color: #fff;
    }

    ul.options-list li:hover span {
        color: #fff;
    }


    ul.options-list li.selected span {
        color: #fff; 
    }

    ul.options-list li {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: flex-end;
        padding: 0.4rem;
        border-bottom: 1px solid #eee;
        color: #666;
        background-color: #fff;
        cursor: pointer;
        transition: 1s all ease;
    }

    ul.options-list li.hide {
        display: none;
    }

    ul.options-list li span {
        margin-right: 4px;
    }

    
    
</style>


