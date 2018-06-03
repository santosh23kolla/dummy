import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { TEXT_FIELD_VALUE } from "./app.constants";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {

    showmodal = false;
    componentData = {}


    @ViewChild('parent1', { read: ViewContainerRef })
    parent: ViewContainerRef;

    getFactoryClass = (selector) => {
        var factories = Array.from(this.componentFactoryResolver['_factories'].keys());
        var factoryClass = <Type<any>>factories.find((x: any) => x.name === selector);
        return factoryClass;
    }

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
    
    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop = (ev) => {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        let elementInstance = document.getElementById(data);
        let input = this.componentFactoryResolver.resolveComponentFactory(this.getFactoryClass(elementInstance.id));
        this.showmodal = true;
        let ref = this.parent.createComponent(input);
        ref.instance.data = TEXT_FIELD_VALUE;
        this.componentData = { ...TEXT_FIELD_VALUE, header: elementInstance.id, componentref: ref}
    }

    componentDataUpdates = (updateddata) => {
        console.log(updateddata)
        if(updateddata.flag == "REMOVE"){
            updateddata.data.componentref.destroy();
        } else if(updateddata.flag == "SAVE"){
            updateddata.data.componentref.instance.data = updateddata.data;
        }
    }
}