package ejabberd

const (
	// DEFAULT_USER_SCOPE used to set client default auth token permission scope
	// Need to figure out what scope require for user to full interact with each other.
	// direct messages, find users, create room, friendship requests etc...
	// For now it's just all scope from "muc_room" https://docs.ejabberd.im/developer/ejabberd-api/admin-tags/#muc-room
	DEFAULT_USER_SCOPE = "sasl_auth;change_room_option;create_room;create_room_with_opts;destroy_room;get_room_affiliation;get_room_affiliations;get_room_history;get_room_occupants;get_room_occupants_number;get_room_options;get_subscribers;send_direct_invitation;set_room_affiliation;subscribe_room;subscribe_room_many;unsubscribe_room"
	ADMIN_SCOPE        = "ejabberd:admin;sasl_auth;change_room_option;create_room;create_room_with_opts;destroy_room;get_room_affiliation;get_room_affiliations;get_room_history;get_room_occupants;get_room_occupants_number;get_room_options;get_subscribers;send_direct_invitation;set_room_affiliation;subscribe_room;subscribe_room_many;unsubscribe_room"
)
