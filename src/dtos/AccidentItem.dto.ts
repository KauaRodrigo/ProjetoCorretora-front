import type { AccidentStatus } from "@/enums/accidentStatus"
import type { AccidentType } from "@/enums/accidentType"

export default class AccidentItem {
    id: number
    code: number
    clientName: string
    company: string
    event: string
    type: AccidentType
    status: AccidentStatus
}