const hoge: string = "boobar";

console.log(hoge);

class Software {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

const sft: Software = new Software('aaa', 3);
console.log(sft.name);