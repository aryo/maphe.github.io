/**
 * Hydrates form values from query string parameters
 * eg: ?hero=adlay&artifact=day_dream_joker&atk=5000&crit=350&elem-adv=true
 */

$(() => {
    const isSelectElement = element => element.tagName === 'SELECT';
    const isInputElement = element => element.tagName === 'INPUT';
    const isCheckboxInput = element => isInputElement(element) && element.type === 'checkbox';

    const isValidFormElement = elementId => {
        // super naive validation
        const element = document.getElementById(elementId);
        return !!element && (isSelectElement(element) || isInputElement(element));
    }

    const isValidElementValue = (element, value) => {
        if (isSelectElement(element)) {
            // skip unavailable/disabled options; ideally we should be checking based on schema, not state of UI elements
            const { options } = element;
            const option = Array.from(options).find(opt => opt.value === value);
            return !!option && !option.disabled
        }
        return true;
    };

    const setElementValue = (element, value) => {
        if (isCheckboxInput(element) && value.toLowerCase() === 'true') {
            $(element).prop('checked', true);
            return;
        }
        $(element).val(value);
        $(element).trigger('change');
    };

    const hydrateParam = (param, value) => {
        if (!isValidFormElement(param)) {
            return;
        }
        const element = document.getElementById(param);
        if (element && isValidElementValue(element, value)) {
            setElementValue(element, value);
        }
    };

    const searchParams = new URLSearchParams(window.location.search);
    for (const [param, value] of searchParams) {
        hydrateParam(param, value);
    }
    resolve();
});
