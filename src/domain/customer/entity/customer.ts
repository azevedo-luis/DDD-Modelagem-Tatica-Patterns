import Entity from "../../@shared/entity/entity.abstract";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerChangedAddressEvent from "../events/customer-changed-address.event";
import EnviaConsoleLogHandler from "../events/handler/console-log-when-customer-address-is-changed.handler";
import CustomerInterface from "./customer.interface";
import Address from "./value-object/address";
export default class Customer extends Entity implements CustomerInterface {
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;
  
    constructor(id: string, name: string) {
      super();
      this._id = id;
      this._name = name;
      this.validate();

      if (this.notification.hasErrors()){
        throw new NotificationError(this.notification.getErrors());
      }
    }

    get name(): string {
      return this._name;
    }
  
    get rewardPoints(): number {
      return this._rewardPoints;
    }
  
    validate() {
      if (this.id.length === 0) {
        this.notification.addError({
          context: "customer",
          message: "Id is required",
        });      
      }
      if (this._name.length === 0) {
        this.notification.addError({
          context: "customer",
          message: "Name is required",
        }); 
      }
    }
  
    changeName(name: string) {
      this._name = name;
      this.validate();
    }
  
    get address(): Address {
      return this._address;
    }
    
    changeAddress(address: Address) {
      this._address = address;
      this.emitEventChangedAddress();  
    }
  
    private emitEventChangedAddress() {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new EnviaConsoleLogHandler();
      eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);
      const customerChangedAddressEvent = new CustomerChangedAddressEvent({
        id: this.id,
        nome: this.name,
        endereco: this.address.toString(),
      });
      eventDispatcher.notify(customerChangedAddressEvent);
    }

    isActive(): boolean {
      return this._active;
    }
  
    activate() {
      if (this._address === undefined) {
        throw new Error("Address is mandatory to activate a customer");
      }
      this._active = true;
    }
  
    deactivate() {
      this._active = false;
    }
  
    addRewardPoints(points: number) {
      this._rewardPoints += points;
    }
  
    set address(address: Address) {
      this._address = address;
    }
  }