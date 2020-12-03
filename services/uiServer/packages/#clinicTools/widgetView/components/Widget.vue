<template>
    <Card style="position: absolute; margin: 10px" :style="{ top: calcTop, left: calcLeft, width: calcWidth, height: calcHeight }">
        <Def v-show="!editMode">
            <component :is="settings.widget"></component>
        </Def>
        <Button class="deleteBtn" type="icon" v-show="editMode" @click="$emit('delete')" fill="clear" size="small" style="position: absolute; left: 0; top: 0;">
            <Icon title="Widget entfernen" color="danger" name="remove-circle"></Icon>
        </Button>
        <Button class="resizeBtn" v-show="editMode" type="icon" fill="clear" size="small" style="position: absolute; bottom: 0; right: 0;">
            <Icon name="resize" style="transform: rotate(90deg);"></Icon>
        </Button>
    </Card>
</template>
<script>
import { createGesture, Platform, Modal } from "system"

export default {
    props: ["top", "left", "height", "width", "editMode", "index", "settings"],
    data: () => {
        return {
            resizing: false,
            moving: false,
            event: false,
            eventSize: {
                top: {}
                ,left: {}
                ,width: {}
                ,height: {}
            },
            gestures: {}
        }
    },
    computed: {
        calcTop() {
            let start = this.eventSize.top.start;
            let delta = this.eventSize.top.delta;
            if(this.moving) {
                return `calc(${this.eventSize.top.start} + ${this.eventSize.top.delta}px)`
            }
            return (((this.top || 0) * 10) + (Platform.os.md? 54 : 44)) + "px"
        },
        calcLeft() {
            let start = this.eventSize.left.start;
            let delta = this.eventSize.left.delta;
            if(this.moving) {
                return `calc(${this.eventSize.left.start} + ${this.eventSize.left.delta}px)`
            }
            return `calc(calc(100% - 10px) / 12 * ${this.left})`
        },
        calcWidth() {
            let start = this.eventSize.width.start;
            let delta = this.eventSize.width.delta;
            if(this.resizing) {
                
                return `calc(${this.eventSize.width.start} + ${this.eventSize.width.delta}px)`;
            }
            return `calc(calc(calc(100% - 10px) / 12) * ${this.width} - 10px)`
        },
        calcHeight() {
            let start = this.eventSize.height.start;
            let delta = this.eventSize.height.delta;
            if(this.resizing) {
                return `calc(${this.eventSize.height.start} + ${this.eventSize.height.delta}px)`;
            }
            return `calc(${this.height} * 10px)`
        }
    },
    methods: {
        enableGestures() {
            this.gestures.moveLoaction.enable(this.editMode)
            this.gestures.changeSize.enable(this.editMode)
            this.gestures.openOverview.enable(!this.editMode)
        }
    },
    watch: { 
        editMode(val) {
            this.enableGestures()
        }
    },
    mounted() {
        let colWidth;
        let card = this.$el;

        this.gestures.moveLoaction = createGesture({
            el: this.$el,
            direction: undefined,
            threshold: 0,
            blurOnStart: true,
            onStart: () => {
                this.moving = true;
                
                this.eventSize.left.delta = 0;
                this.eventSize.top.delta = 0;
                this.eventSize.left.start = card.style.left;
                this.eventSize.top.start = card.style.top;
            
                card.style.zIndex = "2";
                colWidth = (parseInt(getComputedStyle(card.parentNode).width) - 20) / 12;
                this.$emit('moveStart')
                //placeholder.textContent = `T: ${(placeholder.top + 1)}, L:${(placeholder.left + 1)}/12`
            },
            onMove: (detail) => {
                this.eventSize.top.delta = detail.deltaY
                this.eventSize.left.delta = detail.deltaX

                this.$emit("moveMove", {
                    left: this.left + Math.round(detail.deltaX / colWidth),
                    top: (this.top || 0) + Math.round(detail.deltaY / 10),
                    width: this.width,
                    height: this.height
                });
                //placeholder.textContent = `T: ${(placeholder.top + 1)}, L:${(placeholder.left + 1)}/12`
            },
            onEnd: (detail) => {
                this.moving = false;

                this.$emit("moveEnd", {
                    left: this.left + Math.round(detail.deltaX / colWidth),
                    top: (this.top || 0) + Math.round(detail.deltaY / 10),
                    width: this.width,
                    height: this.height
                });
                card.style.zIndex = "";
            }
        });

        this.gestures.changeSize = createGesture({
            el: this.$el.querySelector(".resizeBtn"),
            direction: undefined,
            threshold: 0,
            blurOnStart: true,
            onStart: () => {
                this.resizing = true;
                this.eventSize.width.delta = 0;
                this.eventSize.height.delta = 0;
                this.eventSize.width.start = card.style.width;
                this.eventSize.height.start = card.style.height;
                colWidth = (parseInt(getComputedStyle(card.parentNode).width) - 20) / 12;
                this.$emit("resizeStart", this.index);
                //placeholder.textContent = `H: ${placeholder.getAttribute("height")}, W: ${placeholder.getAttribute("width")}/12`
            },
            onMove: (detail) => {
                this.eventSize.height.delta = detail.deltaY
                this.eventSize.width.delta = detail.deltaX

                this.$emit("resizeMove", {
                    left: this.left,
                    top: this.top,
                    width: this.width + Math.round(detail.deltaX / colWidth),
                    height: this.height + Math.round(detail.deltaY / 10)
                });

                //setCardPosition(card, card.parentNode.querySelectorAll("ion-card"), placeholder, arr);
                //placeholder.textContent = `H: ${placeholder.height}, W:${placeholder.width}/12`
            },
            onEnd: (detail) => { 
                this.resizing = false;
                this.$emit("resizeEnd", {
                    left: this.left,
                    top: this.top,
                    width: this.width + Math.round(detail.deltaX / colWidth),
                    height: this.height + Math.round(detail.deltaY / 10)
                });
            }
        });

        this.gestures.openOverview = createGesture({
            el: this.$el,
            threshold: 0,
            onEnd: async (e) => {
                let x = e.currentX - e.startX;
                let y = e.currentY - e.startY;
                if(x < 5 && x > -5 && y < 5 && y > -5) {
                    let m = new Modal(this.settings.overview)
                    m.show();
                    m.on('close', () => {
                        m.close()
                    })
                }
            }
        });
        
        

        this.enableGestures()
    }
}
</script>