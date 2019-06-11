<template>
    <modal name="project-settings" transition="pop-out" @before-open="beforeOpen">
        <div class="dialog">
            <h1 class="dialog-title">Project settings</h1>
            <div class="dialog-form">
                <p>{{ test }}</p>
                <form autocomplete="false">
                    <input id="n-name" type="text" placeholder="Name" :value="name">
                </form>
                <div style="margin-top:42px;"></div>
                <div class="button-set">
                    <button @click="confirm()">Confirm</button>
                    <button @click="remove()">Delete</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export default class ModelView extends Vue {
    @Prop() public name!: string;
    @Prop() public test!: string;

    constructor() {
        super();
        this.name = '';
        this.test = '';
    }

    private beforeOpen(event: any) {
        // This method is called to set values!
        // this.test = event.params.test;
    }

    private confirm() {
        alert('Confirm ...');
    }

    private remove() {
        alert('Remove ...');
    }
}

</script>

<style lang="less">
.dialog {
    color: #8b8c8d;
    font-size: 0;
    width: 100%;
    vertical-align: top;
    p {
        font-size: 18px;
    }
    .dialog-title {
        box-sizing: border-box;
        padding: 30px;
        width: 100%;
        text-align: center;
        letter-spacing: 1px;
        font-size: 20px;
        font-weight: 300;
    }
    .dialog-form {
        padding: 0 20px;
        box-sizing: border-box;
    }
    input[type=text] {
        display: block;
        box-sizing: border-box;
        margin-bottom: 4px;
        width: 100%;
        font-size: 12px;
        line-height: 2;
        border: 0;
        border-bottom: 1px solid #DDDEDF;
        padding: 4px 8px;
        font-family: inherit;
        transition: 0.5s all;
        outline: none;
    }
    button {
        flex-grow: 1;
        flex-basis: auto;
        box-sizing: border-box;
        background: #ffffff;
        border-radius: 4px;
        padding: 10px;
        letter-spacing: 1px;
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        min-width: 140px;
        max-width: 48%;
        // margin: 8px;
        color: #8b8c8d;
        cursor: pointer;
        border: 1px solid #DDDEDF;
        text-transform: uppercase;
        transition: 0.1s all;
        font-size: 10px;
        outline: none;
        &:hover {
            border-color: mix(#DDDEDF, #000000, 90%);
            color: mix(#8b8c8d, #000000, 80%);
        }
    }
    .button-set {
        margin-bottom: 8px;
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
}
</style>
