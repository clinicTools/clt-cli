<template>
    <Header v-show="!editMode">
        <Toolbar style="--border-style: none; padding-top: 0px;" :compressed="true">
            <template #start>
                <Segment :value="(actualDB || 0)" @change="setSelectedDB" >
                    <SegmentButton v-for="(dashboard, index) in dashboards" :key="index" :value="index">
                        {{dashboard.name}} 
                    </SegmentButton>
                </Segment>
            </template>
            <Buttons>
                <Button type="icon" @click="showOptions($event)">
                    <Icon slot="icon-only" color="primary" name="options"></Icon>
                </Button>
            </Buttons>
        </Toolbar>
    </Header>
    <Header v-show="editMode">
        <Toolbar style="--border-style: none; padding-top: 0px;" :compressed="true">
            <template #start>
                <Buttons>
                    <Button type="icon" @click="openAddWidget" fill="solid" size="small">
                        <Icon name="add"></Icon>
                    </Button>
                </Buttons>
            </template>
            <!--<Segment value="lg">
                <SegmentButton value="sm">
                    {{ text.SizeSM }}
                </SegmentButton>
                <SegmentButton value="md">
                    {{ text.SizeMD }}
                </SegmentButton>
                <SegmentButton value="lg">
                    {{ text.SizeLG }}
                </SegmentButton>
            </Segment>-->
            <template #end>
                <Buttons>
                    <Button type="icon" @click="changeEditMode(false, $event)" fill="solid" size="small" slot="end">
                        <Icon name="checkmark"></Icon>
                    </Button>
                </Buttons>
            </template>
        </Toolbar>
    </Header>
    <template v-if="dataLoaded">
        <Widget 
            v-for="(widget, index) in dashboards[actualDB].itemsLG"
            :settings="getSettings(widget)"
            :key="index" 
            :index="index" 
            :top="widget.top" 
            :left="widget.left" 
            :width="widget.width" 
            :height="widget.height" 
            :editMode="editMode" 
            @delete="deleteWidget(index)" 
            @resizeStart="resizeStart(index)" 
            @resizeMove="resizeMove(index, $event)"
            @resizeEnd="resizeEnd(index, $event)" 
            @moveStart="moveStart(index)" 
            @moveMove="moveMove(index, $event)"
            @moveEnd="moveEnd(index, $event)" 
        >
        </Widget>
    </template>
    
    <Placeholder v-if="placeholder" :top="placeholderValues.top" :left="placeholderValues.left" :width="placeholderValues.width" :height="placeholderValues.height">
    </Placeholder>
</template>
<script>
import Widget from "./components/Widget"
import Placeholder from "./components/Placeholder"
import PopOverOptions from "./components/PopOverOptions"
import PopOverAddWidgets from "./components/PopOverAddWidgets"
import { User, Modal, PopOver, Navigation, Translator } from "system"
let translate = new Translator("#clinicTools/widgetView");


//import op from "./components/op"

let selectedDB = 0;
let placeholder;
let vm;

export default {
    props: ["widgets", "options"],
    data: () => {
        return {
            text: {},
            settingsLoaded: false,
            dataLoaded: false,
            dashboards: []
            ,actualDB: selectedDB
            ,editMode: false
            ,placeholder: false
            ,optionsVisible: false
            ,optionsEvent: {}
            ,editAllMode: false 
            ,placeholderValues: {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            }
        }
    }
    ,methods: {
        getSettings(widget) {
            let r = this.widgets.find((x) => { 
                return widget.id === x.id
            });
            return r;
        },
        setSelectedDB(value) {
            this.actualDB = parseInt(value);
            selectedDB = parseInt(value);
            this.sortWidgets();
        },
        async showOptions(e) {
            let p = new PopOver(PopOverOptions, e)
            p.on("changeEditMode", (val) => {
                this.changeEditMode(val);
            });
            p.on("close", () => {
                p.close();
            });
            
            p.show(e);
        },
        async changeEditMode(val) {
            this.editMode = val;
            Navigation.swipeGesture = !this.editMode;
            if(this.editMode === false) {
                await User.Settings.set("clinicTools_widgetView_dashboards", this.dashboards);
            }
        },
        openAddWidget(e) {
            let data = PopOverAddWidgets.data();
            data.widgets = this.widgets;
            PopOverAddWidgets.data = () => {
                return data;
            }

            let p = new PopOver(PopOverAddWidgets, e)
            //p.widgets = this.widgets
            p.on("add", (widget) => {
                this.dashboards[this.actualDB].itemsLG.push({
                    id: widget.id,
                    top: 9999,
                    left: 0,
                    height: 5,
                    width: 2
                });
                this.sortWidgets();
            });
            p.on("close", () => {
                p.close();
            });
            
            p.show(e);
        },
        deleteWidget(i) {
            this.dashboards[this.actualDB].itemsLG.splice(i, 1)
        },
        resizeStart(i) {
            this.placeholderValues = this.dashboards[this.actualDB].itemsLG[i]
            this.placeholder = true;
        },
        resizeMove(i, values) {
            this.placeholderValues = values;
            this.sortWidgets(i);
        },
        resizeEnd(i, values) {
            this.placeholder = false;
            this.dashboards[this.actualDB].itemsLG[i].height = values.height;
            this.dashboards[this.actualDB].itemsLG[i].width = values.width;
            this.sortWidgets(i);
        },
        moveStart(i) {
            this.placeholderValues = this.dashboards[this.actualDB].itemsLG[i]
            this.placeholder = true;
        },
        moveMove(i, values) {
            this.placeholderValues = values
            this.sortWidgets(i);
        },
        moveEnd(i, values) {
            this.placeholder = false;
            this.dashboards[this.actualDB].itemsLG[i].top = values.top
            this.dashboards[this.actualDB].itemsLG[i].left = values.left
            this.sortWidgets(i);
        },
        sortWidgets(index, arr) {
            let items = (arr || JSON.parse(JSON.stringify(this.dashboards[this.actualDB].itemsLG)))
            if(index !== undefined) {
                if(this.placeholder && !arr) {
                    items[index] = {
                        top: this.placeholderValues.top,
                        left: this.placeholderValues.left,
                        width: this.placeholderValues.width,
                        height: this.placeholderValues.height
                    };
                }
                items[index].width = items[index].left + items[index].width > 12 ? 12 - items[index].left : items[index].width;
                items[index].width = items[index].width < 1 ? 1 : items[index].width;
                
                items[index].left = items[index].left < 0 ? 0 : items[index].left; 
                items[index].left = items[index].left > (12 - items[index].width) ? (12  - items[index].width) : items[index].left;

                items[index].height = items[index].height < 2 ? 2 : items[index].height;
            }
            
            for(let i = 0; i < items.length; i++) {
                if(i === index) {
                    continue;
                }

                let item = items[i];
                
                let uppercolumnElements =  items.filter((otherItem) => {
                    if(otherItem == item) {
                        return false;
                    }
        
                    let sameCol = ((otherItem.left >= item.left && otherItem.left < item.left + item.width)
                                || (item.left >= otherItem.left && item.left < otherItem.left + otherItem.width)
                    );
        
                    //let isTop = ((otherItem.top + (otherItem.height / 2)) <= (item.top + (item.height / 2)));
                    let isTop = (otherItem.top <= item.top);
                    return (sameCol && isTop)
                });
                if(uppercolumnElements.length == 0) {
                    if(item.top != 0) {
                        item.top = 0;
                        this.sortWidgets(undefined, items);
                    }
                } else {
                    let bottomMost = uppercolumnElements.reduce(function(prev, current) {        
                        return ((prev.top + prev.height)  >= (current.top + current.height)) ? prev : current
                    });
        
                    let newTop = bottomMost.top + bottomMost.height + 1;
                    if(item.top != newTop) {
                        item.top = newTop;
                        this.sortWidgets(undefined, items);
                    }
                }
            }
            if(!arr) {
                this.sortWidgets(undefined, items)
                for(let i = 0; i < items.length; i++) {
                    if(this.placeholder && i == index) {
                        this.placeholderValues = items[i];
                    } else {
                        this.dashboards[this.actualDB].itemsLG[i] = items[i];
                    }
                    
                }
            }
        }
    }
    ,components: {
        Widget,
        Placeholder,
    },
    async created() {
        this.dashboards = await User.Settings.get("clinicTools_widgetView_dashboards");
        this.sortWidgets();
        this.dataLoaded = true;
        let t = await translate.get();
        this.text = t;
    }
}
</script>