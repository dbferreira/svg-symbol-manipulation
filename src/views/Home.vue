<template>
  <div class="page">
    <h1 class="page__header">Scada Symbols</h1>
    <div class="symbols">
      <symbol-value :symbol="symbols.tank"
                    @clean="cleanModifierClasses"
                    @append="appendClass" />
      <symbol-boolean :symbol="symbols.valve"
                      @clean="cleanModifierClasses"
                      @append="appendClass" />
      <symbol-boolean :symbol="symbols.switch"
                      @clean="cleanModifierClasses"
                      @append="appendClass" />
      <symbol-value :symbol="symbols.temp"
                    @clean="cleanModifierClasses"
                    @append="appendClass" />
      <symbol-value :symbol="symbols.gauge"
                    @clean="cleanModifierClasses"
                    @append="appendClass" />
      <symbol-value :symbol="symbols.tower"
                    @clean="cleanModifierClasses"
                    @append="appendClass" />
      <symbol-boolean :symbol="symbols.pumpstation"
                      @clean="cleanModifierClasses"
                      @append="appendClass" />
      <symbol-value :symbol="symbols.dam"
                    @clean="cleanModifierClasses"
                    @append="appendClass" />
    </div>
  </div>
</template>

<script>
import SymbolBoolean from '@/components/SymbolBoolean';
import SymbolValue from '@/components/SymbolValue';

export default {
  components: {
    SymbolBoolean,
    SymbolValue
  },

  data() {
    return {
      symbols: {
        tank: undefined,
        valve: undefined,
        pumpstation: undefined,
        dam: undefined,
        tower: undefined,
        temp: undefined,
        gauge: undefined,
        switch: undefined
      }
    }
  },

  methods: {
    cleanModifierClasses(cObj) {
      for (const c of cObj.classList) {
        if (c.indexOf('--') !== -1)
          cObj.classList.remove(c);
      }
    },

    appendClass(cObj, append) {
      const firstClass = cObj.classList[0];
      cObj.classList.add(firstClass + '--' + append);
    }
  },

  created() {
    this.symbols.tank = require('../assets/scada_tank.svg');
    this.symbols.valve = require('./../assets/scada_valve.svg');
    this.symbols.pumpstation = require('./../assets/scada_pumpstation.svg');
    this.symbols.dam = require('./../assets/scada_dam.svg');
    this.symbols.tower = require('./../assets/scada_tower.svg');
    this.symbols.temp = require('./../assets/scada_temp.svg');
    this.symbols.gauge = require('./../assets/scada_gauge.svg');
    this.symbols.switch = require('./../assets/scada_switch.svg');
  }

}
</script>

<style lang="scss">
.page {
  background-color: #f4f4f4;
  min-height: 100vh;
  margin: 0;
  padding: 3rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  &__header {
    margin-bottom: 50px;
  }
}

.symbols {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.symbol {
  width: 350px;
  height: 400px;
  background-color: white;
  border-radius: 0.4rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  &__container {
    height: 180px;
    width: 180px;
    background-color: #ededed;
    padding: 20px;
    border-radius: 0.4rem;
  }

  &__svg {
    width: 100%;
    height: 100%;
  }

  &__controls {
    width: 60%;
    flex: 0 0 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__range {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
  }

  &__switch {
    width: 100%;
    display: block;
  }

  &__range-slider {
    flex: 0 0 70%;
  }

  &__min {
    flex: 0 0 10%;
    text-align: center;
  }

  &__max {
    flex: 0 0 10%;
    text-align: center;
  }

  &__value {
    margin-top: 0.5rem;
  }
}
</style>
