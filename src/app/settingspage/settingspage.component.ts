import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, ComponentFactoryResolver, Type } from '@angular/core';

@Component({
  selector: 'app-settingspage',
  templateUrl: './settingspage.component.html',
  styleUrls: ['./settingspage.component.css']
})
export class SettingspageComponent implements OnInit {

  @Input() showModal;
  @Output() showModalChange: EventEmitter<any> = new EventEmitter();
  @Input() componentData;
  @Output() componentDataChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('parent2', { read: ViewContainerRef })
  parent: ViewContainerRef;

  that = this;


  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  getFactoryClass = (selector) => {
    var factories = Array.from(this.componentFactoryResolver['_factories'].keys());
    var factoryClass = <Type<any>>factories.find((x: any) => x.name === selector);
    return factoryClass;
  }

  ngOnChanges(changes) {
    if (changes.componentData) {
      if (Object.keys(changes.componentData.currentValue).length) {
        let input = this.componentFactoryResolver.resolveComponentFactory(this.getFactoryClass(changes.componentData.currentValue.header));
        this.parent.clear();
        let componentref = this.parent.createComponent(input);
        componentref.instance.data = this.componentData;
        console.log(changes.componentData)
      }
    }
  }

  close = (option) => {
    this.showModal = false;
    this.showModalChange.emit(this.showModal)
    switch (option) {
      case 1:
        this.componentDataChange.emit({
          data: this.componentData,
          flag: "SAVE"
        });
        break;
      case 2:
        this.componentDataChange.emit({
          data: this.componentData,
          flag: "REMOVE"
        });
        break;
      default:
    }
  }

}
