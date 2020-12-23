declare interface Person {
    name: string, 
    age?: number, 
    sayHello: () => Person, 
    playWith: (friend: Person) => Person
}