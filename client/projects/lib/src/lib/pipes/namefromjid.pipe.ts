import { Pipe, PipeTransform } from "@angular/core"

@Pipe({
    name: 'namefromjid',
})
export class NameFromJIDPipe implements PipeTransform {
    transform(value: any) {
        const parts = value.split("@")
        if (parts.length < 2) return value
        return parts[0]
    }
}

