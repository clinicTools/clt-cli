import { createApp } from 'vue'

import BackButton from "../../components/BackButton"
import Content from "../../components/Content"
import Header from "../../components/Header"
import Toolbar from "../../components/Toolbar"
import Item from "../../components/Item"
import Def from "../../components/Def"
import Buttons from "../../components/Buttons"
import Label from "../../components/Label"
import List from "../../components/List"
import Title from "../../components/Title"
import ListHeader from "../../components/ListHeader"
import Segment from "../../components/Segment"
import SegmentButton from "../../components/SegmentButton"
import Modal from "../../components/Modal"
import PopOver from "../../components/PopOver"
import Button from "../../components/Button"
import Icon from "../../components/Icon"
import SkeletonText from "../../components/SkeletonText"
import Card from "../../components/Card"
import Input from "../../components/Input"

export default function(component) {
    let app = createApp(component);
    app.component("BackButton", BackButton);
    app.component("Buttons", Buttons);
    app.component("Content",Content);
    app.component("Def", Def);
    app.component("Header", Header);
    app.component("Toolbar", Toolbar);
    app.component("Item", Item);
    app.component("Label", Label);
    app.component("List", List);
    app.component("Title", Title);
    app.component("ListHeader", ListHeader);
    app.component("Segment", Segment);
    app.component("SegmentButton", SegmentButton);
    app.component("Modal", Modal);
    app.component("PopOver", PopOver);
    app.component("Button", Button);
    app.component("Icon", Icon);
    app.component("SkeletonText", SkeletonText);
    app.component("Card", Card);
    app.component("Input", Input);
    return app
}