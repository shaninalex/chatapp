import { Component, Input, OnInit } from "@angular/core";
import { Room, RoomParticipant } from "@lib";
import { Store } from "@ngrx/store";
import { map, Observable, switchMap } from "rxjs";
import { AppState } from "../../../../../store/store";
import { selectParticipantsByRoom } from "../../../../../store/chat/selectors/participants";
import { selectPrivateRooms } from "../../../../../store/chat/selectors";

/**
 * @description
 * If room:
 * - show list of users
 * - owner menu ( ban, kick etc...)
 * - list of uploads
 *
 * if one-to-one conversation:
 * - search in history,
 * - interlocutor info,
 *
 * @export
 * @class ChatMenuComponent
 */
@Component({
    selector: "app-chat-menu",
    templateUrl: "./chat-menu.component.html"
})
export class ChatMenuComponent implements OnInit {
    @Input() room$: Observable<Room>;
    showUsersList: boolean = true;
    roomParticipants$: Observable<RoomParticipant[]>
    privateRooms$: Observable<Room[]>

    constructor(private store: Store<AppState>) {

    }

    ngOnInit(): void {
        this.roomParticipants$ = this.room$.pipe(
            switchMap((room: Room) => {
                return this.store.select(selectParticipantsByRoom(room.jid))
            })
        )
        this.privateRooms$ = this.room$.pipe(
            switchMap((room: Room) => {
                return this.store.select(selectPrivateRooms(room.jid))
            })
        ) 
    }

    toggleUsers() {
        this.showUsersList = !this.showUsersList
    }

    showActivitiesList: boolean = true;

    toggleActivities() {
        this.showActivitiesList = !this.showActivitiesList
    }

    showPrivateChatsList: boolean = true;

    togglePrivateChats() {
        this.showPrivateChatsList = !this.showPrivateChatsList
    }

}
