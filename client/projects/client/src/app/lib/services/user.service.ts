import { Injectable } from "@angular/core";
import { Profile } from "@lib";

@Injectable({
    providedIn: "root"
})
export class UserService {
    private _profile: Profile

    constructor() { }

    public setProfile(p: Profile) {
        this._profile = p
    }

    public profile(): Profile {
        return this._profile
    }

    public get username(): string {
        const identity = this._profile.identity;
        if (identity.traits["nickname"]) {
            return identity.traits["nickname"]
        }

        if (identity.traits["name"]) {
            const name = identity.traits["name"];
            if (name["first"] && name["last"]) {
                return `${name["first"]}${name["last"]}`
            }
        }

        return this._profile.identity.id
    }
}
