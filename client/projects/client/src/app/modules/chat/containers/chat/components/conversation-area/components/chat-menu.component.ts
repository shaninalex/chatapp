import {Component, Input} from "@angular/core";
import {CollocutorItem, Conv} from "@lib";
import {Observable} from "rxjs";

import {v4 as uuid} from "uuid"

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
    template: `
        <div class="border-l h-full p-4 w-72 flex flex-col gap-4">
            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <div class="font-bold">Users</div>
                    <button (click)="toggleUsers()" class="text-slate-500">
                        @if (showUsersList) {
                            <i class="text-xs fa-solid fa-down-left-and-up-right-to-center"></i>
                        } @else {
                            <i class="text-xs fa-solid fa-up-right-and-down-left-from-center"></i>
                        }
                    </button>
                </div>
                @if (showUsersList) {
                    <div class="flex flex-col gap-3">
                        @for (item of collocutors; track item) {
                            <app-collocutor-item [item]="item"/>
                            <app-collocutor-item [item]="item"/>
                        }
                        <button class="text-slate-400 text-xs text-left">(+ 30 users)</button>
                    </div>
                }
            </div>
            <hr>

            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <div class="font-bold">Activities</div>
                    <button (click)="toggleActivities()" class="text-slate-500">
                        @if (showActivitiesList) {
                            <i class="text-xs fa-solid fa-down-left-and-up-right-to-center"></i>
                        } @else {
                            <i class="text-xs fa-solid fa-up-right-and-down-left-from-center"></i>
                        }
                    </button>
                </div>

                @if (showActivitiesList) {
                    <div class="flex flex-col gap-3">
                        <button class="flex items-start gap-3 hover:bg-slate-100 p-2 rounded-lg">
                            <div class="bg-violet-100 rounded-xl w-8 h-8 flex items-center justify-center">
                                <i class="fa-regular fa-folder-open text-sm"></i>
                            </div>
                            <div class="text-left">
                                <div>Files</div>
                                <div class="text-sm text-slate-400">( 75 items uploads )</div>
                            </div>
                        </button>
                        <button class="flex items-start gap-3 hover:bg-slate-100 p-2 rounded-lg">
                            <div class="bg-violet-100 rounded-xl w-8 h-8 flex items-center justify-center">
                                <i class="fa-solid fa-user-plus text-sm"></i>
                            </div>
                            <div class="text-left">
                                <div>New user registered.</div>
                                <div class="text-sm text-slate-400">59 minutes ago</div>
                            </div>
                        </button>
                    </div>
                }
            </div>
            <hr>

            <div>
                <div class="mb-3 flex items-center justify-between">
                    <div class="font-bold">Private Conversations</div>
                    <button (click)="togglePrivateChats()" class="text-slate-500">
                        @if (showPrivateChatsList) {
                            <i class="text-xs fa-solid fa-down-left-and-up-right-to-center"></i>
                        } @else {
                            <i class="text-xs fa-solid fa-up-right-and-down-left-from-center"></i>
                        }
                    </button>
                </div>
                @if (showPrivateChatsList) {
                    <div class="flex flex-col gap-3">
                        @for (item of collocutors; track item) {
                            <app-collocutor-item [item]="item"/>
                        }
                    </div>
                }
            </div>
        </div>
    `
})
export class ChatMenuComponent {
    @Input() conversation$: Observable<Conv>
    showUsersList: boolean = true;

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

    collocutors: CollocutorItem[] = [
        {
            id: uuid(),
            image: "/assets/images/user-1.jpg",
            name: "Amanda Harris"
        },
        {
            id: uuid(),
            image: "/assets/images/user-2.jpg",
            name: "Charles Simmons"
        },
        {
            id: uuid(),
            image: "/assets/images/user-3.jpg",
            name: "Sean Hall"
        }
    ]
}
