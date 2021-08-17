import chroma from "chroma-js";

export const INITIAL_PALETTE = ['#666666', '#66473d', '#be664b', '#f6a48e'];

/**
 * This method creates both a border color and background color palette, based on an initial palette.
 * The difference between palettes, is in the opacity. The background color has an opacity of .5.
 * @param nElements Number of elements in the palette to be generated
 * @returns {{borderColor: string[], backgroundColor: string[]}}
 */
export const chartPaletteGenerator = (nElements) => {

    // Generate a palette of colours based on the initial palette and the number of elements
    const palette = chroma.scale(INITIAL_PALETTE).mode('lab').colors(nElements);

    // Create a palette with oppacity .5, based on the generated palette.
    let oppPallete = [];

    palette.map(color =>{
        const opaqueColor = chroma(color).alpha(0.5).hex();
        oppPallete.push(opaqueColor);
    })

    const finalPalette = {'borderColor' : palette, 'backgroundColor': oppPallete};

    return finalPalette;
};