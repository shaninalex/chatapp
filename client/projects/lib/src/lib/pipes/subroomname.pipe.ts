import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: 'subroomname',
})
export class SubRoomNamePipe implements PipeTransform {
    transform(value: any) {
        const parts = value.split("/")
        if (parts.length < 2) return value
        return parts[1]
    }
}
