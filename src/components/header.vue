<template>
  <div class="header-vue">
    <header class="initial" data-mode="sticky">
      <nav class="primary-navigation" data-theme="red" aria-label="Primary">
        <a
          href="/"
          class="logo"
          title="Tyler"
          itemscope
          itemtype="http://schema.org/Organization"
          itemprop="url"
        >
          <svg id="head-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288.88 26.71">
            <title>tyler-logo</title>
            <text transform="translate(0 20.4)" class="logo">
              T
              <tspan x="13.3" y="0" style="letter-spacing:0.000020345052083333332em">yler Chambe</tspan>
              <tspan x="168.86" y="0" style="letter-spacing:-0.006978352864583333em">r</tspan>
              <tspan x="178.53" y="0" style="letter-spacing:-0.000020345052083333332em">lain, CMT</tspan>
            </text>
          </svg>
        </a>
        <a class="toggle" @click="toggleNav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="hamburger-nav"
            width="32"
            height="18"
            viewBox="0 0 32 18"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="#1E2122"
              stroke-linecap="square"
              stroke-width="2"
              transform="translate(1)"
            >
              <path d="M0 1L30 1M0 9L30 9M0 17L30 17"></path>
            </g>
          </svg>
        </a>
        <div class="menu initial">
          <a class="toggle" @click="toggleNav">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="26" viewBox="0 0 14 26">
              <g
                fill="none"
                fill-rule="evenodd"
                stroke="#FFF"
                stroke-linecap="square"
                stroke-width="2"
                transform="translate(2 2)"
              >
                <path d="M0,11 L10,0"></path>
                <path d="M0,22 L10,11" transform="matrix(1 0 0 -1 0 33)"></path>
              </g>
            </svg>
          </a>
          <ul class="pages">
            <li class="active">
              <a href="/">Home</a>
            </li>
            <li class>
              <a href="/services/">Services</a>
            </li>
            <li class>
              <a href="/about/">About</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "header-vue",
  methods: {
    toggleNav: function(e: Event) {
      const _menu = document.querySelector(".menu");

      if (_menu) {
        _menu.classList.toggle("active");
        const _active = _menu.classList.contains("active");
        this.displayLogo(_active);
      }
    },
    displayLogo: function(activeNav: boolean) {
      const _logo = <HTMLAnchorElement>document.querySelector(".logo");
      const _socialLinks = <HTMLUListElement>(
        document.querySelector(".social-links")
      );

      if (_logo) {
        if (screen.width > 667) {
          if (activeNav) _logo.style.visibility = "hidden";
          else _logo.style.visibility = "visible";
        }
      }

      if (_socialLinks) {
        if (activeNav) _socialLinks.style.visibility = "hidden";
        else _socialLinks.style.visibility = "visible";
      }
    }
  }
});
</script>

