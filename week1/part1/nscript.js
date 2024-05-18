
//private 
var vegetables = [];

export function addVeggies(veggieName) {
    vegetables.push(veggieName);
}

export function countVeggies() {
    return vegetables.length;
}

export function showArray() {
    return vegetables;
}