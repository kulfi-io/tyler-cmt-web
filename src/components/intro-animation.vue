<template>
  <div class="intro-container">
    <svg
      id="intro-svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xlink="https://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="20 -30 800 280"
      enable-background="new 0 0 800 280"
      xml:space="preserve"
    >
    
      <!-- underlines -->
      <!-- <line id="underline1" class="underline first" x1="146" y1="176" x2="146" y2="176"></line>
      <line id="underline2" class="underline second" x1="146" y1="184" x2="146" y2="184"></line>
      <line id="underline3" class="underline third" x1="146" y1="192" x2="146" y2="192"></line>
      <line id="underline4" class="underline fourth" x1="146" y1="200" x2="146" y2="200"></line> -->

      <!-- M -->
      <line id="m1" class="m-line" x1="131.6" y1="150" x2="131.6" y2="20"></line>
      <line id="m1d1" class="m1d dec blue" x1="150" y1="150" x2="150" y2="70"></line>
      <line id="m1d2" class="m1d dec green" x1="155" y1="130" x2="155" y2="70"></line>
      <line id="m2" class="m-line" x1="161.6" y1="100" x2="131.6" y2="20"></line>
      <line id="m2d1" class="m2d dec purple" x1="130" y1="80" x2="130" y2="62"></line>
      <line id="m2d2" class="m2d dec green" x1="135" y1="75" x2="135" y2="35"></line>
      <line id="m2d3" class="m2d dec plum" x1="140" y1="60" x2="140" y2="20"></line>
      <line id="m3" class="m-line" x1="161.6" y1="100" x2="191.6" y2="20"></line>
      <line id="m3d1" class="m3d dec blue" x1="190" y1="150" x2="190" y2="70"></line>
      <line id="m3d2" class="m3d dec green" x1="200" y1="130" x2="200" y2="70"></line>
      <line id="m4" class="m-line" x1="191.6" y1="150" x2="191.6" y2="20"></line>

      <!-- A -->
      <line id="a1" class="a-line"  x1="221.6" y1="150" x2="251.6" y2="20"></line>
      <line id="a2" class="a-line"  x1="271.6" y1="150" x2="251.6" y2="20"></line>
      <line id="a2d1" class="a2d dec purple" x1="220" y1="109" x2="220" y2="109"></line>
      <line id="a2d2" class="a2d dec plum" x1="220" y1="115" x2="220" y2="115"></line>
      <line id="a2d3" class="a2d dec green" x1="220" y1="121" x2="220" y2="121"></line>
      <line id="a3" class="a-line"  x1="231.6" y1="100" x2="261.6" y2="100"></line>
      <ellipse id="a3d1" class="a3d dec dot blue" cx="256" cy="51" rx="0" ry="0"></ellipse>
      <ellipse id="a3d2" class="a3d dec dot plum" cx="256" cy="61" rx="0" ry="0"></ellipse>
      <ellipse id="a3d3" class="a3d dec dot purple" cx="256" cy="71" rx="0" ry="0"></ellipse>
      <ellipse id="a3d4" class="a3d dec dot green" cx="256" cy="81" rx="0" ry="0"></ellipse>

      <!-- S -->
      <path
        id="s1" class="s-path"
        d="M348.93,23c-15.25.6-28.87,7.94-39.89,18.19-9.36,8.71-22,23.9-10.74,36.57,2.12,2.39,5,3.43,7.93,4.41A150,150,0,0,1,321.3,88a153.45,153.45,0,0,1,25.23,14.52c7.33,5.21,12.15,12.54,12.49,21.73.31,8.53-3.5,16.56-10.81,21.07a51.27,51.27,0,0,1-34.3,6.88c-10.16-1.63-16.39-7.4-18.56-17.62-.27-1.26-2.2-.73-1.93.53,3.33,15.72,16.52,20.57,31.45,19.57,14-.94,31.39-7.26,35.27-22.27a28.89,28.89,0,0,0-2.73-21.29c-3.72-6.51-9.92-10.56-16.1-14.49a152.9,152.9,0,0,0-26.47-13.52c-4.13-1.61-9.22-2.47-13-4.88C296.2,74.52,295.18,66,297,60c1.62-5.42,6-9.83,9.81-13.8a82.69,82.69,0,0,1,13-11.13c8.72-5.92,18.56-9.68,29.14-10.1,1.28-.05,1.29-2.05,0-2Z"
      ></path>
      <ellipse id="s1d1" class="s1d dec dot blue" cx="300" cy="81" rx="0" ry="0"></ellipse>
      <ellipse id="s1d2" class="s1d dec dot plum" cx="310" cy="91" rx="0" ry="0"></ellipse>
      <ellipse id="s1d3" class="s1d dec dot purple" cx="330" cy="111" rx="0" ry="0"></ellipse>
      <ellipse id="s1d4" class="s1d dec dot green" cx="340" cy="121" rx="0" ry="0"></ellipse>
      <ellipse id="s1d5" class="s1d dec dot blue" cx="345" cy="131" rx="0" ry="0"></ellipse>
      <ellipse id="s1d6" class="s1d dec dot plum" cx="340" cy="141" rx="0" ry="0"></ellipse>
      <ellipse id="s1d7" class="s1d dec dot purple" cx="330" cy="151" rx="0" ry="0"></ellipse>

      <!-- S -->
      <path
        id="s2" class="s-path"
        d="M427.93,23c-15.25.6-28.87,7.94-39.89,18.19-9.36,8.71-22,23.9-10.74,36.57,2.12,2.39,5,3.43,7.93,4.41A150,150,0,0,1,400.3,88a153.45,153.45,0,0,1,25.23,14.52c7.33,5.21,12.15,12.54,12.49,21.73.31,8.53-3.5,16.56-10.81,21.07a51.27,51.27,0,0,1-34.3,6.88c-10.16-1.63-16.39-7.4-18.56-17.62-.27-1.26-2.2-.73-1.93.53,3.33,15.72,16.52,20.57,31.45,19.57,14-.94,31.39-7.26,35.27-22.27a28.89,28.89,0,0,0-2.73-21.29c-3.72-6.51-9.92-10.56-16.1-14.49a152.9,152.9,0,0,0-26.47-13.52c-4.13-1.61-9.22-2.47-13-4.88C375.2,74.52,374.18,66,376,60c1.62-5.42,6-9.83,9.81-13.8a82.69,82.69,0,0,1,13-11.13c8.72-5.92,18.56-9.68,29.14-10.1,1.28-.05,1.29-2.05,0-2Z"
      ></path>
      <ellipse id="s2d1" class="s2d dec dot blue" cx="400" cy="81" rx="0" ry="0"></ellipse>
      <ellipse id="s2d2" class="s2d dec dot plum" cx="410" cy="91" rx="0" ry="0"></ellipse>
      <ellipse id="s2d3" class="s2d dec dot purple" cx="430" cy="111" rx="0" ry="0"></ellipse>
      <ellipse id="s2d4" class="s2d dec dot green" cx="440" cy="121" rx="0" ry="0"></ellipse>
      <ellipse id="s2d5" class="s2d dec dot blue" cx="445" cy="131" rx="0" ry="0"></ellipse>
      <ellipse id="s2d6" class="s2d dec dot plum" cx="440" cy="141" rx="0" ry="0"></ellipse>
      <ellipse id="s2d7" class="s2d dec dot purple" cx="430" cy="151" rx="0" ry="0"></ellipse>

      <!-- A -->
      <line id="a4" class="a-line"  x1="451.6" y1="150" x2="481.6" y2="20"></line>
      <line id="a5" class="a-line"  x1="511.6" y1="150" x2="481.6" y2="20"></line>
      <line id="a5d1" class="a5d dec purple" x1="470" y1="20" x2="470" y2="50"></line>
      <line id="a5d2" class="a5d dec plum" x1="481" y1="30" x2="470" y2="30"></line>
      <line id="a5d3" class="a5d dec pink" x1="470" y1="40" x2="470" y2="40"></line>
      <line id="a6" class="a-line"  x1="461.6" y1="100" x2="491.6" y2="100"></line>
      <ellipse id="a6d1" class="a6d dec dot blue" cx="486" cy="91" rx="0" ry="0"></ellipse>
      <ellipse id="a6d2" class="a6d dec dot plum" cx="490" cy="101" rx="0" ry="0"></ellipse>
      <ellipse id="a6d3" class="a6d dec dot purple" cx="496" cy="121" rx="0" ry="0"></ellipse>
      <ellipse id="a6d4" class="a6d dec dot red" cx="499" cy="131" rx="0" ry="0"></ellipse>

      <!-- G -->
      <path
        id="g1" class="g-path"
        d="M604.68,22.87c-32.58-1.17-64.49,13.86-77.91,44.82-11.6,26.75-5.25,63.64,23.14,77,15.47,7.25,33.22,6.66,49.86,5.7,1.35-.08,1.35-2.18,0-2.1-13.61.78-27.69,1.35-40.93-2.49a47.25,47.25,0,0,1-31.57-28.94c-10.86-28.44,1.27-61,25.75-78.09,15.07-10.55,33.5-14.4,51.66-13.75,1.35,0,1.35-2.05,0-2.1Z"
      ></path>
      <path
        id="g2" class="g-path"
        d="M574.66,87.24l-3.31-2.59-.92,1.59,21.92,5.93c6.22,1.68,15.77,2.66,19.86,8.15,5,6.7-1,15.22-5,20.87-3.8,5.37-7.55,10.77-11,16.35a281.34,281.34,0,0,0-31.84,71.32,1,1,0,0,0,1.83.5,280.31,280.31,0,0,1,39.56-82.83c5.13-7.34,15.85-19.95,7-28.63-4.34-4.28-11.4-5.27-17-6.79l-24.78-6.71c-.85-.23-1.71,1-.92,1.59l3.31,2.59c1,.74,2.31-.59,1.34-1.34Z"
      ></path>
      <line id="g2d1" class="g2d dec red" x1="570" y1="75" x2="615" y2="90"></line>
      <line id="g2d2" class="g2d dec green" x1="575" y1="145" x2="605" y2="105"></line>
      <line id="g2d3" class="g2d dec pink" x1="565" y1="210" x2="625" y2="105"></line>

      <!-- E -->
      <line id="e1" class="e-line"  x1="641.6" y1="150" x2="641.6" y2="20"></line>
      <line id="e2" class="e-line"  x1="641.6" y1="20" x2="701.6" y2="20"></line>
      <ellipse id="e2d1" class="e2d dec dot blue" cx="645" cy="20" rx="0" ry="0"></ellipse>
      <ellipse id="e2d2" class="e2d dec dot plum" cx="655" cy="20" rx="0" ry="0"></ellipse>
      <ellipse id="e2d3" class="e2d dec dot purple" cx="665" cy="20" rx="0" ry="0"></ellipse>
      <ellipse id="e2d4" class="e2d dec dot green" cx="685" cy="20" rx="0" ry="0"></ellipse>
      <line id="e3" class="e-line"  x1="641.6" y1="100" x2="681.6" y2="100"></line>
      <ellipse id="e3d1" class="e3d dec dot green" cx="645" cy="95" rx="0" ry="0"></ellipse>
      <ellipse id="e3d2" class="e3d dec dot plum" cx="650" cy="95" rx="0" ry="0"></ellipse>
      <ellipse id="e3d3" class="e3d dec dot pink" cx="660" cy="95" rx="0" ry="0"></ellipse>
      <ellipse id="e3d4" class="e3d dec dot red" cx="665" cy="95" rx="0" ry="0"></ellipse>
      <line id="e4" class="e-line"  x1="641.6" y1="150" x2="701.6" y2="150"></line>
      <ellipse id="e4d1" class="e4d dec dot green" cx="645" cy="145" rx="0" ry="0"></ellipse>
      <ellipse id="e4d2" class="e4d dec dot plum" cx="665" cy="145" rx="0" ry="0"></ellipse>
      <ellipse id="e4d3" class="e4d dec dot pink" cx="685" cy="145" rx="0" ry="0"></ellipse>
      <ellipse id="e4d4" class="e4d dec dot red" cx="705" cy="145" rx="0" ry="0"></ellipse>

      <!-- therapy for better health -->
      <text x="80" y="203" font-size="20" id="text">
        <tspan dx="-580" dy="-1">t</tspan>
        <tspan dy="-0.7">h</tspan>
        <tspan dy="-0.7">e</tspan>
        <tspan dy="-0.7">r</tspan>
        <tspan dy="-0.7">a</tspan>
        <tspan dy="-0.7">p</tspan>
        <tspan dy="-0.7">y</tspan>
        <tspan dy="-0.7">&nbsp;</tspan>
        <tspan dy="-0.7">t</tspan>
        <tspan dy="-0.7">h</tspan>
        <tspan dy="-0.7">a</tspan>
        <tspan dy="-0.7">t</tspan>
        <tspan dy="-0.7">&nbsp;</tspan>
        <tspan dy="-0.7" class="health">s</tspan>
        <tspan dy="-0.7" class="health">o</tspan>
        <tspan dy="-0.7" class="health">o</tspan>
        <tspan dy="-0.7" class="health">t</tspan>
        <tspan dy="-0.7" class="health">h</tspan>
        <tspan dy="-0.7" class="health">e</tspan>
        <tspan dy="-0.7" class="health">s</tspan>
        <tspan dy="-0.7">&nbsp;</tspan>
        <tspan dy="-0.7">a</tspan>
        <tspan dy="-0.7">n</tspan>
        <tspan dy="-0.7">d</tspan>
        <tspan dy="-0.7">&nbsp;</tspan>
        <tspan dy="-0.7" class="health">h</tspan>
        <tspan dy="-0.7" class="health">e</tspan>
        <tspan dy="-0.7" class="health">a</tspan>
        <tspan dy="-0.7" class="health">l</tspan>
        <tspan dy="-0.7" class="health">s</tspan>
      </text>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import '../assets/css/intro.css';
import {TimelineLite, Back, Power3, Power1} from 'gsap';
export default Vue.extend({
    name: 'intro-animation',
    mounted: function(){        
        try {
            this.intro();
        }
        catch(err) {
            throw err;
        }
        
    },
    methods: {

       
        intro: function() {

            const _parent = document.querySelector('#intro-svg');
            
            if(_parent) {
                const _m1dLines = _parent.querySelectorAll('.m1d');
                const _mainTimeLine = new TimelineLite();
                _mainTimeLine.add(this.setMTimeline(_parent), 0.2);
                _mainTimeLine.add(this.setATimeLine(_parent, 1), 0.4);
                _mainTimeLine.add(this.setSTimeLine(_parent, 1), 0.6);
                _mainTimeLine.add(this.setSTimeLine(_parent, 2), 0.8);
                _mainTimeLine.add(this.setATimeLine(_parent, 2), 1.0);
                _mainTimeLine.add(this.setGTimeLine(_parent, 1), 1.2);
                _mainTimeLine.add(this.setGTimeLine(_parent, 2), 1.4);
                _mainTimeLine.add(this.setETimeline(_parent), 1.6);
                _mainTimeLine.add(this.setTextTimeline(_parent), 2);
                _mainTimeLine.timeScale(0.6);
                _mainTimeLine.play();
            }
        },
        setTextTimeline: function(parent: Element) {
            const _timeLine = new TimelineLite();
            const _text = parent.querySelector('#text');
            const _spans = parent.querySelectorAll('tspan');
            const _underLines = parent.querySelectorAll('.underline');

            if(_spans.item(0).dx.baseVal[0]) {
                _timeLine
                .to(_spans.item(0).dx.baseVal[0], 0.6, {value: 0, ease: Back.easeOut}, 1)
                .to(_spans.item(0).dx.baseVal[0], 0.6, {value: 50, ease: Back.easeOut}, 1);
            } else {
                _spans.item(0).setAttribute('dx', '0');
                _spans.item(0).setAttribute('dy', '0');
            }
            
            for (var i = _spans.length-1; i >= 0; i--) {
                _timeLine.to(_spans.item(i), 0.3, {opacity: 1}, 1 + (_spans.length-1-i)*0.05);
            }

            // this.addUnderlineTimeline(_timeLine, <SVGLineElement>_underLines.item(0), 0.5, 704, 157, 410, 167, 0.2);
            // this.addUnderlineTimeline(_timeLine, <SVGLineElement>_underLines.item(1), 0.51, 710, 165, 410, 175, 0.3);
            // this.addUnderlineTimeline(_timeLine, <SVGLineElement>_underLines.item(2), 0.52, 718, 173, 410, 183, 0.4);
            // this.addUnderlineTimeline(_timeLine, <SVGLineElement>_underLines.item(3), 0.53, 726, 181, 410, 191, 0.5);

            return _timeLine;
        },
        setMTimeline: function(parent: Element): TimelineLite{
            const _timeLine = new TimelineLite();
            const _mLines = parent.querySelectorAll('.m-line');
            const _m2dLines = parent.querySelectorAll('.m2d');
            const _m3dLines = parent.querySelectorAll('.m3d');

            
            if(_mLines.length) {
                const _m1 = <SVGLineElement>_mLines.item(0);
                const _m2 = <SVGLineElement>_mLines.item(1);
                const _m3 = <SVGLineElement>_mLines.item(2);
                const _m4 = <SVGLineElement>_mLines.item(3);

                _timeLine
                .to(_m1.y1.baseVal, 0.5, {value: 166.4, ease: Back.easeInOut}, 0)
                .to(_m1, 0.01, {opacity: 1},0)
                .to(_m2, 0.01, {opacity: 1},0.1)
                .to(_m3, 0.01, {opacity: 1},0.2)
                .to(_m4, 0.01, {opacity: 1},0.3);

                this.addLineToTimeline(_timeLine, <SVGLineElement>_m2dLines.item(0),  0.2, 130, 120, 0.1);
                this.addLineToTimeline(_timeLine, <SVGLineElement>_m2dLines.item(1),  0.2, 140, 130, 0.4);
                this.addLineToTimeline(_timeLine, <SVGLineElement>_m2dLines.item(2),  0.2, 150, 160, 0.6);
                this.addLineToTimeline(_timeLine, <SVGLineElement>_m3dLines.item(0),  0.2, 190, 180, 0.8);
                this.addLineToTimeline(_timeLine, <SVGLineElement>_m3dLines.item(1),  0.2, 200, 190, 0.9);
            }

            return _timeLine;
        },
        setETimeline: function(parent: Element): TimelineLite {
            const _timeLine = new TimelineLite();
            const _eLines = parent.querySelectorAll('.e-line');
            const _e2dElipses = parent.querySelectorAll('.e2d');
            const _e3dElipses = parent.querySelectorAll('.e3d');
            const _e4dElipses = parent.querySelectorAll('.e4d');

            if(_eLines.length) {
                const _e1 = <SVGLineElement>_eLines.item(0);
                const _e2 = <SVGLineElement>_eLines.item(1);
                const _e3 = <SVGLineElement>_eLines.item(2);
                const _e4 = <SVGLineElement>_eLines.item(3);

                _timeLine
                .to(_e1, 0.01, {opacity: 1}, 1)
                .to(_e2, 0.01, {opacity: 1}, 1.2)
                .to(_e3, 0.01, {opacity: 1}, 1.3)
                .to(_e4, 0.01, {opacity: 1}, 1.4);

                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e2dElipses.item(0), 0.4, 2, 0.2);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e2dElipses.item(1), 0.4, 2, 0.4);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e2dElipses.item(2), 0.4, 2, 0.6);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e2dElipses.item(3), 0.4, 2, 0.8);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e3dElipses.item(0), 0.4, 2, 1.0);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e3dElipses.item(1), 0.4, 2, 1.2);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e3dElipses.item(2), 0.4, 2, 1.4);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e3dElipses.item(3), 0.4, 2, 1.6);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e4dElipses.item(0), 0.4, 2, 1.8);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e4dElipses.item(1), 0.4, 2, 2.0);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e4dElipses.item(2), 0.4, 2, 2.2);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_e4dElipses.item(3), 0.4, 2, 2.4);
            }

            return _timeLine;
        },
        setATimeLine: function(parent: Element, target: number): TimelineLite {
            const _timeLine = new TimelineLite();
            const _aLines = parent.querySelectorAll('.a-line');
            const _a2dLines = parent.querySelectorAll('.a2d');
            const _a3dLines = parent.querySelectorAll('.a3d');
            const _a5dLines = parent.querySelectorAll('.a5d');
            const _a6dLines = parent.querySelectorAll('.a6d');

            if(target === 1) {
                const _a1 = <SVGLineElement>_aLines.item(0);
                const _a2 = <SVGLineElement>_aLines.item(1);
                const _a3 = <SVGLineElement>_aLines.item(2);

                _timeLine
                .to(_a3.y2.baseVal, 0.5, {value: 90.4, ease: Back.easeInOut}, 0.3)
                .to(_a1, 0.01, {opacity: 1}, 0)
                .to(_a2, 0.01, {opacity: 1}, 0.1)
                .to(_a3, 0.01, {opacity: 1}, 0.2);

                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_a3dLines.item(0), 0.25, 2, 0.2);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_a3dLines.item(1), 0.25, 2, 0.4);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_a3dLines.item(2), 0.25, 2, 0.6);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_a3dLines.item(3), 0.25, 2, 0.8);
                this.addLineToTimeline(_timeLine, <SVGLineElement>_a2dLines.item(0), 0.3, 270, 93, 0.1);
                this.addLineToTimeline(_timeLine, <SVGLineElement>_a2dLines.item(1), 0.3, 256, 104, 0.2);
                this.addLineToTimeline(_timeLine, <SVGLineElement>_a2dLines.item(2), 0.3, 242, 114, 0.3);
            }

            if(target === 2) {

                const _a4 = <SVGLineElement>_aLines.item(3);
                const _a5 = <SVGLineElement>_aLines.item(4);
                const _a6 = <SVGLineElement>_aLines.item(5);

                _timeLine
                .to(_a6.y2.baseVal, 0.5, {value: 90.4, ease: Back.easeInOut}, 0.3)
                .to(_a4, 0.01, {opacity: 1}, 0)
                .to(_a5, 0.01, {opacity: 1}, 0.2)
                .to(_a6, 0.01, {opacity: 1}, 0.3);

                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_a6dLines.item(0), 0.25, 2, 0.2);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_a6dLines.item(1), 0.25, 2, 0.4);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_a6dLines.item(2), 0.25, 2, 0.6);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_a6dLines.item(3), 0.25, 2, 0.8);
                
            }

            return _timeLine;
        },
        setGTimeLine: function(parent: Element, target: number): TimelineLite {
            const _timeLine = new TimelineLite();
            const _gPaths = parent.querySelectorAll('.g-path');
            const _g2dLines = parent.querySelectorAll('.g2d');

            let _length = 0;
            let path:SVGPathElement | null = null;

            if(target === 1) {
                path = <SVGPathElement>_gPaths.item(0);
                _length = path.getTotalLength();
                path.style.opacity = '1';
                path.style.strokeDasharray = _length.toString();
                path.style.strokeDashoffset = _length.toString();
                
                _timeLine.to(path, 0.5, {strokeDashoffset: 0, ease: Power1.easeInOut}, 0);

            }

            if(target === 2) {
                path = <SVGPathElement>_gPaths.item(1);
                _length = path.getTotalLength();
                path.style.opacity = '1';
                path.style.strokeDasharray = _length.toString();
                path.style.strokeDashoffset = _length.toString();

                _timeLine.to(path, 0.4, {strokeDashoffset: 0, ease: Power1.easeInOut}, 0.6);

                this.addLineToTimeline(_timeLine, <SVGLineElement>_g2dLines.item(0), 0.2, 615, 95, 0.7);
                this.addLineToTimeline(_timeLine, <SVGLineElement>_g2dLines.item(1), 0.4, 575, 145, 0.7);
                this.addLineToTimeline(_timeLine, <SVGLineElement>_g2dLines.item(2), 0.5, 565, 210, 1.0);
            }

            return _timeLine;
        },
        setSTimeLine: function(parent: Element, target: number): TimelineLite {
            const _timeLine = new TimelineLite();
            const _sPaths = parent.querySelectorAll('.s-path');
            const _s1dElipses = parent.querySelectorAll('.s1d');
            const _s2dElipses = parent.querySelectorAll('.s2d');

            let _length = 0;
            let path:SVGPathElement | null = null;

            if(target === 1) {
                path = <SVGPathElement>_sPaths.item(0);
                _length = path.getTotalLength();
                path.style.opacity = '1';
                path.style.strokeDasharray = _length.toString();
                path.style.strokeDashoffset = _length.toString();
                
                _timeLine.to(path, 0.2, {strokeDashoffset: 0, ease: Power1.easeInOut}, 0.2);
                
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s1dElipses.item(0), 0.3, 2, 0.2);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s1dElipses.item(1), 0.3, 2, 0.4);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s1dElipses.item(2), 0.3, 2, 0.5);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s1dElipses.item(3), 0.3, 2, 0.6);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s1dElipses.item(4), 0.3, 2, 0.7);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s1dElipses.item(5), 0.3, 2, 0.8);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s1dElipses.item(6), 0.3, 2, 0.9);
            }

            if(target === 2) {
                path = <SVGPathElement>_sPaths.item(1);
                _length = path.getTotalLength();
                path.style.opacity = '1';
                path.style.strokeDasharray = _length.toString();
                path.style.strokeDashoffset = _length.toString();

                _timeLine.to(path, 0.4, {strokeDashoffset: 0, ease: Back.easeInOut}, 0.3);
                
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s2dElipses.item(0), 0.4, 2, 0.2);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s2dElipses.item(1), 0.4, 2, 0.4);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s2dElipses.item(2), 0.4, 2, 0.6);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s2dElipses.item(3), 0.4, 2, 0.8);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s2dElipses.item(4), 0.4, 2, 1.0);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s2dElipses.item(5), 0.4, 2, 1.2);
                this.addDotToTimeline(_timeLine, <SVGEllipseElement>_s2dElipses.item(6), 0.4, 2, 1.4);
            }

            return _timeLine;
        },
        addLineToTimeline: function(timeLine: TimelineLite, line: SVGLineElement, duration: number, xCord: number,  yCord: number, delay: number) {
            timeLine.to(line.x2.baseVal, duration, {value: xCord, ease: Power3.easeInOut}, delay);
            timeLine.to(line.y2.baseVal, duration, {value: yCord, ease: Power3.easeInOut}, delay);
            timeLine.to(line.x1.baseVal, duration, {value: xCord, ease: Power3.easeInOut}, delay+duration);
            timeLine.to(line.y1.baseVal, duration, {value: yCord, ease: Power3.easeInOut}, delay+duration);
            timeLine.to(line, 0.01, {opacity: 1}, delay);
            timeLine.to(line, 0.01, {opacity: 0}, delay+(duration*2));

        },
        addDotToTimeline: function(timeLine: TimelineLite, ellipse: SVGEllipseElement, duration: number, radius: number, delay: number) {
            timeLine.to(ellipse.rx.baseVal, duration, {value: radius, ease: Power3.easeOut}, delay);
            timeLine.to(ellipse.ry.baseVal, duration, {value: radius, ease: Power3.easeOut}, delay);
            timeLine.to(ellipse.rx.baseVal, duration, {value: 0, ease: Power3.easeIn}, delay+duration);
            timeLine.to(ellipse.ry.baseVal, duration, {value: 0, ease: Power3.easeIn}, delay+duration);
        },
        addUnderlineTimeline: function(timeLine: TimelineLite, underline: SVGLineElement, duration: number, x2Cord: number, y2Cord: number, x1Cord: number, y1Cord: number, delay: number) {
            timeLine.to(underline.x2.baseVal, duration, {value: x2Cord, ease: Power1.easeInOut}, delay);
            timeLine.to(underline.y2.baseVal, duration, {value: y2Cord, ease: Power1.easeInOut}, delay);
            timeLine.to(underline.x1.baseVal, duration, {value: x1Cord, ease: Power1.easeInOut}, delay+duration);
            timeLine.to(underline.y1.baseVal, duration, {value: y1Cord, ease: Power1.easeInOut}, delay+duration);
        }

    }
});
</script>

