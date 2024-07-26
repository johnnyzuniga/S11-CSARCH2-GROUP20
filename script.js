function toggleInputFields() {
    const inputType = $('#inputType').val();
    if (inputType === 'hex') {
        $('#hexInputField').show();
        $('#binaryInputField').hide();
    } else {
        $('#hexInputField').hide();
        $('#binaryInputField').show();
    }
}

function convert() {
    $('#decimalResult').text(''); // Clear previous result

    const inputType = $('#inputType').val();
    let decimalResult = '';

    if (inputType === 'hex') {
        const hexInput = $('#hexInput').val();
        if (isValidHex(hexInput)) {
            decimalResult = hexToDecimal(hexInput);
        } else {
            alert('Invalid Hexadecimal Input');
            return;
        }
    } else {
        const binaryInput = $('#binaryInput').val().replace(/\s+/g, '');
        if (isValidBinary(binaryInput)) {
            decimalResult = binaryToDecimal(binaryInput);
        } else {
            alert('Invalid Binary Input');
            return;
        }
    }

    const decimalType = $('#decimalType').val();
    if (decimalType === 'fixed') {
        decimalResult = Number(decimalResult).toFixed(2); // Adjust for fixed-point representation
    }

    $('#decimalResult').text(decimalResult);
}

function isValidHex(hex) {
    return /^[0-9A-Fa-f]{8}$/.test(hex);
}

function isValidBinary(binary) {
    return /^[01]{32}$/.test(binary);
}

function hexToDecimal(hex) {
    // Implement hexadecimal to decimal conversion logic for IEEE-754 Binary-32
    // Placeholder logic:
    const binary = parseInt(hex, 16).toString(2).padStart(32, '0');
    return binaryToDecimal(binary);
}

function binaryToDecimal(binary) {
    // Implement binary to decimal conversion logic for IEEE-754 Binary-32
    // Placeholder logic:
    const sign = parseInt(binary[0], 2);
    const exponent = parseInt(binary.slice(1, 9), 2) - 127;
    const mantissa = '1' + binary.slice(9);
    let mantissaValue = 0;

    for (let i = 0; i < mantissa.length; i++) {
        mantissaValue += parseInt(mantissa[i], 2) * Math.pow(2, -i);
    }

    const decimal = (sign ? -1 : 1) * mantissaValue * Math.pow(2, exponent);
    return decimal;
}

function copyToNotepad() {
    const decimalResult = $('#decimalResult').text();
    if (decimalResult) {
        const blob = new Blob([decimalResult], { type: 'text/plain' });
        const link = document.createElement('a');
        link.download = 'FloatingPointResult.txt';
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('No result to copy.');
    }
}
