// toggle visibility of input areas
const visibilityToggle = (boolean, elementId) => {
    console.log(`bool ${boolean}\nelemID: ${elementId}`)
    const element = document.getElementById(elementId);

    if (element) {
        if (boolean === 'True') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    } else {
        console.warn(`Element with id '${elementId}' not found.`);
}
}

export {visibilityToggle}