function err(errorMessage) {
    const er = errorMessage.message;
    const sorce = er.slice(0, 8);
    let message = '';
    if (sorce.trim() === 'Firebase') {
        message = er.slice(10, er.indexOf('('));
    } else {
        message = err.message;
    }

    message = message.trim();

    if (message.endsWith('.')) {
        message = message.replace('.', '!');
    } else if (message.endsWith('')) {
        message += '!';
    }

    return message.trim();
}

export default err;
