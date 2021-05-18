interface Props {
    foo: string;
    la: number;
    [key: string]: Props[keyof Props];
}

const props: Props = {
    foo: "bar",
    la: 12
};

props["foo"] = "baz"; // ok
props["bar"] = 123; // error

//1
// function process(text: string | null): string | null {
//     return text;
// }

//2
// function process<T>(text: T): T {
//     return text;
// }

//3 ???error
function process<T extends string | null>(text: T): T extends string ? string : null {
    return text;
}
process("sss").toUpperCase() // ???
// process(1).toUpperCase() // error