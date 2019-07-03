<template>
        <b-row class="scroll text-center">
            <b-col>
                <button class="btn scroll-field left">
                    <i id="fa-left" class="fas fa-chevron-left">
                        scroll left
                    </i>
                </button>
            </b-col>
            <b-col>
                <button class="btn scroll-field previous">
                    <i id="fa-previous" class="fas fa-chevron-up">
                        previous page
                    </i>
                </button>
            </b-col>
            <b-col>
                <button class="btn scroll-field next">
                    <i  id="fa-next" class="fas fa-chevron-down">
                        next page
                    </i>
                </button>
            </b-col>
            <b-col>
                <button class="btn scroll-field right">
                    <i id="fa-right" class="fas fa-chevron-right">
                        scroll right
                    </i>
                </button>
            </b-col>
        </b-row>

</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'kulfi-datatable-scroll',
    props: ['scrollPosition', 'next', 'previous'],
    mounted: function() {
        var _self = this;

        var _left = _self.$el.querySelector('.left');
        var _right = _self.$el.querySelector('.right');
        var _next = _self.$el.querySelector('.next');
        var _previous = _self.$el.querySelector('.previous');

        if(_left) {
            _left.addEventListener('click', _self.scrollPosition);
        }

        if(_right) {
            _right.addEventListener('click', _self.scrollPosition);
        }

        if(_next) {
            _next.addEventListener('click', _self.next);
        }

        if(_previous) {
            _previous.addEventListener('click', _self.previous);
        }
    }
   
})
</script>

<style lang="scss" scoped>
    $default-color:  #dbedf7;//#e2e9e0;//#4c7a66;
    $item-text-color: #005276;
    $hover-scroll-color: #00818f;//#0ba360;
    // i-phone-se
    $iphone-se-port-height: 568px;
    $iphone-se-port-width: 320px;
    $iphone-se-land-height: 320px;
    $iphone-se-land-width: 568px;

    .btn {
        background: $default-color;
        font-size: small;
        padding: 0;
        outline: none !important;
        box-shadow: none !important;

        &:hover {
            color:  $hover-scroll-color
        }

    }

    .scroll {
        padding: .5rem;
        padding-left: .025rem;
        padding-right: .025rem;
        z-index: 100;
        // margin: 0 auto;
        background: $default-color;
    }

    .scroll-field {
        font-size: small;
        cursor: pointer;
        color: $item-text-color; //#4c7a66;//#ffffff;
    }


</style>


