export interface TopLevel {
    info:    Info;
    results: Result[];
}

export interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

export interface Result {
    id:         number;
    name:       string;
    air_date:   string;
    episode:    string;
    characters: string[];
    url:        string;
    created:    string;
}

export interface CharacterData {
    name: string;
    image: string;
    gender: string;
    status: string;
    species: string;
    origin: { name: string };
    location: { name: string; url: string };
    episode: string[]; 
  }

export interface Location {
    name: string;
    type: string;
    dimension: string;
    residents: string[];
}

export interface Residents {
    name: string;
    status: string,
    species: string,
    type: any,
    gender: string,
    origin: {},
    location: {},
    image: string;
    episode: [],
    url: string;
    created: number;
  }
