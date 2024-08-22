import type { AccidentStatus } from "@/enums/accidentStatus"
import type { AccidentType } from "@/enums/accidentType"

export type AccidentItem = {
    id: number
    code: number
    client: string
    company: string
    event: string
    type: AccidentType
    status: AccidentStatus
}