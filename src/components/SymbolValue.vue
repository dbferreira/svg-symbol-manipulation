<template>
    <div>
        <div class="symbol">
            <h2>Value</h2>

            <div class="symbol__container"
                 ref="symbolContainer">
                <svg :viewBox="symbol.attributes.viewBox || customViewBox"
                     :height="symbol.attributes.height"
                     :width="symbol.attributes.width"
                     ref="symbol"
                     class="symbol__svg"
                     v-html="symbol.content">
                </svg>
            </div>

            <!-- TESTS -->
            <!-- <object ref="tank"
                    class="tank"
                    :data="symbols.tank.content"
                    type="image/svg+xml">
            </object> -->
            <!-- <object ref="tank"
                    class="tank"
                    data="../assets/BlueDrop.svg"
                    type="image/svg+xml">
            </object> -->
            <!-- <object ref="tank"
                    class="tank"
                    data="https://svgshare.com/i/6JE.svg"
                    type="image/svg+xml"></object> -->

            <div class="symbol__controls">
                <div class="symbol__range">
                    <div class="symbol__min">Min {{minMax[0]}}</div>
                    <el-slider class="symbol__range-slider"
                               v-model="minMax"
                               range
                               show-stops
                               :max="100">
                    </el-slider>
                    <div class="symbol__max">Max {{minMax[1]}}</div>
                </div>
                <el-slider class="symbol__slider"
                           v-model="value"></el-slider>
                <div class="symbol__value">{{value}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        symbol: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            value: 15,
            minMax: [10, 90],
            mode: 0,
            symbolBB: undefined,
            clipPathHeight: 0,
            scaleAdjustment: 0,
            scalePercent: 0
        }
    },

    computed: {
        symbolClass() { return this.$refs.symbol.getElementsByClassName('sSymbol')[0]; },
        clipPathClass() { return this.$refs.symbol.getElementsByClassName('sClipPath')[0]; },
        colorClasses() { return this.$refs.symbol.getElementsByClassName('sColor'); },
        scaleYClasses() { return this.$refs.symbol.getElementsByClassName('sScaleY'); },
        translateYClasses() { return this.$refs.symbol.getElementsByClassName('sTranslateY'); },
        rotateClasses() { return this.$refs.symbol.getElementsByClassName('sRotate'); },
        customViewBox() {
            if (this.symbol.attributes.width && this.symbol.attributes.height)
                return `0 0 ${this.symbol.attributes.width} ${this.symbol.attributes.height}`;
            return '';
        }
    },

    methods: {
        calcScale() {
            if (!this.clipPathClass) return;
            const clipPathBB = this.clipPathClass.getBBox();
            const clipPathHeight = clipPathBB.height + clipPathBB.y;
            for (const c of this.scaleYClasses) {
                c.setAttribute('y', clipPathHeight - this.scaleAdjustment);
                c.setAttribute('height', this.scaleAdjustment);
            }
        },

        calcTranslate() {
            for (const c of this.translateYClasses) {
                const cRect = c.getBBox();
                const offset = +c.getAttribute('translate-offset') || 0;
                const translateDistance = this.symbolBB.height + offset;
                const factor = translateDistance * this.scalePercent;
                c.setAttribute('transform', `translate(0, ${translateDistance}) translate(0, ${-1 * factor})`);
                this.clipPathClass.setAttribute('transform', `translate(0, ${-1 * translateDistance}) translate(0, ${factor})`);
            }
        },

        calcColors() {
            // Go into LOW mode
            if (this.value < this.minMax[0] && this.mode >= 0) {
                this.mode = -1;
                for (const c of this.colorClasses) {
                    this.$emit('clean', c);
                    this.$emit('append', c, 'low');
                }
            }

            // Go into NORMAL mode
            else if (this.value >= this.minMax[0] && this.value <= this.minMax[1] && this.mode !== 0) {
                this.mode = 0;
                for (const c of this.colorClasses) {
                    this.$emit('clean', c);
                }
            }

            // Go into HIGH mode
            else if (this.value > this.minMax[1] && this.mode !== 1) {
                this.mode = 1;
                for (const c of this.colorClasses) {
                    this.$emit('clean', c);
                    this.$emit('append', c, 'high');
                }
            }
        },

        calcRotation() {
            for (const c of this.rotateClasses) {
                const rotateStart = +c.getAttribute('rotate-start') || 0;
                const rotateStop = +c.getAttribute('rotate-stop') || 360;
                const rotateX = +c.getAttribute('rotate-x') || 0;
                const rotateY = +c.getAttribute('rotate-y') || 0;
                const rotateTransform = c.getAttribute('rotate-transform');
                const deg = (rotateStop - rotateStart) / 100 * this.value;
                c.setAttribute('transform', `${rotateTransform} rotate(${deg} ${rotateX} ${rotateY})`);
            }
        }
    },

    watch: {
        minMax() {
            this.calcColors();
        },

        value(n) {
            this.scalePercent = n / 100;
            this.scaleAdjustment = this.symbolBB.height * this.scalePercent;

            this.calcColors();
            this.calcScale();
            this.calcTranslate();
            this.calcRotation();
        }
    },

    mounted() {
        this.symbolBB = this.symbolClass.getBBox();
    }
}
</script>

<style>

</style>
