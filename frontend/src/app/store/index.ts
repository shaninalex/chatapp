import { ProfileState } from "./profile/reducer";
import { UIState } from "./ui/reducer";

export interface AppState {
    ui: UIState,
    profile: ProfileState,
}