module.exports = {
    name: 'error',

    execute(error) {
        console.log('-----ERROR-----\n' + error);

        if (error.errors) {
            console.error('-----MORE ERRORS-----\n', error.errors);
        }
    },
};
