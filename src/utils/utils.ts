export module Utils {
    export const getRandomInt = (min: number, max: number): number => {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
      }
    
    export const randomHexColor = (): string => {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return `#${randomColor}`;
    }
}