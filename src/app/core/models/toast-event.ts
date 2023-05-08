import { EventTypes } from "./event-types"

export class ToastEvent {
    type: EventTypes = EventTypes.success
    title: string = ""
    message: string = ""
}