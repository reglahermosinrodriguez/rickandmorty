import {Episode} from "../interfaces/episodes";
import {Character} from "../interfaces/characters";
import {Location} from "../interfaces/locations";


export interface Serie {
    info:    generalInfo;
    episode: Episode;
    character: Character;
    location: Location;
}

export interface generalInfo {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

// export interface Episode {
//     id:         number;
//     name:       string;
//     air_date:   string;
//     episode:    string;
//     characters: string[];
//     url:        string;
//     created:    string;
// }

// Generated by https://quicktype.io

// export interface Character {
//     id:       number;
//     name:     string;
//     status:   string;
//     species:  string;
//     type:     string;
//     gender:   string;
//     origin:   Location;
//     location: Location;
//     image:    string;
//     episode:  string[];
//     url:      string;
//     created:  string;
// }

// export interface Location {
//     name: string;
//     url:  string;
// }

// Generated by https://quicktype.io

// export interface Location {   
//     name:      string;
//     type:      string;
//     dimension: string;
// }

