<template v-if="heading.length">
    <thead >
        <tr>
            <th scope="col" v-for="item in heading()" :key="item">
                <b-input-group >
                    <span 
                    :class="assignOrderedClassValue(item)" 
                    :column-name="item" 
                    v-on:click="sort">
                        {{ item }}
                        <i :class="assignRotateClassValue(item)"/>
                    </span>
                </b-input-group>
            </th>
        </tr>
    </thead>    
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "kulfi-heading",
    props: ['heading', 'defaultSort', 'sortContent'],
    methods: {
        purgeClass: function(elm: HTMLElement, klasses: string[]) {
            var _classes = elm.className.match(/\S+/g) || [];
            klasses.forEach(klass => {

                var _subject = _classes.indexOf(klass);

                if(_subject >= 0) {
                    _classes.splice(_subject, 1);
                }
                elm.className = _classes.join(" ");
            });
        },
        addClass: function(elm: HTMLElement, klasses: string[]) {
            var _classes = elm.className.match(/\S+/g) || [];
            klasses.forEach(klass => {

                var _subject = _classes.indexOf(klass);

                if(_subject < 0) {
                    _classes.push(klass);
                }
                elm.className = _classes.join(" ");
            });
        },
        assignOrderedClassValue: function(item: string) {
            return this.defaultSort === item ? `sort-${item} sort-icon ordered`
                : `sort-${item} sort-icon`;
        },
        assignRotateClassValue: function(item: string) {
            return this.defaultSort === item ? 'fas fa-arrow-up rotate asc'
                : 'fas fa-arrow-up';
        },
        sort: function(e: Event) {

            e.preventDefault();
            var _target = <HTMLElement>e.currentTarget;
            var _icon = <HTMLElement>_target.querySelector('i');
            var _column = <string>_target.getAttribute('column-name')

            if(_icon.className.indexOf('rotate') >= 0) {
                
                 
                if(_icon.className.indexOf('asc') >= 0) {
                    this.sortContent(_column.trim(), 'dsc', true);
                    this.purgeClass(_icon, ['asc'])
                } else {
                    this.sortContent(_column.trim(), 'asc', true);
                    this.addClass(_icon, ['asc']);
                }

            } else {
                
                this.removeSort();
                _target.classList.toggle('ordered');
                _icon.classList.toggle('rotate');
                this.addClass(_icon, ['asc']);
                this.sortContent(_column.trim(), 'asc', true);
                
            }
        },
        removeSort: function() {
            var _self = this;
            var _rotateIcons = this.$el.querySelectorAll('.rotate');
            if(_rotateIcons) {
                [].forEach.call(_rotateIcons, function(icon: HTMLElement) {
                    _self.purgeClass(icon, ['rotate', 'asc']);
                    _self.purgeClass(icon.parentElement as HTMLElement, ['ordered'])
                });
            }
        }
    }
})
</script>

<style lang="scss" scoped>
    $default-active-color: #00818f;//#0ba360; 
    $default-order-active-color:#5e7c6f;
    $default-heading-color: #a3afb7;
    // i-phone-se
    $iphone-se-port-height: 568px;
    $iphone-se-port-width: 320px;
    $iphone-se-land-height: 320px;
    $iphone-se-land-width: 568px;


    
    .sort-icon {
        padding-right: .5rem;
        border: none;
        background: none;
        color:  $default-heading-color;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;


        &:first-letter {
            text-transform: uppercase;
        }

        &.ordered {
            border-bottom: 2px solid  $default-order-active-color
        }

       
        .fas {
            font-size: 13px;
            transition: all 1s ease;
        }
    
        .fa-base {
            color:  $default-active-color;

        }

        .rotate {
            transform: rotate(180deg);
            font-weight: bold;
            color:  $default-active-color;
            transition: all 1s ease;
        }

        .asc {
            transform: rotate(360deg);
            font-weight: bold;
            color:  $default-active-color;
            transition: all 1s ease;
        }
    }

    // i-phone se
    @media screen 
    and (device-width: $iphone-se-port-width) 
    and (device-height: $iphone-se-port-height) 
    and (orientation: portrait) {

        .label {
            font-weight: 500;
            font-size: small;

        }
    }

</style>




