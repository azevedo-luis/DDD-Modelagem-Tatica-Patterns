import EventInterface from "../../@shared/event/event.interface";


export default class CustomerChangedAddressEvent implements EventInterface{
    dataTimeOccurred: Date;
    eventData: any;

    constructor(data: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = data;
    }
}